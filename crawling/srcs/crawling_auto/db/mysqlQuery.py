import pymysql
import requests
import json
import sys
from db import utils


def readFilePath():
    f = open("./seoulRestaurantPath.txt", "r")
    data = f.read()
    f.close()
    return data

# 받은 객체 잘 정제해서
# sql문 날릴 때 오류 없는 객체로 만들어서 리턴하기


def checkRestaurantString(restaurant):
    # 리턴 예정 변수
    ret = {}

    ret["metaCategory"] = restaurant["metaCategory"]
    ret["name"] = restaurant["name"]
    ret["naver_review_count"] = restaurant["numberOfNaverReviews"]
    ret["opening_hours"] = restaurant["openTime"]
    ret["phone_number"] = restaurant["tel"]
    ret["latitude"] = restaurant["lat"]
    ret["longitude"] = restaurant["lng"]
    ret["address"] = restaurant["address"]
    ret["road_address"] = restaurant["roadAddress"]
    ret["naver_id"] = restaurant["naverId"]
    ret["thum_url"] = restaurant["thumUrl"]

    ret["name"] = ret["name"].replace("'", "")
    if ret["opening_hours"] != None:
        ret["opening_hours"] = ret["opening_hours"].replace("'", "")
    if ret["address"] != None:
        ret["address"] = ret["address"].replace("'", "")
    if ret["road_address"] != None:
        ret["road_address"] = ret["road_address"].replace("'", "")
    if ret["thum_url"] == None:
        ret["thum_url"] = "https://cdn.pixabay.com/photo/2020/06/29/10/55/pizza-5352320__480.png"

    return ret


def insertIntoRestaurant(curs, restaurant):
    # 삽입 개수 조절용
    # i = 0

    lastRowId = 0

    ret = checkRestaurantString(restaurant)
    sql = f'''insert into restaurant(
        name,
        naver_review_count,
        opening_hours,
        phone_number,
        latitude,
        longitude,
        address,
        road_address,
        naver_id,
        thum_url)
        values (
            '{ret["name"]}',
            '{ret["naver_review_count"]}',
            '{ret["opening_hours"]}',
            '{ret["phone_number"]}',
            '{ret["latitude"]}',
            '{ret["longitude"]}',
            '{ret["address"]}',
            '{ret["road_address"]}',
            '{ret["naver_id"]}',
            '{ret["thum_url"]}')'''

    print("Restaurant 테이블 삽입", restaurant["name"])
    try:
        curs.execute(sql)
        print("삽입한 id: ", curs.lastrowid)
        lastRowId = curs.lastrowid
        restaurant["restaurantId"] = lastRowId
        return lastRowId
    except pymysql.err.IntegrityError as error:
        print(error)
        print("insertIntoRestaurant 에서 PK 중복 발생.", restaurant["name"])
        return -1
    except Exception as e:
        print(e)
        print("insertIntoRestaurant에서 알 수 없는 오류 발생")
        raise Exception("insertIntoRestaurant 에서 오류 발생")
    # 삽입 개수 조절용
    # finally:
    #     i += 1
    #     if i >= 300:
    #         return


def categoryQrySelect(qryIndex, restaurant_id):
    qry = [
        f"insert into restaurant_category (category_id, restaurant_id) values (1,  '{restaurant_id}');",
        f"insert into restaurant_category (category_id, restaurant_id) values (2,  '{restaurant_id}');",
        f"insert into restaurant_category (category_id, restaurant_id) values (3,  '{restaurant_id}');",
        f"insert into restaurant_category (category_id, restaurant_id) values (4,  '{restaurant_id}');",
        f"insert into restaurant_category (category_id, restaurant_id) values (5,  '{restaurant_id}');",
        f"insert into restaurant_category (category_id, restaurant_id) values (6,  '{restaurant_id}');",
        f"insert into restaurant_category (category_id, restaurant_id) values (7,  '{restaurant_id}');",
        f"insert into restaurant_category (category_id, restaurant_id) values (8,  '{restaurant_id}');",
        f"insert into restaurant_category (category_id, restaurant_id) values (9,  '{restaurant_id}');",
        f"insert into restaurant_category (category_id, restaurant_id) values (10, '{restaurant_id}');",
        f"insert into restaurant_category (category_id, restaurant_id) values (11, '{restaurant_id}');",
        f"insert into restaurant_category (category_id, restaurant_id) values (12, '{restaurant_id}');"]

    return qry[qryIndex]


