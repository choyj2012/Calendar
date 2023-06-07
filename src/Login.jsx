import styled, {css} from "styled-components"
import "./App.css"

const Login = () => {
  return (
    <Wrapper>
      <LoginBg>
        <LoginBox>
          <LoginForm action="/" onSubmit={() => alert('login')}>
            <p>Login</p>
            <input type="text" name="userid" placeholder="ID"></input>
            <input type="password" name="password" placeholder="PW"></input>
            <button type="submit">login</button>

            <ul>
              <li><a href="#">ID찾기</a></li><li>|</li>
              <li><a href="#">PW찾기</a></li><li>|</li>
              <li><a href="#">회원가입</a></li>
            </ul>
          </LoginForm>
        </LoginBox>
      </LoginBg>
    </Wrapper>
  );
}

// const rainbow = css`
//   background: linear-gradient(
//     90deg,
//     rgba(255, 0, 0, 1) 0%,
//     rgba(255, 154, 0, 1) 10%,
//     rgba(208, 222, 33, 1) 20%,
//     rgba(79, 220, 74, 1) 30%,
//     rgba(63, 218, 216, 1) 40%,
//     rgba(47, 201, 226, 1) 50%,
//     rgba(28, 127, 238, 1) 60%,
//     rgba(95, 21, 242, 1) 70%,
//     rgba(186, 12, 248, 1) 80%,
//     rgba(251, 7, 217, 1) 90%,
//     rgba(255, 0, 0, 1) 100%
//   );
// `

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`

const LoginBg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const LoginBox = styled.div`
  width: 40%;
  height: 50%;
  border: 2px black solid;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoginForm = styled.form`
  width: 60%;
  display: flex;
  flex-direction: column;
  & > * {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 1rem;
  }

  & > p {
    font-size: 2.5rem;
    margin-top: 0px;
    margin-bottom: 45px;
  }

  & > input {
    padding: 10px 5px 10px 5px;

    &:focus {
      background-color: rgba(171, 196, 237, 0.4);
    }
  }

  & > button {
    font-size: 1.5rem;
  }

  & > ul {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  & > ul > li > a {
    text-decoration: none;
  }
`


export default Login