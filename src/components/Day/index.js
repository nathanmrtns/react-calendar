import React from "react";

import './styles.css'
const Day = (props) => {
  const {
    day,
    day: { date, isCurrentMonth, isToday, number, isWeekend },
    select,
    selected,
  } = props;
  return (
    <span
      key={date.toString()}
      className={
        "day" +
        (isToday ? " today" : "") +
        (isCurrentMonth ? "" : " different-month") +
        (date.isSame(selected) ? " selected" : "") +
        (isWeekend ? " weekend" : "")
      }
      onClick={() => select(day)}
    >
      {number}
    </span>
  );
};

export default Day;
