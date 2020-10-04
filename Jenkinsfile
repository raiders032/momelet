node {
     stage('Clone repository') {
         checkout scm #repository를 jenkins workspace로 clone
     }

     stage('Build image') {
         app = docker.build("neptunes032/test:$BUILD_NUMBER") #docker image build 및 이름을 teicahe/jenkins:빌드번호 설정
     }
}
