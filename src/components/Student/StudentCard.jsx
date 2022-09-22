import React from "react";
import "../../style/StudentCard.css";
import {
  MdEmail,
  MdCalendarToday,
  MdCall,
  MdClass,
  MdOutlineLocalOffer,
  MdFemale,
  MdMale,
} from "react-icons/md";
const ProfileCard = (props) => {
  let e_no = sessionStorage.getItem("loginid");
  return (
    <>
      <section className="mainCard">
        <div className="imageSec">
          <img id="profilePic" src={props.allData[0].photo} alt="" />
        </div>
        <hr />
        <div className="infoSec">
          <p className="infoText fname" id="fname" title="Full Name">
            {props.allData[0].fullname}
          </p>
          <p className="infoText" id="eno" title="Enrollment Number">
            <span className="cardDataIcons">
              <MdOutlineLocalOffer />
            </span>
            &nbsp; {e_no}
          </p>
          <p className="infoText" id="branch" title="Branch and Semester">
            <span className="cardDataIcons">
              <MdClass />
            </span>
            &nbsp; {props.allData[0].branch} - Sem {props.allData[0].semester}
          </p>
          <p className="infoText" id="phoneNo" title="Phone Number">
            <span className="cardDataIcons">
              <MdCall />
            </span>
            &nbsp; {props.allData[0].phoneno}
          </p>
          <p className="infoText" id="email" title="Email Address">
            <span className="cardDataIcons">
              <MdEmail />
            </span>
            &nbsp; {props.allData[0].email}
          </p>
          <p className="infoText" id="dob" title="Date Of Birth">
            <span className="cardDataIcons">
              <MdCalendarToday />
            </span>
            &nbsp; {props.allData[0].dob}
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
