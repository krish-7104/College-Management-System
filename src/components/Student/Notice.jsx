import React, { useEffect } from "react";
import { db } from "../../backend/firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { useState } from "react";
import ShowCard from "./ShowCard";
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
        <ShowCard
          key={data.id}
          time={data.timestamp}
          title={data.title}
          link="no link"
          type="notice"
        />
      );
    } else {
      return (
        <ShowCard
          key={data.id}
          time={data.timestamp}
          title={data.title}
          link={data.link}
          type="notice"
        />
      );
    }
  };
  return (
    <>
      <div className="notice" id="areaForNoticeShow">
        <div className="noticeCards">
          <p id="noNotice">No Notice</p> {notice.map(NoticeViewCard)}
        </div>
      </div>
    </>
  );
};

export default Notice;
