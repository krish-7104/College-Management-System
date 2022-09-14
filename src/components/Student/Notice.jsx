import React, { useEffect } from "react";
import { db } from "../../backend/firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

const Notice = () => {
  const callNoticeData = () => {
    let container = document.getElementById("areaForNoticeShow");
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
  };
  useEffect(() => {
    callNoticeData();
  }, []);
  return (
    <React.StrictMode>
      <div className="notice" id="areaForNoticeShow">
        <table id="noticesTable">
          <thead>
            <tr>
              <th className="tableHead" id="noticeTime">
                Timestamp
              </th>
              <th className="tableHead" id="noticeTitle">
                Notice Title
              </th>
              <th className="tableHead" id="noticeLink">
                Link
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </React.StrictMode>
  );
};

export default Notice;
