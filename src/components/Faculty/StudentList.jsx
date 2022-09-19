import React from "react";

const StudentList = () => {
  return (
    <section className="studentListViewFaculty">
      <div className="selectBranch"></div>
      <div className="showListSec">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Enrollment No</th>
              <th scope="col">Fullname</th>
              <th scope="col">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>121021105010</td>
              <td>Krish A Jotaniya</td>
              <td>+918160704091</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default StudentList;
