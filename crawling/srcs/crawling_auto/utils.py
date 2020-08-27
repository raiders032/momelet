import time
import json


def logging(*msg):
    f = open("./crawlingLog.txt", "a")

    if msg == None:
        data = time.strftime('%c', time.localtime(
            time.time())) + " 로그 정보가 넘어오지 않았습니다\n"
        f.write(data)
        f.close()
        return

    data = time.strftime('%c', time.localtime(time.time())) + " "
    for word in msg:
        data += word
        data += " "

    print(data)
    data += "\n"
    f.write(data)
    f.close()
    return


def saveCrawlIndex(index):
    data = index
    if type(data) is int:
        data = str(data)

    f = open("./crawlEndIndex.txt", "w")
    f.write(data)
    f.close()


def readCrawlIndex():
    f = open("./crawlEndIndex.txt", "r")
    data = f.read()
    if type(data) is str:
        data = int(data)
    data += 1
    f.close()
    return data


def saveFilename(name, path):
    if name == None:
        return

    f = open(path + "/filename", "a")
    data = name + ".json "
    f.write(data)
    f.close()
    return


def readJsonFile(filepath):
    f = open(filepath, "r")
    jsonData = json.load(f)
    f.close()
    return jsonData
