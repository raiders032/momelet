import json
import sys


def readJsonFile(path):
    try:
        f = open(path, "r")
        jsonData = json.load(f)
        f.close()
        return jsonData
    except:
        print("jsonFile을 읽는 데 문제가 생겼습니다")
        sys.exit()


def writeJsonFile(filepath, arrayJson):
    try:
        f = open(filepath, "w")
        json.dump(arrayJson, f, ensure_ascii=False)
        f.close()
    except:
        print("jsonFile을 쓰는 데 문제가 생겼습니다")
        sys.exit()


def saveFilePath(data):
    f = open("../db/seoulRestaurantPath.txt", "w")
    f.write(data)
    f.close()


def readFilePath():
    f = open("../db/seoulRestaurantPath.txt", "w")
    data = f.read()
    f.close()
    return data


def makeIntegrateData():
    f = open('../../filename/filename', 'r')
    names = f.read().split()
    f.close()

    # 넣을 동 개수 조절용
    rId = 1
    restaurants = {}
    validRestaurants = []
    for filename in names:
        print(filename, "합치는 중...")
        fpath = "../../restaurant_json/" + filename
        jsonData = readJsonFile(fpath)

        for data in jsonData:
            # 이미 json만들 때 유흥주점 등은 걸렀지만
            # 혹시나 해서 한번 더 거름
            notValid = False
            for i in data["metaCategory"]:
                if i == None:
                    notValid = True
            if notValid == True:
                continue

            if restaurants.get(data["naverId"]) == None:
                restaurants[data["naverId"]] = 1
                data["rId"] = rId
                rId += 1
                validRestaurants.append(data)
        print(filename, "합치기 완료")

    writeFilePath = f"../db/seoulRestaurant_{rId}.json"
    print(writeFilePath, "작성 중...")
    writeJsonFile(writeFilePath, validRestaurants)
    saveFilePath(f"./seoulRestaurant_{rId}.json")
    print(writeFilePath, "작성 완료")
    print("총", rId, "개의 식당이 합쳐졌습니다")


makeIntegrateData()
