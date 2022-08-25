import React, { useEffect, useState } from "react";
import { db } from "../../backend/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
const Marks = () => {
  let e_no = localStorage.getItem("loginid");
  let branch = localStorage.getItem("branch");
  const [allData, setAllData] = useState([
    {
      subjects: [],
      midMarks: [],
      externalMarks: [],
    },
  ]);

  let container = document.getElementById("areaFormarksShow");
  let html = container.innerHTML.replace("</table>", "");
  const q1 = query(collection(db, `students_details/${branch}/student_marks/`));
  onSnapshot(q1, (querySnapshot) => {
    querySnapshot.docs.forEach((data) => {
      if (data.id === e_no) {
        setAllData({
          subjects: data.data().subjects,
          midMarks: data.data().mid_sem,
          externalMarks: data.data().external,
        });
      }
    });
  });

  return (
    <React.StrictMode>
      <div className="marks" id="areaFormarksShow">
        <table id="marksTable">
          <thead>
            <tr>
              <th className="tableHead" id="marksTime">
                Subjects
              </th>
              <th className="tableHead" id="marksProfessor">
                Mid Semester
              </th>
              <th className="tableHead" id="marksTitle">
                End Semester
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </React.StrictMode>
  );
};

export default Marks;
