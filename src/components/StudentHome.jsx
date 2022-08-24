import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import StudentCard from "./StudentCard";
import "../style/StudentHome.css";
import { db } from "../backend/firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
const StudentHome = () => {
  let loginId = localStorage.getItem("loginid");
  let branch = localStorage.getItem("branch");
  const [details, setDetails] = useState([
    {
      fullname: "",
      e_no: "",
      gender: "",
      phoneno: "",
      branch: "",
      semester: "",
      category: "",
      dob: "",
      photo:
        "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png",
    },
  ]);
  useEffect(() => {
    const q1 = query(
      collection(db, `students_details/${branch}/individual_student/`)
    );
    onSnapshot(q1, (querySnapshot) => {
      querySnapshot.docs.forEach((data) => {
        if (data.data().e_no === loginId) {
          setDetails(() => [
            {
              fullname:
                data.data().first_name +
                " " +
                data.data().middle_name +
                " " +
                data.data().last_name,
              e_no: loginId,
              gender: data.data().gender,
              phoneno: data.data().phone_no,
              branch: branch,
              semester: data.data().current_sem,
              category: data.data().category,
              photo: data.data().photo,
              dob: data.data().birth_date,
            },
          ]);
        }
      });
    });
  }, []);
  let noticeClick = 0;
  const getNotices = () => {
    if (noticeClick != 1) {
      let container = document.getElementById("noticeArea");
      let view1 = document.getElementById("studentView");
      let view2 = document.getElementById("noticeArea");
      if (view1.classList.contains("disable")) {
        view1.classList.remove("disable");
      }
      if (view2.classList.contains("disable")) {
        view2.classList.remove("disable");
      }
      const q1 = query(collection(db, `notices`), orderBy("timestamp"));
      let html = container.innerHTML.replace("</table>", "");
      onSnapshot(q1, (querySnapshot) => {
        querySnapshot.docs.forEach((data) => {
          if (data.data().link_present) {
            html += `<tr>
          <td>${data.data().timestamp}</td>
          <td>${data.data().title}</td>
          <td><a href="${
            data.data().link
          }" target = "_blank" class="viewNotice">View</a></td>
          </tr>`;
          } else {
            html += `<tr>
          <td>${data.data().timestamp}</td>
          <td>${data.data().title}</td>
          <td>No Link!</td>
          </tr>`;
          }
        });
        html += "";
        container.innerHTML = html;
      });
      noticeClick++;
    }
  };
  const logoutHandler = () => {
    window.open("/", "_self");
  };

  return (
    <React.StrictMode>
      <Navbar title="Students" />
      <section className="studentContainer">
        <StudentCard allData={details} />
        <div className="studentBtnsArea">
          <ul className="studentList">
            <li id="timetable">Timetable</li>
            <li id="material">Material</li>
            <li id="marks">View Marks</li>
            <li id="notices" onClick={getNotices}>
              Notices
            </li>
            <li id="logout" onClick={logoutHandler}>
              Log Out
            </li>
          </ul>
        </div>
        <section className="studentView disable" id="studentView">
          <div className="notice disable" id="noticeArea">
            <table>
              <th className="tableHead" id="noticeTime">
                Timestamp
              </th>
              <th className="tableHead" id="noticeTitle">
                Notice Title
              </th>
              <th className="tableHead" id="noticeLink">
                Link
              </th>
            </table>
          </div>
        </section>
      </section>
    </React.StrictMode>
  );
};

export default StudentHome;
