import React, { useContext, useState } from "react";
import { Context } from "../Models/Context";

import ApplicationHistoryRender from "./ProblemHistoryRender";
import EditApplication from "./EditProblem";

function LeetcodeRender(props) {
  const list = [];
  const { state, onDeleteApplication, onUpdateHistory } = useContext(Context);
  const [showDetail, setShowDetail] = useState(true);
  const buttonName = showDetail ? "Hide" : "Details";

  let showCollection;
  if (props.type === "Mastery") {
    showCollection = state.Problmes.MasteryCollection;
  } else if (props.type === "Practing") {
    showCollection = state.Problmes.PractingCollection;
  } else if (props.type === "Review") {
    showCollection = state.Problmes.ReviewCollection;
  }

  for (let id in showCollection) {
    const application = showCollection[id];
    const referralName = application.Difficulty
      ? "Level: " + application.Difficulty
      : "";
    const LeetcodeTitle = application.LeetcodeTitle
      ? application.LeetcodeTitle
      : application.LeetcodeLink;
    const linkDisabled = application.LeetcodeLink
      ? "Leetcode-description-link"
      : "disabled-link";

    list.push(
      <li className="application" key={id}>
        <h1>
          {application.Number}:
          <a
            className={linkDisabled}
            href={application.LeetcodeLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {LeetcodeTitle}
            <span className="link-tip">Open this problem in leetcode</span>
          </a>
        </h1>
        <p className="application-context">{referralName}</p>
        <p className="application-context">
          <span className="application-status">{application.status} </span>
          on
          <span className="update-date">{application.updateDate}</span>
        </p>
        <p>🚩 Summary: {application.summary}</p>
        <ApplicationHistoryRender
          histories={application.history}
          show={application.showHistory}
        />
        <div className="application-activities">
          <button
            className="delete-application"
            onClick={() => {
              onDeleteApplication(application.id);
            }}
          >
            Delete
          </button>

          <button
            className="expand-history"
            onClick={() => {
              application.showHistory = !application.showHistory;
              onUpdateHistory(application);
            }}
          >
            History
          </button>
        </div>
        <EditApplication application={application} set />
      </li>
    );
  }

  return (
    <div>
      <div className="collection-heading">
        {props.type}
        <button
          className="on-expand-collection"
          onClick={() => {
            setShowDetail(!showDetail);
          }}
        >
          {buttonName}
        </button>
      </div>
      {showDetail && <ul className="Problmes">{list}</ul>}
    </div>
  );
}

export default LeetcodeRender;
