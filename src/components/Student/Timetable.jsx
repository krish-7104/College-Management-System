import React from "react";
const Timetable = (props) => {
  const downloadTimetable = () => {
    window.open(props.ttlink);
  };
  return (
    <React.StrictMode>
      <div className="timetableShowArea">
        <img src={props.ttlink} alt={props.title} />
        <button id="downTimeTable" onClick={downloadTimetable}>
          Download Timetable
        </button>
      </div>
    </React.StrictMode>
  );
};

export default Timetable;
