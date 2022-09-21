import React, { useEffect } from "react";
import { db } from "../../backend/firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { useState } from "react";

import ShowCard from "./ShowCard";
const Material = () => {
  const [material, setMaterial] = useState([]);
  useEffect(() => {
    const q1 = query(collection(db, `materials`), orderBy("timestamp", "desc"));
    onSnapshot(q1, (querySnapshot) => {
      setMaterial(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          allData: doc.data(),
        }))
      );
    });
  }, []);

  const MaterialViewCard = (data) => {
    document.getElementById("noMaterial").style.display = "none";
    return (
      <ShowCard
        key={data.id}
        time={data.allData.timestamp}
        title={data.allData.title + " - " + data.allData.subject}
        link={data.allData.link}
        type="material"
      />
    );
  };
  return (
    <>
      <div className="material" id="areaFormaterialShow">
        <p id="noMaterial">No Material</p> {material.map(MaterialViewCard)}
      </div>
    </>
  );
};

export default Material;
