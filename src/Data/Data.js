import convert from 'xml-js';
import { getHollyfromServer } from '../server';

const HOLIDAY = new Map();

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

const getAccount = () => {
  return account;
}

const getData = async (year, month) => {
  if(HOLIDAY.has(year) && HOLIDAY.get(year).has(month)) return HOLIDAY.get(year).get(month);
  
  let _month = month < 10 ? '0' + month : month;

  const xmlString = await getHollyfromServer(year, _month);
  const jsonResult = convertJSONfromXML(xmlString);

  if (HOLIDAY.has(year)){
    HOLIDAY.get(year).set(month, jsonResult);
  }
  else{
    HOLIDAY.set(year, new Map());
    HOLIDAY.get(year).set(month, jsonResult);
  }
  
  return HOLIDAY.get(year).get(month);
  //console.log(HOLIDAY);
}

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
export { getData, getAccount };