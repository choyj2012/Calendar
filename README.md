# Calendar


## github pages에서 react-router-dom 사용 (vite)  
https://blog.devgenius.io/how-to-deploy-your-vite-react-app-to-github-pages-with-and-without-react-router-b060d912b10e  
useNavigate() 사용

## vite app을 github action으로 deploy하기  
https://vitejs-kr.github.io/guide/static-deploy.html

## login 관련
1. Id, Pw 입력 후 submit
2. response로 성공 여부와 username 받아옴
3. sessionStorage에 user 저장 후 사용
4. 로그아웃시 sessionStorage에서 user 삭제
- 화면 이동을 위해 react-router-dom의 useNavigate 사용


## API KEY 숨기기
1. repository setting - secrets에 환경변수 추가
2. .yml 파일에서 .env generate step 추가
[[Github Actions] React .env 생성](https://velog.io/@chaerin00/Github-Actions-React-.env-%EC%83%9D%EC%84%B1)
- vite의 경우 VITE_로 시작해야함 / import.meta.env로 접근


## 사용자 별로 각 날짜에 스케쥴 추가 구현(완료)
- todo : 해당 날짜에 일정 있을 시 달력 칸에 표시하는 기능 구현
