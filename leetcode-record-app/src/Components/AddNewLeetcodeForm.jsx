import { useContext, useState } from "react";
import { Context } from "../Models/Context";

import { today, dateRegex } from "../Models/date";

function AddNewLeetcodeForm() {
  const [Number, setNumberName] = useState("");
  const [updateDate, setUpdateDate] = useState(today);
  const [LeetcodeTitle, setLeetcodeTitle] = useState("");
  const [LeetcodeLink, setLeetcodeLink] = useState("");
  const [Difficulty, setReferral] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState("");
  const [summary, setSummary] = useState("");

  const { onaddApplication, setErrorMessage } = useContext(Context);
  const newApplication = {
    Number,
    updateDate,
    LeetcodeTitle,
    LeetcodeLink,
    Difficulty,
    status,
    summary,
  };

  function onSubmit(e) {
    e.preventDefault();
    if ((!LeetcodeLink && !LeetcodeTitle) || !dateRegex.test(updateDate)) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
    onaddApplication(newApplication);
    setNumberName("");
    setLeetcodeLink("");
    setLeetcodeTitle("");
    setReferral("");
    setSummary("");
    setUpdateDate(today);
  }

  return (
    <div className="add-application">
      <button
        className="add-application-form-handle"
        onClick={() => {
          setShowForm(!showForm);
        }}
      >
        Add a new Problem
      </button>
      {showForm && (
        <form className="add-application-form" onSubmit={onSubmit}>
          <input
            value={Number}
            onInput={(e) => {
              setNumberName(e.target.value);
            }}
            placeholder="No."
          />
          <input
            value={updateDate}
            onInput={(e) => {
              setUpdateDate(e.target.value);
            }}
            placeholder="MM/DD/YYYY"
          />
          <input
            value={LeetcodeTitle}
            onInput={(e) => {
              setLeetcodeTitle(e.target.value);
            }}
            placeholder="Problem Name"
          />
          <input
            value={LeetcodeLink}
            onInput={(e) => {
              setLeetcodeLink(e.target.value);
            }}
            placeholder="Leetcode Link"
          />

          <select
            value={Difficulty}
            onInput={(e) => {
              setReferral(e.target.value);
            }}
          >
            <option value="" disabled selected hidden>
              Difficulty
            </option>
            <option value="Hard">Hard</option>
            <option value="Medium">Medium</option>
            <option value="Esay">Hard</option>
          </select>
          <select
            value={status}
            placeholder="Progress"
            onInput={(e) => {
              setStatus(e.target.value);
            }}
          >
            <option value="" disabled selected hidden>
              choose progress
            </option>
            <option value="Practing">Practing</option>
            <option value="Review">Review</option>
            <option value="Mastery">Mastery</option>
          </select>

          <textarea
            value={summary}
            rows="5"
            cols="50"
            onInput={(e) => {
              setSummary(e.target.value);
            }}
            placeholder="Summary"
          ></textarea>

          <button
            className="cancel-application-button"
            onClick={() => {
              setErrorMessage("");
              setShowForm(false);
            }}
          >
            cancel
          </button>
          <button className="add-application-button" type="submit">
            add
          </button>
        </form>
      )}
    </div>
  );
}

export default AddNewLeetcodeForm;
