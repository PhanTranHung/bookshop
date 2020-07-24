import React from "react";
import { Rate } from "antd";
import "./card.css";

const Card = (props) => {
  return (
    <div className={`card-border ${props.hoverable ? "hoverable" : ""}`}>
      <div className="card-cover_frame">
        <img
          className="card-cover"
          alt="image"
          src={props.cover ? props.cover : "/doraemon.jpg"}
        />
      </div>
      <div className="card-border_content">
        {props.title && <div className="card-title">{props.title}</div>}
        {props.rate && (
          <div>
            <Rate className="elastic" allowHalf value={props.rate} disabled />
          </div>
        )}
        {props.desc && <div className="card-desc">{props.desc}</div>}
        {props.children}
      </div>
    </div>
  );
};

export default Card;
