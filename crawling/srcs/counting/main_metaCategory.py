import countCategory as cc
import json

# category_0720.csv 파일의 3열에 설정된 카테고리에 따라
# metaCategory 값이 새로 json에 추가되는 방식입니다.


def setMetaCategory(metaCategory):
    # PK 생성용
    rId = 1

    filename = cc.getDongNamefromFile("../../filename/filename")
    for name in filename:
        path = "../../restaurant_json/" + name
        print(path)
        data = cc.readJsonFile(path)

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
                if metaCategory[cat] == None:
                    continue
                tempCat.append(metaCategory[cat])
                catFlag += 1

            if catFlag == 2:
                data[i]["metaCategory"] = tempCat
                arr.append(data[i])

            # opening_hours가 None인 경우 수정
            if data[i]["openTime"] == None:
                data[i]["openTime"] == ''
            # PK 생성용
            data[i]["rId"] = rId
            rId += 1

        #cc.writeJsonFile(path, arr)


metaCategory = cc.makeMetaCategory()
setMetaCategory(metaCategory)
