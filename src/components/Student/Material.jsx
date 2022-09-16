import React, { useEffect } from "react";
import { db } from "../../backend/firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { useState } from "react";

import ShowCard from "./ShowCard";
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
      <ShowCard
        key={data.id}
        time={data.timestamp}
        title={data.title + " - " + data.subject}
        link={data.link}
        type="material"
      />
    );
  };
  return (
    <React.StrictMode>
      <div className="material" id="areaFormaterialShow">
        <div className="materialCards">
          <p id="noMaterial">No Material</p> {material.map(MaterialViewCard)}
        </div>
      </div>
    </React.StrictMode>
  );
};

export default Material;
