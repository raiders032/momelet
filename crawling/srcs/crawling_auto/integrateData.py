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
    try:
        f = open("../../restaurants/filename.txt", "a")
        f.write(data + " ")
        f.close()
    except:
        print("filename 저장에 문제가 생겼습니다")
        sys.exit()


def readFilePath():
    try:
        f = open("../../restaurants/filename.txt", "r")
        data = f.read()
        f.close()
        return data
    except:
        print("filename 읽기에 문제가 생겼습니다")
        sys.exit()


def makeIntegrateData(dirPath):
    # 파일이름들이 저장된 filename
    filenamePath = dirPath + "/filename"
    f = open(filenamePath, 'r')
    names = f.read().split()
    f.close()

    restaurantId = 1
    restaurants = {}
    validRestaurants = []
    for filename in names:
        print(filename, "합치는 중...")
        # 파일 읽는 경로
        fpath = dirPath + "/" + filename
        jsonData = readJsonFile(fpath)

        for data in jsonData:
            if restaurants.get(data["naverId"]) == None:
                restaurants[data["naverId"]] = 1
                data["restaurantId"] = restaurantId
                restaurantId += 1
                validRestaurants.append(data)
        print(filename, "합치기 완료")

    # 파일 저장 경로. dirPath + /xx동_2323개.json
    writeFilePath = dirPath + "/" + \
        dirPath[dirPath.find('/', 6) + 1:] + f"_{restaurantId - 1}.json"
    print(writeFilePath, "작성 중...")
    writeJsonFile(writeFilePath, validRestaurants)
    saveFilePath(writeFilePath[writeFilePath.find('/', 18) + 1:])
    print(writeFilePath, "작성 완료")
    print("총", restaurantId, "개의 식당이 합쳐졌습니다")
