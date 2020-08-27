import pymysql
import requests
import json
import utils


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
    ret["restaurant_id"] = restaurant["rId"]
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


def insertIntoRestaurant(curs, results):
    for restaurant in results:

        ret = checkRestaurantString(restaurant)
        # if restaurant["rId"] == 22947:
        #     print("metaCategory:", metaCategory)
        #     print("restaurant_id:", restaurant_id)
        #     print("name:", name)
        #     print("naver_review_count:", naver_review_count)
        #     print("opening_hours:", opening_hours)
        #     print("phone_number:", phone_number)
        #     print("latitude:", latitude)
        #     print("longitude:", longitude)
        #     print("address:", address)
        #     print("road_address:", road_address)
        #     print("naver_id:", naver_id)
        #     print("thum_url:", thum_url)

        sql = f'''insert into restaurant(
            restaurant_id,
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
                '{ret["restaurant_id"]}',
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

        print("rId:", restaurant["rId"], "Restaurant 테이블 삽입")
        try:
            curs.execute(sql)
        except pymysql.err.IntegrityError:
            print("insertIntoRestaurant 에서 PK 중복 발생. rId:",
                  ret['restaurant_id'], "naverId:", ret['naver_id'])
            continue
        except Exception as e:
            print(e)
            print(ret)
            raise Exception("insertIntoRestaurant 에서 오류 발생")


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


def insertIntoRestaurantCategory(curs, data):

    for restaurant in data:
        qrySentences = []
        qryIndex = []
        rId = restaurant["rId"]
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
            elif cat == "카페":
                qryIndex.append(6)
            elif cat == "분식":
                qryIndex.append(7)
            elif cat == "세계음식":
                qryIndex.append(8)
            elif cat == "패스트푸드":
                qryIndex.append(9)
            elif cat == "치킨":
                qryIndex.append(10)
            elif cat == "기타":
                qryIndex.append(11)

        if len(qryIndex) >= 2 and qryIndex[0] != qryIndex[1]:
            qrySentences.append(categoryQrySelect(qryIndex[1], rId))
        if len(qryIndex) == 0:
            print("qryIndex 길이가 0")
            print(restaurant)
        qrySentences.append(categoryQrySelect(qryIndex[0], rId))

        print("rId:", restaurant["rId"], "Restaurant_Category 테이블 삽입")
        try:
            for qry in qrySentences:
                curs.execute(qry)

        except pymysql.err.IntegrityError:
            print("wat?")
            print("insertIntoRestaurantCategory에서 PK 중복 발생. rId:",
                  restaurant["rId"], "naverId:", restaurant["naverId"])
            continue
        except:
            raise Exception("insertIntoRestaurantCategory 에서 오류 발생")


def insertIntoCategory(curs):
    qrySentences = [
        "insert into category(category_id, name) values(1, '한식')",
        "insert into category(category_id, name) values(2, '중식')",
        "insert into category(category_id, name) values(3, '일식')",
        "insert into category(category_id, name) values(4, '양식')",
        "insert into category(category_id, name) values(5, '고기')",
        "insert into category(category_id, name) values(6, '주점')",
        "insert into category(category_id, name) values(7, '카페')",
        "insert into category(category_id, name) values(8, '분식')",
        "insert into category(category_id, name) values(9, '세계음식')",
        "insert into category(category_id, name) values(10, '패스트푸드')",
        "insert into category(category_id, name) values(11, '치킨')",
        "insert into category(category_id, name) values(12, '기타')"]
    try:
        for qry in qrySentences:
            curs.execute(qry)
    except pymysql.err.IntegrityError:
        print("insertIntoCategory에서 PK 중복 발생")
        return
    except:
        raise Exception("insertIntoCategory 에서 오류 발생")


def insertIntoRestaurantPhoto(curs, data):
    for restaurant in data:
        rId = restaurant["rId"]
        path = restaurant["thumUrl"]
        # 없을경우 임시 주소
        if path == None:
            path = "https://cdn.pixabay.com/photo/2020/06/29/10/55/pizza-5352320__480.png"
        filename = restaurant["name"].replace("'", "") + "_thum"

        qry = f"insert into restaurant_photo (restaurant_id, path, filename) values ('{rId}', '{path}', '{filename}')"

        print("rId:", restaurant["rId"], "Restaurant_Photo 테이블 삽입")
        try:
            curs.execute(qry)
        except pymysql.err.IntegrityError:
            print("insertIntoRestuarnatPhoto 에서 PK 중복 발생. rId:",
                  restaurant["rId"], "naverId:", restaurant["naverId"])
            continue
        except Exception as e:
            print(e)
            print("rId:", rId)
            print("path:", path)
            print("filename:", filename)
            raise Exception("insertIntoRestuarnatPhoto 에서 오류 발생")


def updateDB():
    fpath = readFilePath()
    print("DB 연결 중...")
    # DB 연결
    conn = pymysql.connect(host='recoderdbinstance.crnm0s8emitk.ap-northeast-2.rds.amazonaws.com',
                           user='recoder', password='shdudtka123', db='sprint1', charset='utf8')
    curs = conn.cursor()

    # insert 시작
    print("Insert 시작")
    # insertIntoCategory(curs)
    # conn.commit()
    jsonData = utils.readJsonFile(fpath)
    if jsonData == None:
        conn.close()
        print("jsonData를 받아오지 못했습니다. 프로그램 종료.")
        return
    try:
        # insertIntoRestaurant(curs, jsonData)
        # conn.commit()
        # insertIntoRestaurantCategory(curs, jsonData)
        # conn.commit()
        insertIntoRestaurantPhoto(curs, jsonData)
        conn.commit()
        print("insert 완료")
    except Exception as e:
        print(e)
        print("sql문 실행 중 오류 발생. 프로그램 종료.")
        conn.commit()
    finally:
        conn.close()
        return

    # DB 닫기
    conn.close()
    print("DB 닫기")


# PK 에러
# pymysql.err.IntegrityError
