//서버라고 가정
import { getAccountDB, getHolidayDB, setHolidayDB } from "./Data";


//서버 요청시간 설정을 위헤
const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));

// -------- login 요청 -----------
export const tryLogintoServer = async ({id, pw}) => {
  let response = { result: '', username: ''};
  const account = getAccountDB();
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

// --------- holiday 요청 --------
const url = "https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo";

export const getHolidayfromServer = async (year, month) => {
  const HOLIDAY = getHolidayDB(); //DB 확인

  //DB에 이미 존재하면 바로 리턴
  if(HOLIDAY.has(year) && HOLIDAY.get(year).has(month)) return HOLIDAY.get(year).get(month);
  
  //없으면 API호출
  let _month = month < 10 ? '0' + month : month;
  const result = await getHoliAPI(year, _month);

  //DB에 저장
  setHolidayDB(result, year, month);

  //요청 결과 리턴
  return HOLIDAY.get(year).get(month);
}

const getHoliAPI = async (year, month) => {
  console.log(`request ${year} ${month}`);
  const reqURL = `${url}?solYear=${year}&solMonth=${month}&ServiceKey=${import.meta.env.VITE_API_KEY}`;
  const response = await fetch(reqURL);
  const xmlHollyDay = await response.text();

  return convertJSONfromXML(xmlHollyDay);
}

import convert from 'xml-js';

const convertJSONfromXML = (xmlString) => {
  const result = convert.xml2json(xmlString, {
    compact: 'true',
    spaces: 4,
  });
  
  let obj = JSON.parse(result);
  let res = obj.elements[0];
  let body = res.elements[1];
  let items = body.elements[0].elements;
  
  const arr  = new Map();
  if(items === undefined) return arr;

  items.forEach(item => {
    arr.set(
      parseInt(item.elements[3].elements[0].text.slice(-2)),
      item.elements[1].elements[0].text
    )
  })
  
  return arr;
};

// ---------- schedule 요청 --------------
import { getSchedulefromDB, setSchedulefromDB } from "./Data";
export const getSchedulefromServer = async (username, {year, month, date}) => {
  wait(1000);
  const response = {
    isSuccess: 'success',
    dateStr: '',
    result: [],
  }

  if(username === null) {
    response.isSuccess = 'fail'
    return response;
  };

  const dbresponse = getSchedulefromDB(username, year, month, date);
  if(dbresponse.isSucess === 'success'){  //db 요청 성공
    response.result = dbresponse.result;
    response.dateStr = dbresponse.dateStr;
  } else { //실패
    response.isSuccess = 'fail';
  }

  return response;
}

export const setSchedulefromServer = async (username, {year, month, date}, newSchedule) => {
  setSchedulefromDB(username, year, month, date, newSchedule);
}