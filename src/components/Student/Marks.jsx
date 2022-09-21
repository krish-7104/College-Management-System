import React, { useState, useEffect } from "react";
import { db } from "../../backend/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";

const Marks = (props) => {
  const [midsemMarks, setMidSemMarks] = useState([]);
  const [midsemSubject, setMidSemSubject] = useState([]);
  const [externalMarks, setExternalMarks] = useState([]);
  const [externalSubject, setExternalSubject] = useState([]);
  useEffect(() => {
    const midsem = query(
      collection(
        db,
        `/students_details/${props.branch}/midsem/${props.enrollment}/${props.semester}/`
      )
    );
    onSnapshot(midsem, (querySnapshot) => {
      querySnapshot.docs.forEach((data) => {
        setMidSemSubject((prev) => [...prev, data.id]);
        setMidSemMarks((prev) => [...prev, data.data().marks]);
      });
    });
    const external = query(
      collection(
        db,
        `/students_details/${props.branch}/external/${props.enrollment}/${props.semester}/`
      )
    );
    onSnapshot(external, (querySnapshot) => {
      querySnapshot.docs.forEach((data) => {
        setExternalSubject((prev) => [...prev, data.id]);
        setExternalMarks((prev) => [...prev, data.data().marks]);
      });
    });
  }, [props.semester]);

  return (
    <section className="marksShowArea">
      <div className="marksCard">
        <p className="marksTitle">Internal Exam Marks (40)</p>
        <hr />
        <div className="marksTable">
          <ul className="subjectList">
            {midsemSubject.map((subject) => {
              return <li key={subject}>{subject}</li>;
            })}
            <li className="totalMarkShow">Total Marks</li>
          </ul>
          <ul className="marksList">
            {midsemMarks.map((marks) => {
              return <li key={marks}>{marks}</li>;
            })}
            <li className="totalMarkShow">
              {midsemMarks.length !== 0
                ? midsemMarks.reduce((x, y) => parseInt(x) + parseInt(y))
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
            {externalSubject.map((subjects) => {
              return <li key={subjects}>{subjects}</li>;
            })}
            <li className="totalMarkShow">Total Marks</li>
          </ul>
          <ul className="marksList">
            {externalMarks.map((marks) => {
              return <li key={marks}>{marks}</li>;
            })}
            <li className="totalMarkShow">
              {externalMarks.length !== 0
                ? externalMarks.reduce((x, y) => parseInt(x) + parseInt(y))
                : 0}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
export default Marks;
