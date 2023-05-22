import convert from 'xml-js';

const API_KEY = "In89aIkmZCdGv3RzrxGCf8mTRmd6Vb2HziAN%2F54W8cPxBnwsNEKlziWSkpO0aWmoENdpESAYfFF3v2%2Bhx5bVkg%3D%3D"
const url = "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo";

const getData = async (year, month) => {
  if(month < 10) month = '0' + month;
  getXMLfromAPI(year, month);
}

const getXMLfromAPI = async (year, month) => {
  const reqURL = `${url}?solYear=${year}&solMonth=${month}&ServiceKey=${API_KEY}`;
  const response = await fetch(reqURL);
  const xmlString = await response.text();
  const result = convert.xml2json(xmlString, {
    compact: 'false',
    spaces: 4,
  });
  console.log(result);
};

getData(2023, 5);