import React from "react";
import "../../style/FacultyCard.css";
import {
  MdEmail,
  MdCalendarToday,
  MdCall,
  MdClass,
  MdFemale,
  MdMale,
  MdOutlineLocalOffer,
} from "react-icons/md";
const ProfileCard = (props) => {
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
          <p className="infoText" id="emp_id" title="Employee Number">
            <span className="cardDataIcons">
              <MdOutlineLocalOffer />
            </span>
            &nbsp; {props.allData[0].emp_id}
          </p>
          <p className="infoText" id="email" title="Email Address">
            <span className="cardDataIcons">
              <MdEmail />
            </span>
            &nbsp; {props.allData[0].email}
          </p>
          <p className="infoText" id="phoneNo" title="Phone Number">
            <span className="cardDataIcons">
              <MdCall />
            </span>
            &nbsp; {props.allData[0].phoneno}
          </p>
          <p className="infoText" id="dob" title="Date Of Birth">
            <span className="cardDataIcons">
              <MdCalendarToday />
            </span>
            &nbsp; {props.allData[0].dob}
          </p>
          <p className="infoText" id="department" title="Department">
            <span className="cardDataIcons">
              <MdClass />
            </span>
            &nbsp;{" "}
            {(props.allData[0].post === "Head Of Department"
              ? "HOD"
              : props.allData[0].post) +
              " (" +
              props.allData[0].department +
              ")"}
          </p>
          <p className="infoText" id="gender" title="Gender">
            <span className="cardDataIcons">
              {props.allData[0].gender === "Male" ? <MdMale /> : <MdFemale />}
            </span>
            &nbsp; {props.allData[0].gender}
          </p>
        </div>
      </section>
    </>
  );
};

export default ProfileCard;
