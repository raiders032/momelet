import seoulDong
import naverCrawl

# 서울의 자치 동 정보를 ../../dong_json/seoul_dong.json 에 저장
seoulDong.startCrawlDong()

# seoul_dong.json의 동 정보를 바탕으로 naver에서 크롤링
# ../../restaurant_json/ 에 자치구_자치동.json 파일로 저장
# ../../log/crawlEndIndex.txt 에 값을 0으로 설정하면 처음부터 크롤링 가능
# ../../log/crawlingLog.txt 에 크롤링에 관한 로그를 기록함
naverCrawl.naver_crawling_with_dong()
