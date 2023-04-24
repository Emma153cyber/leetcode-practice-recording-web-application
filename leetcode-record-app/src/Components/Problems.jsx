import React from "react";
import LeetcodeRender from "./LeetcodeRender";

function Problmes() {
  return (
    <div className="Problmes-panel">
      <LeetcodeRender type="Mastery" />
      <LeetcodeRender type="Practing" />
      <LeetcodeRender type="Review" />
    </div>
  );
}

export default Problmes;
