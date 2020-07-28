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
    f = open("./integratedRestaurants/KungukRestaurantPath.txt", "w")
    f.write(data)
    f.close()


def readFilePath():
    f = open("./integratedRestaurants/KungukRestaurantPath.txt", "w")
    data = f.read()
    f.close()
    return data


def makeIntegrateData():
    f = open('./filename', 'r')
    names = f.read().split()
    f.close()

    restaurantId = 1
    restaurants = {}
    validRestaurants = []
    for filename in names:
        print(filename, "합치는 중...")
        fpath = "./restaurant_건대입구역/" + filename
        jsonData = readJsonFile(fpath)

        for data in jsonData:
            if restaurants.get(data["naverId"]) == None:
                restaurants[data["naverId"]] = 1
                data["restaurantId"] = restaurantId
                restaurantId += 1
                validRestaurants.append(data)
        print(filename, "합치기 완료")

    writeFilePath = f"./integratedRestaurants/KungukRestaurant_{restaurantId}.json"
    print(writeFilePath, "작성 중...")
    writeJsonFile(writeFilePath, validRestaurants)
    saveFilePath(
        f"./integratedRestaurants/KungukRestaurant_{restaurantId}.json")
    print(writeFilePath, "작성 완료")
    print("총", restaurantId, "개의 식당이 합쳐졌습니다")


if __name__ == "__main__":
    makeIntegrateData()
