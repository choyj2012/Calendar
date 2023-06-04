import { useContext } from "react";
import { selectedDateContext } from "./Container"

const LeftContainer = () => {
  const [isLeftOpen, selectedDate] = useContext(selectedDateContext);

  let className = ["container-left"];
  isLeftOpen && className.push("left-open");
    return (
      <div className={className.join(" ")}>
        {isLeftOpen &&
          <div>
            {`${selectedDate.month}월 ${selectedDate.date}일`}
          </div>
        }
      </div>
    )
};

export default LeftContainer