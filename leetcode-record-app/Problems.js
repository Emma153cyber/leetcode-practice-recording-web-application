const uuid = require("uuid").v4;

function makeApplicationList() {
  const id1 = uuid();
  const id2 = uuid();
  const id3 = uuid();
  const historyID1 = uuid();

  const applicationFunc = {};
  const PractingProblmes = {
    [id1]: {
      id: id1,
      Number: "1",
      updateDate: "10/01/2022",
      LeetcodeTitle: "tow sum",
      LeetcodeLink: "https://leetcode.com/problems/two-sum/",
      status: "Practing",
      Difficulty: null,
      history: {
        [historyID1]: {
          id: historyID1,
          status: "Practing",
          updateDate: "09/01/2022",
        },
      },
      showHistory: false,
      summary: "hashmap can optimize it.",
    },
  };
  const ReviewProblmes = {
    [id2]: {
      id: id2,
      Number: 2,
      updateDate: "9/01/2022",
      LeetcodeTitle: "add two numbers",
      LeetcodeLink: "https://leetcode.com/problems/add-two-numbers/",
      status: "Review",
      Difficulty: "Medium",
      history: {},
      showHistory: false,
      summary: "two pointers && while + if",
    },
  };
  const MasteryProblmes = {
    [id3]: {
      id: id3,
      Number: 215,
      updateDate: "9/01/2023",
      LeetcodeTitle: " Kth Largest Element in an Array 🍄topk",
      LeetcodeLink:
        "https://leetcode.com/problems/kth-largest-element-in-an-array/",
      status: "Mastery",
      Difficulty: "Medium",
      history: {},
      showHistory: false,
      summary: "priorityQueue to maintain k increasing elements",
    },
  };

  function getCollectionByStatus(status) {
    switch (status.toLowerCase()) {
      case "review":
        return "ReviewCollection";
      case "rejected":
        return "notSelectedCollection";
      case "mastery":
        return "MasteryCollection";
      default:
        return "PractingCollection";
    }
  }

  let Problmes = {
    idCollection: {
      [id1]: "PractingCollection",
      [id2]: "ReviewCollection",
      [id3]: "MasteryCollection",
    },
    PractingCollection: PractingProblmes,
    ReviewCollection: ReviewProblmes,
    MasteryCollection: MasteryProblmes,
  };

  function sortHistory(application) {
    const historyList = application.history;

    let currentHistory = Object.keys(historyList);
    currentHistory.sort((history1, history2) => {
      const timeStamp1 = historyList[history1].updateDate.split("/");
      const timeStamp2 = historyList[history2].updateDate.split("/");
      for (let i = 0; i < 3; i++) {
        if (timeStamp1[i] !== timeStamp2[i]) {
          return timeStamp2[i] - timeStamp1[i];
        }
      }
      return 0;
    });
    let sortedHistory = {};
    for (let key of currentHistory) {
      sortedHistory[key] = historyList[key];
    }
    application.history = sortedHistory;
    return application;
  }

  applicationFunc.contains = function contains(id) {
    return !!Problmes.idCollection[id];
  };

  applicationFunc.getProblmes = function getProblmes() {
    return Problmes;
  };

  applicationFunc.addApplication = function addApplication(newApplication) {
    const id = uuid();
    const status = newApplication.status;
    Problmes[getCollectionByStatus(status)][id] = {
      id,
      ...newApplication,
      history: {},
      showHistory: false,
    };

    Problmes.idCollection[id] = getCollectionByStatus(newApplication.status);
    return id;
  };

  applicationFunc.getApplication = function getApplication(id) {
    const collectionName = Problmes.idCollection[id];
    return Problmes[collectionName][id];
  };

  applicationFunc.updateApplication = function updateApplication(
    id,
    application,
    history
  ) {
    const formerCollection = Problmes.idCollection[id];
    const targetCollection = getCollectionByStatus(application.status);

    if (history) {
      const historyId = uuid();
      application.history[historyId] = {
        id: historyId,
        ...history,
      };
      application = sortHistory(application);
    }

    delete Problmes[formerCollection][id];
    Problmes = {
      idCollection: {
        ...Problmes.idCollection,
        [id]: targetCollection,
      },
      ...Problmes,
      [targetCollection]: {
        ...Problmes[targetCollection],
        [id]: application,
      },
    };

    Problmes.idCollection[id] = targetCollection;
  };

  applicationFunc.deleteApplication = function deleteApplication(id) {
    const collectionName = Problmes.idCollection[id];

    delete Problmes[collectionName][id];
    delete Problmes.idCollection[id];
  };

  applicationFunc.isValidItem = function isValidItem(application) {
    if (!application) {
      return false;
    }
    const dateRegex =
      /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
    if (!dateRegex.test(application.updateDate)) {
      return false;
    }
    const NumberRegex = /^\d+$/;
    if (!NumberRegex.test(application.Number)) {
      return false;
    }

    if (!application.LeetcodeTitle && !application.LeetcodeLink) return false;
    return true;
  };

  return applicationFunc;
}

module.exports = {
  makeApplicationList,
};
