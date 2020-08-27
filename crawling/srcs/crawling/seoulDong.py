import requests
import json
import time
import utils

# 총 몇 개의 dong object가 있는지 리턴함.


def seoul_dong_num_api(API_KEY):
    URL = f"http://openapi.seoul.go.kr:8088/{API_KEY}/json/octastatapi10112/1/5/"
    dong_num = requests.get(URL).json()["octastatapi10112"]["list_total_count"]
    return dong_num


# 한번에 1000페이지씩 호출할 수 있음
# 총 2250개가 있으니 1 ~ 1000, 1001 ~ 2000, 2001 ~ 3000 으로 api 호출
# 2250개를 넘어서 3001 ~ 4000을 호출하면 잘못된 응답이 옴.
def seoul_dong_api(API_KEY, pagestart, pageend):
    rId = 0
    array = []
    for page in range(pagestart, pageend+1):
        start = (page - 1) * 1000 + 1
        end = page * 1000
        URL = f"http://openapi.seoul.go.kr:8088/{API_KEY}/json/octastatapi10112/{start}/{end}/"
        response = requests.get(URL).json()["octastatapi10112"]["row"]
        for dong in response:
            year = dong["GIGAN"]
            if year != "2019":
                continue
            dongInfo = {}
            dongInfo["rId"] = rId
            dongInfo["GIGAN"] = dong["GIGAN"]
            dongInfo["JACHIGU"] = dong["JACHIGU"]
            dongInfo["DONG"] = dong["DONG"]
            if dongInfo["JACHIGU"] == "합계" or dongInfo["DONG"] == "소계":
                continue

            dongInfo["DONG"] = dongInfo["DONG"].replace("·", ",")
            array.append(dongInfo)
            rId += 1

        with open("../../dong_json/seoul_dong.json", "w") as json_file:
            json.dump(array, json_file, ensure_ascii=False)

        return rId


def startCrawlDong():
    API_KEY = "524f7770616a736a38336979775378"

    print("======== 서울 공공 api에서 서울의 동 가져오는 중 ========")
    utils.logging("======== 서울 공공 api에서 서울의 동 가져오는 중 ========")
    dong_num = seoul_dong_num_api(API_KEY)

    max_page = dong_num // 1000
    dong_num = seoul_dong_api(API_KEY, 1, max_page + 1)
    print("총", dong_num, "개의 동이 존재함")
    utils.logging("총", str(dong_num), "개의 동이 존재함")

    print("seoul_dong.json 업데이트 완료")
    utils.logging("seoul_dong.json 업데이트 완료")
    print("======== 서울 공공 api에서 서울의 동 가져오기 완료 ========")
    utils.logging("======== 서울 공공 api에서 서울의 동 가져오기 완료 ========")
    print()
    utils.logging()
