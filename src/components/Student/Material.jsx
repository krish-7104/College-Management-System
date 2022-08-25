import React, { useEffect } from "react";
import { db } from "../../backend/firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
const Material = () => {
  useEffect(() => {
    let container = document.getElementById("areaFormaterialShow");
    const q1 = query(collection(db, `materials`), orderBy("timestamp"));
    let html = container.innerHTML.replace("</table>", "");
    onSnapshot(q1, (querySnapshot) => {
      querySnapshot.docs.forEach((data) => {
        html += `<tr>
            <td>${data.data().timestamp}</td>
            <td>${data.data().professor}</td>
            <td>${data.data().title}</td>
            <td><a href="${
              data.data().link
            }" target = "_blank" class="viewMaterial">View</a></td>
            </tr>`;
      });
      container.innerHTML = html;
    });
  }, []);
  return (
    <React.StrictMode>
      <div className="material" id="areaFormaterialShow">
        <table id="materialTable">
          <thead>
            <tr>
              <th className="tableHead" id="materialTime">
                Timestamp
              </th>
              <th className="tableHead" id="materialProfessor">
                Professor
              </th>
              <th className="tableHead" id="materialTitle">
                Material Title
              </th>
              <th className="tableHead" id="materialLink">
                Link
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </React.StrictMode>
  );
};

export default Material;
