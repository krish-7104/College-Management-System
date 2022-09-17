import React from "react";
import "../../style/FacultyCard.css";
import { MdEmail, MdCalendarToday, MdCall, MdClass } from "react-icons/md";
const ProfileCard = (props) => {
  let email = localStorage.getItem("loginid");
  let department = localStorage.getItem("department");
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
          <p className="infoText" id="email">
            <MdEmail />
            &nbsp;{props.allData[0].email}
          </p>
          <p className="infoText" id="department">
            <MdClass />
            &nbsp;{department}
          </p>
          <p className="infoText" id="phoneNo">
            <MdCall />
            &nbsp;{props.allData[0].phoneno}
          </p>
          <p className="infoText" id="post">
            Post: {props.allData[0].post}
          </p>
          <p className="infoText" id="gender">
            Gender: {props.allData[0].gender}
          </p>
          <p className="infoText" id="joining_date">
            Joining Date: {props.allData[0].joining_date}
          </p>
          <p className="infoText" id="dob">
            Experience: {props.allData[0].experience}+ Years
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
