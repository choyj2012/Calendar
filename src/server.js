//서버라고 가정
import { getAccount } from "./Data/Data";


//서버 요청시간 설정을 위헤
const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));

const tryLogin = async ({id, pw}) => {
  let response = { result: '', username: ''};
  const account = getAccount();
  for(let user of account){
    if(id == user.id && pw == user.pw){
      response.result = 'success';
      response.username = user.username;
      break;
    }
  }
  await wait(1000); //서버로 요청시간
  return response;
}

const url = "https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo";

const getHollyfromServer = async (year, month) => {
  console.log(`request ${year} ${month}`);
  const reqURL = `${url}?solYear=${year}&solMonth=${month}&ServiceKey=${import.meta.env.VITE_API_KEY}`;
  const response = await fetch(reqURL);
  const xmlHollyDay = await response.text();

  return xmlHollyDay;
}

export { tryLogin, getHollyfromServer };