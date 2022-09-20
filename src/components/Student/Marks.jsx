import React from "react";
import { useState, useEffect } from "react";

const Marks = (props) => {
  const [midMarks, setmidMarks] = useState([]);
  const [external, setExternal] = useState([]);
  const [subjectsMid, setSubjectsMid] = useState([]);
  const [subjectsExternal, setSubjectsExternal] = useState([]);

  useEffect(() => {
    props.internal[0].split(",").forEach((ele) => {
      setSubjectsMid((prev) => [...prev, ele.split("+")[0]]);
    });
    props.internal[0].split(",").forEach((ele) => {
      setmidMarks((prev) => [...prev, ele.split("+")[1]]);
    });
    props.external[0].split(",").forEach((ele) => {
      setSubjectsExternal((prev) => [...prev, ele.split("+")[0]]);
    });
    props.external[0].split(",").forEach((ele) => {
      setExternal((prev) => [...prev, ele.split("+")[1]]);
    });
  }, []);
  return (
    // <div>Hi</div>
    <section className="marksShowArea">
      <div className="marksCard">
        <p className="marksTitle">Internal Exam Marks (40)</p>
        <hr />
        <div className="marksTable">
          <ul className="subjectList">
            {subjectsMid.map((subject) => {
              return <li>{subject}</li>;
            })}
            <li className="totalMarkShow">Total Marks</li>
          </ul>
          <ul className="marksList">
            {midMarks.map((marks) => {
              return <li>{marks}</li>;
            })}
            <li className="totalMarkShow">
              {midMarks.length !== 0
                ? midMarks.reduce((x, y) => parseInt(x) + parseInt(y))
                : 0}
            </li>
          </ul>
        </div>
      </div>
      <div className="marksCard">
        <p className="marksTitle">External Exam Marks (60)</p>
        <hr />
        <div className="marksTable">
          <ul className="subjectList">
            {subjectsExternal.map((subjects) => {
              return <li>{subjects}</li>;
            })}
            <li className="totalMarkShow">Total Marks</li>
          </ul>
          <ul className="marksList">
            {external.map((marks) => {
              return <li>{marks}</li>;
            })}
            <li className="totalMarkShow">
              {external.length !== 0
                ? external.reduce((x, y) => parseInt(x) + parseInt(y))
                : 0}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
export default Marks;
