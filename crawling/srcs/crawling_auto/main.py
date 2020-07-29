import os


def createDir(dirPath):
    try:
        if not(os.path.isdir(dirPath)):
            os.makedirs(os.path.join(dirPath))
    except OSError as e:
        if e.errno != errno.EEXIST:
            print("Failed to create directory!!!!!")
            exit()


if __name__ == "__main__":
    dongName = input("조사할 동의 이름을 적어주세용")
    dirPath = dongName + "_restaurants_json"
    createDir(dirPath)

    exacDirPath = "../../" + dirPath
