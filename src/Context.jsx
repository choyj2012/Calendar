import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

export const CurrYmContext = createContext(null);
export const CurrYmProvider = ({children}) => {

  const [ym, setYM] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth()+1
  })
  const value = {ym: ym, setYM: setYM}
  return (
    <CurrYmContext.Provider value={value}>
      {children}
    </CurrYmContext.Provider>
  )
}

export const SelectedDateContext = createContext(null);
export const SelectedDateProvider = ({children, isLeftOpen, setIsLeftOpen}) => {
  const [selectedDate, setSelectedDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth()+1,
    date: new Date().getDate(),
  });

  const onSelect = (date) => {
    if(!isLeftOpen) {
      setSelectedDate({...date});
      setIsLeftOpen(true);
    }
    else {
      if(JSON.stringify(selectedDate) === JSON.stringify(date))
        setIsLeftOpen(false);
      else
        setSelectedDate({...date});
    }
  }
  const value = [isLeftOpen, selectedDate, onSelect];

  return (
    <SelectedDateContext.Provider value={value}>
      {children}
    </SelectedDateContext.Provider>
  )
}

import { getHolidayfromServer } from "./server/server";
export const HolidayContext = createContext(null);
export const HolidayProvider = ({children}) => {
  const {ym: {year, month}, } = useContext(CurrYmContext);

  const [holiday, setHoliday] = useState(new Map());

  useEffect(() => {
    let ignore = false;
    async function fetchHoliday() {
      if(!ignore){
        setHoliday(await getHolidayfromServer(year, month, holiday));
      }
    }
    fetchHoliday();

    return () => {
      ignore = true;
    }
  }, [year, month]);

  return (
    <HolidayContext.Provider value={holiday}>
        {children}
    </HolidayContext.Provider>
  )
}

export const ScheduleContext = createContext(null);
export const ScheduleProvider = ({children}) => {

  return (
    <ScheduleContext.Provider value={''}>
      {children}
    </ScheduleContext.Provider>
  )
}