import React from "react";

// Input : liked : boolean
// Output : onCLick

const Like = props => {
  let classes = "fa ";
  if (!props.liked) {
    classes += "fa-heart-o";
  } else {
    classes += "fa-heart";
  }
  return (
    <i
      onClick={props.onLikeToggle}
      className={classes}
      aria-hidden="true"
      style={{ cursor: "pointer" }}
    ></i>
  );
};

export default Like;
