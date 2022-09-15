import React from "react";
import "../../style/StudentCard.css";
const ProfileCard = (props) => {
  let e_no = localStorage.getItem("loginid");
  return (
    <>
      <section className="mainCard">
        <div className="imageSec">
          <img id="profilePic" src={props.allData[0].photo} alt="" />
        </div>
        <hr />
        <div className="infoSec">
          <p className="infoText fname" id="fname">
            {props.allData[0].fullname}
          </p>
          <p className="infoText" id="eno">
            E No: {e_no}
          </p>
          <p className="infoText" id="gender">
            Gender: {props.allData[0].gender}
          </p>
          <p className="infoText" id="phoneNo">
            Phone No: {props.allData[0].phoneno}
          </p>
          <p className="infoText" id="branch">
            Branch: {props.allData[0].branch}
          </p>
          <p className="infoText" id="currentSem">
            Semester: {props.allData[0].semester}
          </p>
          <p className="infoText" id="category">
            Category: {props.allData[0].category}
          </p>
          <p className="infoText" id="email">
            Email Id: {props.allData[0].email}
          </p>
          <p className="infoText" id="dob">
            DOB: {props.allData[0].dob}
          </p>
        </div>
      </section>
    </>
  );
};

export default ProfileCard;
