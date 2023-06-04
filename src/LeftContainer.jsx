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
  const schedules = [
    { id: "jdsjj1", title: "test1", detail: "this is test1 schedule" },
    { id: "asdkjk3", title: "test2", detail: "this is test2 schedule" },
    { id: "jdssjj1", title: "test3", detail: "this is test3 schedule" },
  ];

  const [isOpenAll, setIsOpenAll] = useState(false);
  return (
    <div className="left-contents-wrapper">
      <DateText>{`${selectedDate.month}월 ${selectedDate.date}일`}</DateText>
      <ScheduleList>
        <div
          style={{
            display: "flex",
            alignItems: "center",
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
      <AddScheduleBtn>Add Schedule</AddScheduleBtn>
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
  width: 90%;
  margin-top: 30px;
  font-size: 1.5rem;
`;

const ScheduleBox = styled.div`
  min-height: 30px;
  margin-top: 15px;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid red;
  position: relative;
  
  &:hover{
    background-color: lightblue;
  }
`;
const AddScheduleBtn = styled.button`
  font-size: 1rem;
  margin-top: 30px;
`;
export default LeftContainer;
