import { useContext, useEffect, useState } from "react";
import { selectedDateContext } from "./Container";
import "./LeftContainer.css";
import styled from "styled-components";

const LeftContainer = () => {
  const [isLeftOpen, selectedDate] = useContext(selectedDateContext);

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
  const [schedules, setSchedules] = useState([
    { id: "jdsjj1", title: "test1", detail: "this is test1 schedule" },
    { id: "asdkjk3", title: "test2", detail: "this is test2 schedule" },
    { id: "jdssjj1", title: "test3", detail: "this is test3 schedule" },
  ]);

  const [isOpenAll, setIsOpenAll] = useState(false);
  return (
    <div className="left-contents-wrapper">
      <DateText>{`${selectedDate.month}월 ${selectedDate.date}일`}</DateText>
      
        <div
          style={{
            width: "90%",
            marginTop: '30px',
            fontSize: '1.5rem',
            display: "flex",
            alignItems: "center",
            flexFlow: "row wrap",
            justifyContent: "space-between",
          }}
        >
          Schedule List
          <button
            style={{ display: "inline-block" }}
            onClick={() => setIsOpenAll((p) => !p)}
          >
            {!isOpenAll ? "Open All" : "Close All"}
          </button>
        </div>
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
      <AddScheduleBtn onClick={() => {
        setSchedules([...schedules, {
          id: new Date().getTime(),
          title: 'new Schedule',
          detail: 'this is new Schedule'
        }])
      }}>Add Schedule</AddScheduleBtn>
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
        }}
      >
        {schedule.detail}
      </p>
    </ScheduleBox>
  );
};
const DateText = styled.div`
  font-size: 2rem;
`;

const ScheduleList = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 90%;
  height: 90%;
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
const AddScheduleBtn = styled.button`
  font-size: 1rem;
  margin-top: 30px;
  width: 80%;
`;
export default LeftContainer;
