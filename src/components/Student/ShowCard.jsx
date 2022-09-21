import React from "react";
import { BsFillPinAngleFill } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import { FaBook } from "react-icons/fa";

const ShowCard = (props) => {
  return (
    <div className="itemShowCard">
      <p className="itemShowTime">
        <span className="itemShowIcon">
          {props.type === "notice" ? <BsFillPinAngleFill /> : <FaBook />}
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
        href={props.link !== "no" ? `${props.link}` : null}
        rel="noreferrer"
      >
        {props.type === "notice"
          ? props.link === "no"
            ? "No Link"
            : "View Notice"
          : "View Material"}
        <FiExternalLink className="openLinkitemShowIcon" />
      </a>
    </div>
  );
};

export default ShowCard;
