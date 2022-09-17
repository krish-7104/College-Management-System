import React from "react";
import "../../style/StudentCard.css";
import { MdEmail, MdCalendarToday, MdCall, MdClass } from "react-icons/md";
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
            <MdCall />
            &nbsp;{props.allData[0].phoneno}
          </p>
          <p className="infoText" id="branch">
            <MdClass />
            &nbsp; {props.allData[0].branch}
          </p>
          <p className="infoText" id="currentSem">
            Semester: {props.allData[0].semester}
          </p>
          <p className="infoText" id="category">
            Category: {props.allData[0].category}
          </p>
          <p className="infoText" id="email">
            <MdEmail />
            &nbsp;{props.allData[0].email}
          </p>
          <p className="infoText" id="dob">
            <MdCalendarToday />
            &nbsp; {props.allData[0].dob}
          </p>
        </div>
      </section>
    </>
  );
};

export default ProfileCard;
