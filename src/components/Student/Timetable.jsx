import React from "react";
const Timetable = (props) => {
  const downloadTimetable = () => {
    window.open(props.ttlink);
  };
  return (
    <>
      <div className="timetableShowArea">
        <img src={props.ttlink} alt={props.title} />
        <button id="downTimeTable" onClick={downloadTimetable}>
          Download Timetable
        </button>
      </div>
    </>
  );
};

export default Timetable;
