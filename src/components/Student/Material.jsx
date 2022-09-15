import React, { useEffect } from "react";
import { db } from "../../backend/firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { useState } from "react";
import { BsFillPinAngleFill } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
const Material = () => {
  const [material, setMaterial] = useState([]);
  useEffect(() => {
    const q1 = query(collection(db, `materials`), orderBy("timestamp"));
    onSnapshot(q1, (querySnapshot) => {
      querySnapshot.docs.forEach((data) => {
        setMaterial((e) => [...e, data.data()]);
      });
    });
  }, []);

  const MaterialViewCard = (data) => {
    document.getElementById("noMaterial").style.display = "none";
    return (
      <div className="materialCard">
        <p className="materialTime">
          <span className="materialIcon">
            <BsFillPinAngleFill />
          </span>
          {data.timestamp}
        </p>
        <p className="materialTitle">
          {data.title} - {data.subject}
        </p>
        <a className="materialViewButton" target="_blank" href={`${data.link}`}>
          View Material <FiExternalLink className="openLinkMaterialIcon" />
        </a>
      </div>
    );
  };
  return (
    <React.StrictMode>
      <div className="material" id="areaFormaterialShow">
        <div className="materialCards">
          <div className="materialCard">
            <p className="materialTime">
              <b>Upload Time</b>
            </p>
            <p className="materialTitle" id="materialTitle">
              <b>Material - Subject</b>
            </p>
            <a className="materialViewButton">
              <b>Material Link</b>
            </a>
          </div>
          <p id="noMaterial">No Material</p> {material.map(MaterialViewCard)}
        </div>
      </div>
    </React.StrictMode>
  );
};

export default Material;
