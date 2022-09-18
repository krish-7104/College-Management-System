import React from "react";

const Marks = (props) => {
  return (
    <section className="marksShowArea">
      <div className="marksCard">
        <p className="marksTitle">Internal Exam Marks (40)</p>
        <hr />
        <div className="marksTable">
          <ul className="subjectList">
            {props.internal[0].map((subject) => {
              return <li>{subject}</li>;
            })}
            <li className="totalMarkShow">Total Marks</li>
          </ul>
          <ul className="marksList">
            {props.internal[1].map((marks) => {
              return <li>{marks}</li>;
            })}
            <li className="totalMarkShow">
              {props.internal[1].reduce((x, y) => parseInt(x) + parseInt(y))}/
              {props.internal[1].reduce(
                (x, y) =>
                  40 -
                  parseInt(x) +
                  parseInt(x) +
                  40 -
                  parseInt(y) +
                  parseInt(y)
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="marksCard">
        <p className="marksTitle">External Exam Marks (60)</p>
        <hr />
        <div className="marksTable">
          <ul className="subjectList">
            {props.external[0].map((subject) => {
              return <li>{subject}</li>;
            })}
            <li className="totalMarkShow">Total Marks</li>
          </ul>
          <ul className="marksList">
            {props.external[1].map((marks) => {
              return <li>{marks}</li>;
            })}
            <li className="totalMarkShow">
              {props.external[1].reduce((x, y) => parseInt(x) + parseInt(y))}/
              {props.external[1].reduce(
                (x, y) =>
                  60 -
                  parseInt(x) +
                  parseInt(x) +
                  60 -
                  parseInt(y) +
                  parseInt(y)
              )}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Marks;
