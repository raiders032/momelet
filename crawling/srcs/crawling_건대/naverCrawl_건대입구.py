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
    utils.logging("======== \'", query,
                  "\'의 json을 긁어오기 시작함 ========")

    array = []

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
        with open(f"./restaurant_건대입구역/{fileName}.json", "w") as json_file:
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


def set_crawling_query():
    # PK
    rId = 1

    qrys = ["건대입구역 맛집", "건대입구역 식당", "건대입구역 카페", "건대입구역 점심",
            "건대입구역 저녁", "화양동 맛집", "화양동 식당", "화양동 카페", "화양동 점심", "화양동 저녁"]

    utils.logging("크롤링 시작!")
    for qry in qrys:

        fileName = qry[:qry.find(" ")] + "_" + qry[qry.find(" "):]
        rId = naver_crawling(qry, fileName, rId)

        rId += 1

        utils.logging(qry, "긁어오기 성공")
        utils.saveFilename(fileName)

        termTime = 45
        utils.logging("다음 동을 긁기 전", str(termTime), "초 기다리는 중...")
        time.sleep(termTime)
    utils.logging("쿼리문 = ", str(qrys), "에 대해 요청한 크롤링 완료")


if __name__ == "__main__":
    set_crawling_query()
