import React, { useState } from "react";
import { useContext } from "react";
import { Context } from "../Models/Context";

function Reference() {
  const [numberOfLeetcode, setNumberOfLeetcode] = useState("");
  const [googleKeyWord, setGoogleKeyWord] = useState("");

  const { onLogout } = useContext(Context);

  const onLeetcodeSearch = () => {
    const needtoFill = 4 - numberOfLeetcode.length;
    let formatedNumberOfLeetcode = numberOfLeetcode;
    for (let i = 1; i <= needtoFill; i++) {
      formatedNumberOfLeetcode = "0" + formatedNumberOfLeetcode;
    }
    const SearchUrl =
      "https://walkccc.me/LeetCode/problems/" + formatedNumberOfLeetcode + "/";
    window.open(SearchUrl);
  };

  const onGoogleSearch = () => {
    const googleSearchUrl =
      "https://www.google.com/search?q=leetcode " + googleKeyWord;
    window.open(googleSearchUrl);
  };
  return (
    <div className="reference">
      <div className="resource-panel">
        Study Resources:
        <span className="Leetcode-board">
          <a
            href="https://leetcode.com/problemset/all/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Leetcode
          </a>
        </span>
        <span className="Leetcode-board">
          <a
            href="https://www.youtube.com/watch?v=KLlXCFG5TnA&list=PLot-Xpze53ldVwtstag2TL4HQhAnC8ATf"
            target="_blank "
            rel="noopener noreferrer"
          >
            Leetcode Youtobe Solutions
          </a>
        </span>
        <span className="Leetcode-board">
          <a
            href="https://leetcode.com/contest/globalranking/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Leetcode Ranking
          </a>
        </span>
      </div>
      <form className="search-form">
        <label>
          Menu:
          <input
            className="Leetcode-title"
            value={numberOfLeetcode}
            onInput={(e) => {
              setNumberOfLeetcode(e.target.value);
            }}
            placeholder="No. of Leetcode"
          />
          <button onClick={onLeetcodeSearch}>Search in Solutions</button>
        </label>
        <label>
          Google
          <input
            className="google-search"
            value={googleKeyWord}
            onInput={(e) => {
              setGoogleKeyWord(e.target.value);
            }}
            placeholder="Google Leetcode problem, tag, keyword"
          />
          <button onClick={onGoogleSearch}>Google</button>
          <button className="logout-button" type="button" onClick={onLogout}>
            Log Out
          </button>
        </label>
      </form>
    </div>
  );
}

export default Reference;
