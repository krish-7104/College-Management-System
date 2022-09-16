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
        {props.time}
      </p>
      <p className="itemShowTitle">{props.title}</p>
      {props.link === "no link" ? (
        <a className="itemShowViewButton" target="_blank">
          {props.type === "notice" ? "" : "View itemShow"}
        </a>
      ) : (
        <a
          className="itemShowViewButton"
          target="_blank"
          href={`${props.link}`}
          without
          rel="noreferrer"
        >
          {props.type === "notice" ? "View Notice" : "View Material"}
          <FiExternalLink className="openLinkitemShowIcon" />
        </a>
      )}
    </div>
  );
};

export default ShowCard;