def insertIntoRestaurantCategory(curs, restaurant):
    # 삽입 개수 조절용
    # i = 0

    qrySentences = []
    qryIndex = []
    rId = restaurant["restaurantId"]
    for cat in restaurant["metaCategory"]:
        if cat == "한식":
            qryIndex.append(0)
        elif cat == "중식":
            qryIndex.append(1)
        elif cat == "일식":
            qryIndex.append(2)
        elif cat == "양식":
            qryIndex.append(3)
        elif cat == "고기":
            qryIndex.append(4)
        elif cat == "주점":
            qryIndex.append(5)
        elif cat == "곱,대창":
            qryIndex.append(6)
        elif cat == "분식":
            qryIndex.append(7)
        elif cat == "세계음식":
            qryIndex.append(8)
        elif cat == "패스트푸드":
            qryIndex.append(9)
        elif cat == "치킨":
            qryIndex.append(10)
        elif cat == "찜,탕":
            qryIndex.append(11)

    if len(qryIndex) >= 2 and qryIndex[0] != qryIndex[1]:
        qrySentences.append(categoryQrySelect(qryIndex[1], rId))
    if len(qryIndex) == 0:
        print("qryIndex 길이가 0")
        print(restaurant)
        return
    qrySentences.append(categoryQrySelect(qryIndex[0], rId))

    print("rId:", restaurant["restaurantId"], "Restaurant_Category 테이블 삽입")
    try:
        for qry in qrySentences:
            curs.execute(qry)

    except pymysql.err.IntegrityError:
        print("insertIntoRestaurantCategory에서 PK 중복 발생. rId:",
              restaurant["restaurantId"], "naverId:", restaurant["naverId"])
        return
    except:
        print("insertIntoRestaurantCategory에서 알 수 없는 오류 발생")
        raise Exception("insertIntoRestaurantCategory 에서 오류 발생")

    # 삽입 개수 조절용
    # finally:
    #     i += 1
    #     if i >= 300:
    #         return


def insertIntoCategory(curs):
    qrySentences = [
        "insert into category(category_id, name) values(1, '한식')",
        "insert into category(category_id, name) values(2, '중식')",
        "insert into category(category_id, name) values(3, '일식')",
        "insert into category(category_id, name) values(4, '양식')",
        "insert into category(category_id, name) values(5, '고기')",
        "insert into category(category_id, name) values(6, '주점')",
        "insert into category(category_id, name) values(7, '곱,대창')",
        "insert into category(category_id, name) values(8, '분식')",
        "insert into category(category_id, name) values(9, '세계음식')",
        "insert into category(category_id, name) values(10, '패스트푸드')",
        "insert into category(category_id, name) values(11, '치킨')",
        "insert into category(category_id, name) values(12, '찜,탕')"]

    try:
        for qry in qrySentences:
            print("Category 테이블 삽입: ", qry)
            curs.execute(qry)
    except pymysql.err.IntegrityError:
        print("insertIntoCategory에서 PK 중복 발생")
        return
    except:
        print("insertIntoCategory에서 알 수 없는 오류 발생")
        raise Exception("insertIntoCategory 에서 오류 발생")


