import json


def readJsonFile(filepath):
    try:
        f = open(filepath, "r")
        jsonData = json.load(f)
        f.close()
        return jsonData
    except:
        print("jsonfile 읽기 실패")
        return None
