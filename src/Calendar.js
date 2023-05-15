let cal = [];
let tmp = [];

class dateObj {
  constructor (year, month, date){
    this.year = year;
    this.month = month;
    this.date = date;
  }
}
const addDate = (dateObj) => {
  tmp.push(dateObj);
  
  if(tmp.length == 7){
    cal.push(tmp);
    tmp = [];
  }
}

//month -> 0 ~ 11
const getCalendar = (year, month) => {
  cal = [];  tmp = [];
  let prevM = new Date(year, month, 0);
  let prevDay = prevM.getDay(); //저번 달 마지막 요일
  let prevDate = prevM.getDate(); //저번 달 마지막 날짜

  let curM = new Date(year, month + 1, 0);
  let endDate = curM.getDate(); //이번 달 마지막 날짜
  let endDay = curM.getDay(); //이번 달 마지막 요일

  //저번 달 날짜 출력 개수 = (prevDay + 1) % 7;
  for(let i = (prevDay + 1) % 7; i > 0; i--){
    addDate(new dateObj(year, (month+11)%12+1, prevDate - i + 1));
  }

  for(let i = 1; i<=endDate; i++){
    addDate(new dateObj(year, (month+1), i));
  }

  //다음 달 날짜 출력 개수 = 6 - endDay
  for(let i = 1; i <= 6-endDay; i++){
    addDate(new dateObj(year, (month+1)%12+1, i));
  }

  return cal;
}

export { getCalendar };