def insertIntoRestaurantPhoto(curs, restaurant):
    # 삽입 개수 조절용
    # i = 0

    rId = restaurant["restaurantId"]
    path = restaurant["thumUrl"]
    # 없을경우 임시 주소
    if path == None:
        path = "https://cdn.pixabay.com/photo/2020/06/29/10/55/pizza-5352320__480.png"
    filename = restaurant["name"].replace("'", "") + "_thum"

    qry = f"insert into restaurant_photo (restaurant_id, path, filename) values ('{rId}', '{path}', '{filename}')"

    print("rId:", restaurant["restaurantId"], "Restaurant_Photo 테이블 삽입")
    try:
        curs.execute(qry)
    except pymysql.err.IntegrityError:
        print("insertIntoRestuarnatPhoto 에서 PK 중복 발생. rId:",
              restaurant["rId"], "naverId:", restaurant["naverId"])
        return
    except Exception as e:
        print(e)
        print("rId:", rId)
        print("path:", path)
        print("filename:", filename)
        print("insertIntoRestuarnatPhoto 알 수 없는 오류 발생")
        raise Exception("insertIntoRestuarnatPhoto 에서 오류 발생")

    # 삽입 개수 조절용
    # finally:
    #     i += 1
    #     if i >= 300:
    #         return


def insertIntoMenu(curs, restaurant):
    # 삽입 개수 조절용
    # i = 0

    menus = restaurant["menuInfo"]
    restaurant_id = restaurant["restaurantId"]
    for menu in menus:
        name = menu["name"].replace("'", "")
        price = 0
        try:
            price = int(menu["price"].replace(",", ""))
        except:
            price = 0

        qry = f'''insert into menu(
            is_popular,
            name,
            price,
            restaurant_id)
            values (
                '{0}',
                '{name}',
                '{price}',
                '{restaurant_id}'
            )'''

        print("rId:", restaurant_id, "menu 테이블 삽입",
              "메뉴이름:", name, "가격:", price)
        try:
            curs.execute(qry)
        except pymysql.err.IntegrityError:
            print("insertIntoMenu 에서 PK 중복 발생. rId:",  restaurant_id)
            continue
        except Exception as e:
            print(e)
            print(menu)
            print()
            print("insertIntoMenu에서 알 수 없는 오류 발생")
            raise Exception("insertIntoMenu 에서 오류 발생")
        # 삽입 개수 조절용
        # finally:
        #     i += 1
        #     if i >= 300:
        #         return


def updateDB():
    fpath = "../../restaurants/filename.txt"
    filename = utils.readRestaurantFilename(fpath)

    print("DB 연결 중...")
    # DB 연결
    conn = pymysql.connect(host='recoder-mysql.cz5tw7zear7i.ap-northeast-2.rds.amazonaws.com',
                           user='recoder', password='recoder1234', db='recoder_db', charset='utf8')
    curs = conn.cursor()

    # insert 시작
    for name in filename:
        print("Insert 시작")
        overlapPath = "./db/restaurants_overlap.txt"
        overlapInfo = utils.readRestaurantFilename(overlapPath)
        isSame = False
        for overlapName in overlapInfo:
            if overlapName == name:
                isSame = True
                break
        if isSame == True:
            print(name, "은 이미 db에 삽입하였습니다.")
            continue

        insertIntoCategory(curs)
        conn.commit()

        path = "../../restaurants/" + name[:name.find("json")+4] + "/" + name
        jsonData = utils.readJsonFile(path)
        if jsonData == None:
            conn.close()
            print("jsonData를 받아오지 못했습니다. 프로그램 종료.")
            return
        for restaurant in jsonData:
            try:
                retValue = insertIntoRestaurant(curs, restaurant)
                if retValue == -1:
                    print("이미 삽입된 레스토랑이라 메뉴, 사진 삽입 건너뜀." + restaurant["name"])
                    continue
                restaurant["restaurantId"] = retValue
                # conn.commit()
                insertIntoRestaurantCategory(curs, restaurant)
                # conn.commit()
                insertIntoRestaurantPhoto(curs, restaurant)
                # conn.commit()
                insertIntoMenu(curs, restaurant)
                # conn.commit()
                print("insert 완료")
            except Exception as e:
                print(e)
                print("sql문 실행 중 오류 발생. 프로그램 종료.")
                sys.exit(1)
        utils.writeJsonFile(path, jsonData)
        utils.appendOverlap(overlapPath, name)
        conn.commit()
    # DB 닫기
    conn.close()
    print("DB 닫기")


# PK 에러
# pymysql.err.IntegrityError
