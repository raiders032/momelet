import countCategory as cc
import json

# category_0720.csv 파일의 3열에 설정된 카테고리에 따라
# metaCategory 값이 새로 json에 추가되는 방식입니다.


def readJsonFile(filepath):
    f = open(filepath, "r")
    data = f.read()
    f.close()
    jsonData = json.loads(data)
    return jsonData


def writeJsonFile(filepath, arrayJson):
    f = open(filepath, "w")
    json.dump(arrayJson, f, ensure_ascii=False)
    f.close()


def getDongNamefromFile(filepath):
    f = open(filepath, "r")
    data = f.read().split(" ")
    f.close()
    return data


def setMetaCategory(metaCategory):
    # PK 생성용
    # rId = 1
    print("메타카테고리")
    print(metaCategory)
    filename = getDongNamefromFile("../../restaurants/filename.txt")
    for name in filename:
        print(name, "합치는 중")
        if name == "":
            break
        path = "../../restaurants/" + \
            name[:name.find("json")+4] + "/" + name
        print(path)
        data = readJsonFile(path)

        # 새로 수정한 어레이
        # 한 동의 데이터를 수정하는 것
        arr = []
        for i in range(0, len(data)):
            # 카테고리 없는 소수의 식당 거르기
            if data[i]["category"] == None:
                continue
            catFlag = 0
            tempCat = []
            for cat in data[i]["category"]:
                # 부적절한 카테고리의 식당은 None으로 표기해서 거르기
                try:
                    if metaCategory[cat] == None:
                        continue
                    tempCat.append(metaCategory[cat])
                    catFlag += 1
                except Exception as e:
                    print(e)
                    print("메타 카테고리 삽입 중 문제 발생")
                    continue
            if catFlag >= 1:
                data[i]["metaCategory"] = tempCat
                arr.append(data[i])

            # opening_hours가 None인 경우 수정
            if data[i]["openTime"] == None:
                data[i]["openTime"] == ''
            # PK 생성용
            # data[i]["rId"] = rId
            # rId += 1

        writeJsonFile(path, arr)


def main_metaCategory():
    metaCategory = cc.makeMetaCategory()
    setMetaCategory(metaCategory)
