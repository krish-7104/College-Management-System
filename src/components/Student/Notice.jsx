import React, { useEffect } from "react";
import { db } from "../../backend/firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { useState } from "react";
import { BsFillPinAngleFill } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";

const Notice = () => {
  const [notice, setNotice] = useState([]);
  const callNoticeData = () => {
    const q1 = query(collection(db, `notices`), orderBy("timestamp"));
    onSnapshot(q1, (querySnapshot) => {
      querySnapshot.docs.forEach((data) => {
        setNotice((e) => [...e, data.data()]);
      });
    });
  };
  useEffect(() => {
    callNoticeData();
  }, []);

  const NoticeViewCard = (data) => {
    document.getElementById("noNotice").style.display = "none";
    if (data.link_present === false) {
      return (
        <div className="noticeCard">
          <p className="noticeTime">
            <span className="noticeIcon">
              <BsFillPinAngleFill />
            </span>
            {data.timestamp}
          </p>
          <p className="noticeTitle">{data.title}</p>
          <a className="noticeViewButton">No Link!</a>
        </div>
      );
    } else {
      return (
        <div className="noticeCard">
          <p className="noticeTime">
            <span className="noticeIcon">
              <BsFillPinAngleFill />
            </span>
            {data.timestamp}
          </p>
          <p className="noticeTitle">{data.title}</p>
          <a className="noticeViewButton" target="_blank" href={`${data.link}`}>
            View Notice <FiExternalLink className="openLinkNoticeIcon" />
          </a>
        </div>
      );
    }
  };
  return (
    <>
      <div className="notice" id="areaForNoticeShow">
        <div className="noticeCards">
          <div className="noticeCard">
            <p className="noticeTime">
              <b>Upload Time</b>
            </p>
            <p className="noticeTitle" id="noticeTitle">
              <b>Notice Title</b>
            </p>
            <a className="noticeViewButton">
              <b>Notice Link</b>
            </a>
          </div>
          <p id="noNotice">No Notice</p> {notice.map(NoticeViewCard)}
        </div>
      </div>
    </>
  );
};

export default Notice;
