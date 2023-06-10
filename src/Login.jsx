import styled, {css} from "styled-components"
import { Form, useNavigate } from "react-router-dom";
import { useState } from "react";
import { tryLogin } from "./server";
import "./App.css"



const Login = () => {
  return (
    <Wrapper>
      <LoginBg>
        <LoginBox>
          <LoginForm/>
        </LoginBox>
      </LoginBg>
    </Wrapper>
  );
}

const LoginForm = () => {
  const [form, setForm] = useState({
    id: '',
    pw: ''
  });
  const [isFail, setIsFail] = useState(false);
  const moveCalendar = useNavigate();
  
  const handleSubmit = async (e) => {
    console.log('submit');
    e.preventDefault();

    let response = await tryLogin(form);
    if(response.result === 'success'){
      sessionStorage.setItem('user', response.username);
      moveCalendar('/')
    }
    else {
      setIsFail(true);
    }
  }

  const checkLength = () => {
    return !(form.id.length > 0 && form.pw.length > 0);
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <div>
        Login
      </div>
      <LoginFail isFail={isFail}>{'Check Id or Pw'}</LoginFail>
      <input
        type="text"
        placeholder="ID"
        value={form.id}
        onChange={(e) => setForm({ ...form, id: e.target.value })}
      />
      <input
        type="password"
        placeholder="PW"
        value={form.pw}
        onChange={(e) => setForm({ ...form, pw: e.target.value })}
      />
      <button type="submit" disabled={checkLength()}>
        login
      </button>

      <ul>
        <li>
          <a href="#">ID찾기</a>
        </li>
        <li>|</li>
        <li>
          <a href="#">PW찾기</a>
        </li>
        <li>|</li>
        <li>
          <a href="#">회원가입</a>
        </li>
      </ul>
    </StyledForm>
  );
}
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

const StyledForm = styled(Form)`
  width: 60%;
  display: flex;
  flex-direction: column;
  & > * {
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 1rem;
  }

  & > div:nth-child(1) {
    font-size: 2.5rem;
    margin-bottom: 20px;
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
const LoginFail = styled.div`
  visibility: ${props => props.isFail ? "visible" : "hidden"};
  color: red;
  font-size: 1rem;
  margin: 0px;
`

export default Login