import React from "react";
import { BsFillPinAngleFill } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
const ShowCard = (props) => {
  return (
    <div className="itemShowCard">
      <p className="itemShowTime">
        <span className="itemShowIcon">
          <BsFillPinAngleFill />
        </span>
        {props.time
          .toDate()
          .toString()
          .replace("GMT+0530 (India Standard Time)", "")}
      </p>
      <p className="itemShowTitle">{props.title}</p>
      <a
        className="itemShowViewButton"
        target="_blank"
        href={`${props.link}`}
        rel="noreferrer"
      >
        {props.type === "notice" ? "View Notice" : "View Material"}
        <FiExternalLink className="openLinkitemShowIcon" />
      </a>
    </div>
  );
};

export default ShowCard;
