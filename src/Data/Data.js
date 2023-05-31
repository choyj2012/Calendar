import convert from 'xml-js';

const API_KEY = "In89aIkmZCdGv3RzrxGCf8mTRmd6Vb2HziAN%2F54W8cPxBnwsNEKlziWSkpO0aWmoENdpESAYfFF3v2%2Bhx5bVkg%3D%3D"
const url = "https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo";

const HOLIDAY = new Map();
const getData = async (year, month) => {
  if(HOLIDAY.has(year) && HOLIDAY.get(year).has(month)) return HOLIDAY.get(year).get(month);
  
  let _month = month < 10 ? '0' + month : month;
  const result = await getXMLfromAPI(year, _month);

  if (HOLIDAY.has(year)){
    HOLIDAY.get(year).set(month, result);
  }
  else{
    HOLIDAY.set(year, new Map());
    HOLIDAY.get(year).set(month, result);
  }
  
  return HOLIDAY.get(year).get(month);
  //console.log(HOLIDAY);
}

const getXMLfromAPI = async (year, month) => {
  console.log(`request ${year} ${month}`);
  const reqURL = `${url}?solYear=${year}&solMonth=${month}&ServiceKey=${API_KEY}`;
  const response = await fetch(reqURL);
  const xmlString = await response.text();

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
export { getData };