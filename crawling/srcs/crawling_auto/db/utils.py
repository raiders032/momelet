import json
import sys


def readJsonFile(filepath):
    try:
        f = open(filepath, "r")
        jsonData = json.load(f)
        f.close()
        return jsonData
    except:
        print("jsonfile 읽기 실패")
        return None


def writeJsonFile(filepath, arrayJson):
    try:
        f = open(filepath, "w")
        json.dump(arrayJson, f, ensure_ascii=False)
        f.close()
    except:
        print("jsonFile을 쓰는 데 문제가 생겼습니다")
        sys.exit()


def readRestaurantFilename(filepath):
    f = open(filepath, "r")
    data = f.read().split(" ")
    f.close()
    return data


def appendOverlap(filepath, data):
    f = open(filepath, "a")
    f.write(data + " ")
    f.close()
