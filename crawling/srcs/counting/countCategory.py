import csv
import json
import pandas as pd


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


def readFile(filepath):
    f = open(filepath, "r")
    data = f.read()
    f.close()
    return data


def getDongNamefromFile(filepath):
    f = open(filepath, "r")
    data = f.read().split(" ")
    f.close()
    return data


def logging(*msg):
    f = open("./categoryCount.txt", "a")

    if msg == None:
        data = "정보가 넘어오지 않았습니다\n"
        f.write(data)
        f.close()
        return

    data = ""
    for word in msg:
        data += word
        data += " "

    print(data)
    data += "\n"
    f.write(data)
    f.close()
    return


def saveAsCsv(data):
    l = []

    for i in data:
        l.append([i[0], i[1]])
    df = pd.DataFrame(l, columns=['카테고리이름', '노출횟수'])
    df.to_csv('category.csv', index=False, encoding='cp949')


def sortDicByKeyDesc(data):
    return sorted(data.items(), key=(lambda item: item[1]), reverse=True)


# category.txt 에 카테고리 저장
# category.csv 에 저장
def countCategory():
    allCategories = ""
    category = {}
    nonCatName = ""
    filename = getDongNamefromFile("../../filename/filename")
    for name in filename:
        path = "../../restaurant_json/" + name
        print(path)
        data = readJsonFile(path)

        for obj in data:
            if obj["category"] == None:
                nonCatName += obj["name"]
                continue

            for cat in obj["category"]:
                allCategories += cat + " "
                # if cat == "라면":
                #     undefinedName += obj["name"] + " "
                #     undefinedId.append(obj["naverId"])

                try:
                    category[cat] += 1
                except:
                    category[cat] = 1

    sort_cat = sortDicByKeyDesc(category)

    for i in sort_cat:
        logging(i[0], ":", str(i[1]))
    saveAsCsv(sort_cat)
    # print(nonCatName)


def makeMetaCategory():
    f = open('./category_0720.csv', 'r', encoding='utf-8')
    rdr = csv.reader(f)
    metaCategory = {}
    for line in rdr:
        if(line[2] == '-'):
            metaCategory[line[0]] = None
            continue
        metaCategory[line[0]] = line[2]
    f.close()
    return metaCategory


# countCategory()
