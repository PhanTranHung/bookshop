import React from "react";

export const Box = ({
  border = "1px solid white",
  width = "100%",
  height = undefined,
  background = "white",
  color = "black",
  style,
  ...props
}) => {
  return (
    <div
      style={{
        border,
        width,
        height,
        background,
        color,
        textAlign: "center",
        display: "flex",
        flexFlow: "column wrap",
        justifyContent: "center",
        ...style,
      }}
    >
      {props.children}
    </div>
  );
};
