export const initialState = {};
export function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isLoggedIn: true,
        username: action.username,
        Problmes: action.Problmes,
      };
    case "logout":
      return {
        ...state,
        isLoggedIn: false,
        username: initialState.username,
        Problmes: {},
      };
    case "addProblem":
      const targetCollection1 = getCollectionByStatus(
        action.newApplication.status
      );

      return {
        ...state,
        Problmes: {
          ...state.Problmes,
          [targetCollection1]: {
            ...state.Problmes[targetCollection1],
            [action.id]: action.newApplication,
          },

          idCollection: {
            ...state.Problmes.idCollection,
            [action.id]: targetCollection1,
          },
        },
      };
    case "updateHistory":
      const collectionByStatus = getCollectionByStatus(action.status);
      return {
        ...state,
        Problmes: {
          ...state.Problmes,
          [collectionByStatus]: {
            ...state.Problmes[collectionByStatus],
            [action.id]: action.application,
          },
        },
      };
    case "updateCollection":
      const formerCollection = state.Problmes.idCollection[action.id];
      const targetCollection = getCollectionByStatus(action.status);
      return {
        ...state,
        Problmes: {
          ...state.application,
          [formerCollection]: {
            ...state.Problmes[formerCollection],
            delete: [action.id],
          },
          [targetCollection]: {
            ...state.Problmes[targetCollection],
            [action.id]: action.application,
          },
        },
      };
    case "deleteProblem":
      const collection = state.Problmes.idCollection[action.id];
      return {
        ...state,
        Problmes: {
          ...state.Problmes,
          [collection]: {
            ...state.Problmes[collection],
            delete: [action.id],
          },
          idCollection: {
            ...state.Problmes.idCollection,
            delete: [action.id],
          },
        },
      };
    case "updateSessions":
      return {
        ...state,
        Problmes: action.Problmes,
        isLoggedIn: true,
      };
    default:
      return state;
  }
}

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
