# Calendar

- React로 스케줄을 추가할 수 있는 간단한 캘린더 구현
- 백엔드 없이 프론트만 구현
- 공휴일 API를 사용해 공휴일 표시

## 공공 데이터 포털 공휴일 API 사용

- [한국천문연구원_특일 정보](https://www.data.go.kr/data/15012690/openapi.do)
- xml -> json으로 파싱해서 사용

## github pages에서 react-router-dom 사용 (vite)

- https://blog.devgenius.io/how-to-deploy-your-vite-react-app-to-github-pages-with-and-without-react-router-b060d912b10e
- useNavigate() 사용

## vite app을 github action으로 deploy하기

- https://vitejs-kr.github.io/guide/static-deploy.html

## login 관련

1. Id, Pw 입력 후 submit
2. response로 성공 여부와 username 받아옴
3. sessionStorage에 user 저장 후 사용
4. 로그아웃시 sessionStorage에서 user 삭제

- 백엔드가 없으므로 스케줄 저장은 안됨.

## API KEY 숨기기

1. repository setting - secrets에 환경변수 추가
2. .yml 파일에서 .env generate step 추가
[[Github Actions] React .env 생성](https://velog.io/@chaerin00/Github-Actions-React-.env-%EC%83%9D%EC%84%B1)

- vite의 경우 VITE_로 시작해야함 / import.meta.env로 접근
