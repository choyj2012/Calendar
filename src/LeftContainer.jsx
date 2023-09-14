import { useContext, useEffect, useState } from "react";
import "./LeftContainer.css";
import styled from "styled-components";
import { getSchedulefromServer, setSchedulefromServer } from "./server/server";
import { SelectedDateContext } from "./Context";

const LeftContainer = () => {
  const [isLeftOpen, selectedDate] = useContext(SelectedDateContext);

  let className = ["container-left"];
  isLeftOpen && className.push("left-open");

  return (
    <div className={className.join(" ")}>
      <LeftContents key={JSON.stringify(selectedDate)} 
        selectedDate={selectedDate}/>
    </div>
  );
};

const LeftContents = ({selectedDate}) => {
  const [schedules, setSchedules] = useState([]);
  const [isOpenAll, setIsOpenAll] = useState(false);
  const [trigger, setTrigger] = useState(false);
  useEffect(() => {
    let ignore = false;
    async function request() {
      const response = await getSchedulefromServer(sessionStorage.getItem('user'), selectedDate);
      if(!ignore) {
        console.log('request');
        setSchedules([...response.result]);
      }
    }
    request();

    return () => {
      ignore = true;
    }
  }, [trigger]);

  const addSchedule = (newSchedule, selectedDate) => {
    alert('login first');
    setSchedulefromServer(sessionStorage.getItem('user'), selectedDate, newSchedule);
    setTrigger(p => !p);
  }

  return (
    <div className="left-contents-wrapper">
      <DateText>{`${selectedDate.year}년 ${selectedDate.month}월 ${selectedDate.date}일`}</DateText>

      <ScheduleDiv>
        Schedule List
        <button
          style={{ display: "inline-block", alignSelf: "flex-end"}}
          onClick={() => setIsOpenAll((p) => !p)}
        >
          {!isOpenAll ? "Open All" : "Close All"}
        </button>
      </ScheduleDiv>
      <ScheduleList>
        {schedules.map((schedule) => {
          return (
            <Schedule
              key={schedule.id}
              schedule={schedule}
              isOpenAll={isOpenAll}
            />
          );
        })}
      </ScheduleList>
      <AddScheduleForm addSchedule={addSchedule} selectedDate={selectedDate}/>
      
    </div>
  );
}
const Schedule = ({ schedule, isOpenAll }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(isOpenAll);
  }, [isOpenAll]);

  return (
    <ScheduleBox onClick={() => setIsOpen((p) => !p)}>
      <p style={{
        position: "absolute",
        top: "5px",
        right: "10px"
      }}>{isOpen ? "-" : "+"}</p>
      <p>{schedule.title}</p>
      <p
        style={{
          display: isOpen ? "block" : "none",
          marginTop: "20px",
          fontSize: "1rem"
        }}
      >
        {schedule.detail}
      </p>
    </ScheduleBox>
  );
};

const AddScheduleForm = ({addSchedule, selectedDate}) => {
  const [inputData, setInputData] = useState({
    title: '',
    detail: '',
  })
  
  return (
    <AddScheduleDiv>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <label htmlFor="title-input">제목: </label>
        <input type="text" id="title-input" style={{width: "80%"}}
          value={inputData.title} onChange={(e) => setInputData({ ...inputData, title: e.target.value })}/>
      </div>
      <label htmlFor="detail-input">내용: </label>
      <input type="text" id="detail-input" style={{display: "block",flex: "1 1 auto"}}
        value={inputData.detail}  onChange={(e) => setInputData({ ...inputData, detail: e.target.value })}/>
      <AddScheduleBtn
        onClick={() => {
          addSchedule({
            id: new Date().getTime(),
            title: inputData.title,
            detail: inputData.detail,
          }, selectedDate);
          setInputData({title: '', detail: ''});
        }}
      >
        Add Schedule
      </AddScheduleBtn>
    </AddScheduleDiv>
  );
}
const DateText = styled.div`
  font-size: 2rem;
`;

const ScheduleDiv = styled.div`
  width: 90%;
  margin-top: 30px;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  justify-content: space-between;
`
const ScheduleList = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 90%;
  height: 50%;
  margin-top: 10px;
  font-size: 1.5rem;
  overflow-y: scroll;
  padding-right: 5px;
  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: black;
  }

  &::-webkit-scrollbar-track {
    background-color: lightgray;
  }
`;

const ScheduleBox = styled.div`
  min-height: fit-content;
  margin-top: 15px;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid red;
  position: relative;
  flex: 0 0 1;
  &:hover{
    background-color: lightblue;
  }
`;

const AddScheduleDiv = styled.div`
  display: flex;
  flex-flow: column;
  align-content: center;
  width: 90%;
  padding: 10px;
  flex: 1 1 auto;

  & > * {
    margin-bottom: 5px;
  }
`
const AddScheduleBtn = styled.button`
  font-size: 1rem;
  width: 100%;
`;
export default LeftContainer;
