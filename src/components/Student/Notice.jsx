import React, { useEffect } from "react";
import { db } from "../../backend/firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { useState } from "react";
import ShowCard from "./ShowCard";
const Notice = () => {
  const [notice, setNotice] = useState([]);
  const callNoticeData = () => {
    const q1 = query(collection(db, `notices`), orderBy("timestamp", "desc"));
    onSnapshot(q1, (querySnapshot) => {
      setNotice(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          allData: doc.data(),
        }))
      );
    });
  };
  useEffect(() => {
    callNoticeData();
  }, []);

  const NoticeViewCard = (data) => {
    document.getElementById("noNotice").style.display = "none";
    return (
      <ShowCard
        key={data.id}
        time={data.allData.timestamp}
        title={data.allData.title}
        link={data.allData.link}
        type="notice"
      />
    );
  };
  return (
    <>
      <div className="notice" id="areaForNoticeShow">
        <p id="noNotice">No Notice</p> {notice.map(NoticeViewCard)}
      </div>
    </>
  );
};

export default Notice;
