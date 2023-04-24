import React from "react";
import { useState, useContext } from "react";
import { Context } from "../Models/Context";
import { today } from "../Models/date";

function EditApplication({ application }) {
  const [updatedNumber, setNumberName] = useState(application.Number);
  const [updatedUpdateDate, setUpdateDate] = useState(today);
  const [updatedLeetcodeTitle, setupdatedLeetcodeTitle] = useState(
    application.LeetcodeTitle
  );
  const [updatedLeetcodeLink, setUpdatedLeetcodeLink] = useState(
    application.LeetcodeLink
  );
  const [updatedDifficulty, setUpdatedDifficulty] = useState(
    application.Difficulty
  );
  const [updatedStatus, setStatus] = useState(application.status);
  const [updatedSummary, setSummary] = useState(application.summary);
  const [onEditing, setOnEditing] = useState(false);

  const history = {
    status: application.status,
    updateDate: application.updateDate,
    summary: application.updatedSummary,
  };

  const newApplication = {
    ...application,
    Number: updatedNumber,
    updateDate: updatedUpdateDate,
    LeetcodeTitle: updatedLeetcodeTitle,
    LeetcodeLink: updatedLeetcodeLink,
    Difficulty: updatedDifficulty,
    status: updatedStatus,
    summary: updatedSummary,
  };
  const { onUpdateHistory, onUpdateCollection } = useContext(Context);

  return (
    <div className="edit-application">
      <button
        className="edit-application-button"
        onClick={() => {
          setOnEditing(!onEditing);
        }}
      >
        Update
      </button>

      {onEditing && (
        <div>
          <form className="edit-application-form">
            <input
              value={updatedNumber}
              onInput={(e) => {
                setNumberName(e.target.value);
              }}
              placeholder="No."
            />
            <input
              value={updatedLeetcodeTitle}
              onInput={(e) => {
                setupdatedLeetcodeTitle(e.target.value);
              }}
              placeholder="Problem Name"
            />
            <input
              value={updatedLeetcodeLink}
              onInput={(e) => {
                setUpdatedLeetcodeLink(e.target.value);
              }}
              placeholder="Leetcode Link"
            />
            <input
              value={updatedUpdateDate}
              onInput={(e) => {
                setUpdateDate(e.target.value);
              }}
              placeholder="MM/DD/YYYY"
            />
            <input
              value={updatedDifficulty}
              onInput={(e) => {
                setUpdatedDifficulty(e.target.value);
              }}
              placeholder="Difficulty"
            />
            <input
              value={updatedStatus}
              onInput={(e) => {
                setStatus(e.target.value);
              }}
              placeholder="status"
            />

            <textarea
              value={updatedSummary}
              onInput={(e) => {
                setSummary(e.target.value);
              }}
              placeholder="Summary"
            ></textarea>
          </form>
          <div className="edit-application-shortcut">
            <button
              className="edit-application-button--no-selected"
              onClick={() => {
                onUpdateCollection(
                  {
                    ...application,
                    status: "Practing",
                    updateDate: today,
                  },
                  history
                );
                setOnEditing(false);
              }}
            >
              ✍ move to practing
            </button>
            <button
              className="edit-application-button--no-selected"
              onClick={() => {
                onUpdateCollection(
                  {
                    ...application,
                    status: "Review",
                    updateDate: today,
                  },
                  history
                );
                setOnEditing(false);
              }}
            >
              📝 Need to review
            </button>
            <button
              className="edit-application-button--get_hired"
              onClick={() => {
                onUpdateCollection(
                  {
                    ...application,
                    status: "Mastery",
                    updateDate: today,
                  },
                  history
                );
                setOnEditing(false);
              }}
            >
              ✅ Have masterted!
            </button>
            <button
              className="edit-application-button"
              onClick={() => {
                onUpdateHistory(newApplication, history);
                setOnEditing(false);
              }}
            >
              Submit
            </button>
            <button
              className="edit-application-button"
              onClick={() => {
                setOnEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditApplication;
