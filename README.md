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
