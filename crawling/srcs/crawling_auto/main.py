import os
import naverCrawl_auto
import integrateData
import metaCategory
from db import mysqlQuery


def createDir(dirPath):
    try:
        if not(os.path.isdir(dirPath)):
            os.makedirs(os.path.join(dirPath))
            return True
        else:
            print("이미 있는 폴더입니다.")
            return False
    except OSError as e:
        if e.errno != errno.EEXIST:
            print("Failed to create directory!!!!!")
            exit()


def printWelcome():
    print("==============================================")
    print("")
    print("\t\t 파이썬 크롤링")
    print("")
    print("==============================================")
    print("")
    print("원하는 기능의 숫자를 입력해주세요")

    a = 0
    while True:
        print("1. 원하는 동을 크롤링 하기")
        print("2. 식당 정보에 메타카테고리 반영하기")
        print("3. db에 데이터 삽입하기")
        print("4. CLI종료")
        a = input()
        if a == "4":
            print("프로그램을 종료합니다.")
            break
        elif a == "1":
            startCrawling()
        elif a == "2":
            setMetaCategory()
        elif a == "3":
            insertDb()


def startCrawling():
    dongName = ""
    while True:
        print()
        print("\"1. 원하는 동을 크롤링 하기 기능\"")
        print("조사할 동의 이름을 적어주세요. exit로 나갈 수 있어요.")
        dongName = input()
        if dongName == "exit":
            print("크롤링 기능 종료")
            return

        if dongName == "":
            continue

        userInput = ""
        while userInput != 'y' and userInput != 'n':
            print("입력하신 동이 " + dongName + "이 맞나요?")
            print("맞으면 y, 다시 입력하려면 n을 입력해주세요.")
            userInput = input()

        if userInput == "y":
            break
        elif userInput == "n":
            continue

    dirPath = "../../restaurants/" + dongName + "_restaurants_json"
    if createDir(dirPath) == False:
        print("이미 크롤링을 한 동인지 점검이 필요합니다.")
        print("크롤링기능을 중단합니다.")
        return

    print("메인에서 " + dongName + "크롤링 시작.")
    naverCrawl_auto.startCrawling(dongName, dirPath)
    print("쿼리문 데이터 통합 시작")
    integrateData.makeIntegrateData(dirPath)

    print("요청한 " + dongName + "에 대한 크롤링 완료")


def setMetaCategory():
    metaCategory.main_metaCategory()


def insertDb():
    mysqlQuery.updateDB()


if __name__ == "__main__":
    printWelcome()
