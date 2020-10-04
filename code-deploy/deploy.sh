REPOSITORY=/home/ubuntu/build
BACKENDPATH=recorder/backend/sprint1
PROJECT_NAME=recorder
PROGRAM_NAME=sprint1

echo ">현재 구동중인 애플리케이션 pid확인"

CURRENT_PID=$(pgrep -f ${PROGRAM_NAME}.*.jar)

echo "현재 구동중인 애플리케이션 pid: @CURRENT_PID"

if [ -z "$CURRENT_PID" ]; then
    echo "> 현재 구동중인 애플리케이션이 없으므로 종료하지 않습니다."
else
    echo "> kill -15 $CURRENT_PID"
    kill -15 $CURRENT_PID
    sleep 5
fi

echo "> 새 어플리케이션 배포"

JAR_NAME=$(ls -tr $REPOSITORY/ | grep jar | tail -n 1)

echo "> JAR Name: $JAR_NAME"

pwd

nohup java -jar $REPOSITORY/$JAR_NAME 2>&1 &
