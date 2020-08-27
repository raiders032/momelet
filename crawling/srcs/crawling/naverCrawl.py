import requests
import json
import time
import utils
import sys


def createMenu(menus):
    if menus == None:
        return []
    splitedMenus = menus.split('|')
    results = []
    for menu in splitedMenus:
        menu = menu.strip()
        item = {}
        for letter in range(len(menu)-1, -1, -1):
            if menu[letter] == " ":
                item["name"] = menu[:letter]
                item["price"] = menu[letter+1:]
                results.append(item)
                break
    return results


def naver_crawling(query, fileName, rId):
    array = []

    # for page in range(1, 4):
    page = 0
    while page < 3:
        page += 1
        URL = f"https://map.naver.com/v5/api/search?caller=pcweb&query={query}&type=all&page={page}&displayCount=100&isPlaceRecommendationReplace=true&lang=ko"
        try:
            response = requests.get(URL).json()["result"]["place"]["list"]
        except TimeoutError as te:
            utils.logging("에러 발생:", str(te))
            sys.exit()
        except Exception as e:
            utils.logging(str(e), "때문에 막힘")
            utils.logging(str(page), "막혀서 1분 1초 대기중...")
            time.sleep(61)

            # 다시 시도
            utils.logging(str(page), "페이지 재시도")
            page -= 1
            continue

        for restaurant in response:
            tmp = {}
            tmp["rId"] = rId
            tmp["naverId"] = restaurant["id"]
            tmp["name"] = restaurant["name"]
            tmp["numberOfNaverReviews"] = restaurant["reviewCount"]
            tmp["tel"] = restaurant["tel"]
            tmp["category"] = restaurant["category"]
            tmp["address"] = restaurant["address"]
            tmp["roadAddress"] = restaurant["roadAddress"]
            tmp["thumUrl"] = restaurant["thumUrl"]
            tmp["lat"] = restaurant["y"]
            tmp["lng"] = restaurant["x"]
            tmp["openTime"] = restaurant["bizhourInfo"]
            tmp["menuInfo"] = createMenu(restaurant["menuInfo"])
            array.append(tmp)
            rId += 1
        with open(f"../../restaurant_json/{fileName}.json", "w") as json_file:
            json.dump(array, json_file, ensure_ascii=False)

        utils.logging(f"({page} / 3)page 긁기 성공!")
        if page < 3:
            sleepTime = 5
            utils.logging("다음 페이지 긁기 전", str(sleepTime), "초 기다리는 중...")
            time.sleep(sleepTime)
        else:
            utils.logging("======== \'", query, "\' 긁기 완료 ========")
            return rId-1
        # if page >= 3:
        #     utils.logging("======== \'", query, "\' 긁기 완료 ========")
        #     return rId - 1


def naver_crawling_with_dong():
    # PK
    rId = 1
    # 출력용
    numberOfRestaurant = 0
    numberOfDong = 0
    crawlCount = 0

    json_data = utils.readJsonFile("../../dong_json/seoul_dong.json")
    numberOfDong = len(json_data)

    utils.logging("크롤링 시작!")
    indexNum = utils.readCrawlIndex()
    for i in range(indexNum, len(json_data)):
        dong = json_data[i]
        dongName = dong["DONG"]
        query = dongName + " 식당"

        fileName = dong["JACHIGU"] + "_" + dong["DONG"]
        utils.logging("======== \'", query,
                      "\'의 json을 긁어오기 시작함 ========")
        numberOfRestaurant += naver_crawling(query, fileName, rId)

        crawlCount += 1
        rId += 1
        numberOfDong = len(json_data)
        utils.logging(str(i), "번째 동 긁어오기 성공")
        utils.saveFilename(fileName)
        utils.saveCrawlIndex(i)

        # 한 사이클에 30개의 동씩 긁어옴
        if crawlCount >= 30:
            numberOfDong = len(json_data)
            utils.logging("")
            utils.logging("총", str(numberOfRestaurant), "개의 식당을 찾았습니다.")
            utils.logging(str(i), "인덱스까지 긁음")
            utils.logging("다음 크롤링 싸이클을 위해 60분 대기 중...")
            time.sleep(60 * 60)

            # 재시작전 변수 초기화
            numberOfDong = len(json_data)
            crawlCount = 0
            numberOfRestaurant = 0
            utils.logging("크롤링 재시작!")
            continue

        termTime = 45
        utils.logging("다음 동을 긁기 전", str(termTime), "초 기다리는 중...")
        time.sleep(termTime)

    utils.logging(str(numberOfDong), "개의 대상에 대해 크롤링을 마쳤습니다!")
