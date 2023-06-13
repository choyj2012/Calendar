//서버에서 사용하는 DB라고 가정
// -------- account data -----------
const account = [
  {
    id: 'test',
    pw: 'test',
    username: 'choyj',
  },
  {
    id: 'test2',
    pw: 'test2',
    username: 'Bob',
  }
]

export const getAccountDB = () => {
  return account;
}

// -------- holiday data ------------
const HOLIDAY = new Map();

export const getHolidayDB = () => HOLIDAY;
export const setHolidayDB = (result, year, month) => {
  if (HOLIDAY.has(year)){
    HOLIDAY.get(year).set(month, result);
  }
  else{
    HOLIDAY.set(year, new Map());
    HOLIDAY.get(year).set(month, result);
  }
}

// -------- schedule data -----------
const SCHEDULE = new Map();
SCHEDULE.set('choyj', new Map());
SCHEDULE.get('choyj').set('20230610', [
  { id: "jdsjj1", title: "test1", detail: "this is test1 schedule" },
  { id: "asdkjk3", title: "test2", detail: "this is test2 schedule" },
  { id: "jdssjj1", title: "test3", detail: "this is test3 schedule" },
])

export const getSchedulefromDB = (username, year, month, date) => {
  const response = {
    isSucess: 'success',
    dateStr: '',
    result: [],
  }

  if(month < 10) month = "0" + month;
  if(date < 10) date = "0" + date;
  const dateStr = "" + year + month + date;
  response.dateStr = dateStr;

  if(SCHEDULE.has(username) && SCHEDULE.get(username).has(dateStr))
    response.result = SCHEDULE.get(username).get(dateStr);
  return response;
}

export const setSchedulefromDB = (username, year, month, date, schedule) => {
  if(!SCHEDULE.has(username)) SCHEDULE.set(username, new Map());

  if(month < 10) month = "0" + month;
  if(date < 10) date = "0" + date;
  const dateStr = "" + year + month + date;

  if(!SCHEDULE.get(username).has(dateStr)) SCHEDULE.get(username).set(dateStr, []);
  SCHEDULE.get(username).get(dateStr).push(schedule);
}