import "../App.css";
import React from "react";
import { useState, useReducer, useEffect } from "react";

import Reference from "./Resources";
import Login from "./Login";

import Problmes from "./Problems";
import Footer from "./Footer";
import AddNewLeetcodeForm from "./AddNewLeetcodeForm";

import {
  fetchaddApplication,
  fetchDeleteApplication,
  fetchLogin,
  fetchLogout,
  fetchSession,
  fetchProblmes,
  fetchUpdateProblmestatus,
} from "../Controller/services";

import { initialState, reducer } from "../Controller/reducer";
import { MESSAGES } from "../Models/messages";
import { Context } from "../Models/Context";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");

  const [state, dispatch] = useReducer(reducer, initialState);
  function checkForSession() {
    setIsLoading(true);
    fetchSession()
      .then((res) => {
        setUsername(res.username);
        populateProblmes();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function populateProblmes() {
    fetchProblmes()
      .then((Problmes) => {
        dispatch({
          type: "updateSessions",
          Problmes: Problmes,
        });
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage(MESSAGES[error.error]);
      });
  }

  function onLogin(username) {
    fetchLogin(username)
      .then((Problmes) => {
        dispatch({
          type: "login",
          username,
          Problmes,
        });
        populateProblmes();
        setErrorMessage("");
        setUsername(username);
      })
      .catch((error) => {
        setErrorMessage(MESSAGES[error.error]);
      });
  }

  function onLogout() {
    fetchLogout()
      .then(() => {
        dispatch({
          type: "logout",
        });
        setErrorMessage("");
        setUsername("");
      })
      .catch((error) => {
        setErrorMessage(MESSAGES[error.error]);
      });
  }

  function onaddApplication(newApplication) {
    fetchaddApplication(newApplication)
      .then((application) => {
        dispatch({
          type: "addProblem",
          id: application.id,
          newApplication: application,
        });
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage(MESSAGES[error.error]);
      });
  }

  function onUpdateHistory(application, history) {
    fetchUpdateProblmestatus(application.id, application, history)
      .then((updatedApplication) => {
        dispatch({
          type: "updateHistory",
          id: application.id,
          application: updatedApplication,
          status: application.status,
        });
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage(MESSAGES[error.error]);
      });
  }

  function onUpdateCollection(application, history) {
    fetchUpdateProblmestatus(application.id, application, history)
      .then(() => {
        console.log(application);
        populateProblmes();
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage(MESSAGES[error.error]);
      });
  }

  function onDeleteApplication(id) {
    fetchDeleteApplication(id)
      .then(() => {
        dispatch({
          type: "deleteProblem",
          id: id,
        });
        populateProblmes();
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage(MESSAGES[error.error]);
      });
  }

  useEffect(() => {
    checkForSession();
  }, []);

  return (
    <Context.Provider
      value={{
        errorMessage,
        setErrorMessage,
        state,
        onLogin,
        onLogout,
        onaddApplication,
        onUpdateHistory,
        onUpdateCollection,
        onDeleteApplication,
      }}
    >
      <div className="app">
        {!isLoading && state.isLoggedIn && (
          <div>
            <div>
              <header>
                <h1>Welcome, {username}</h1>
                <Reference />
                <AddNewLeetcodeForm />
              </header>
            </div>
          </div>
        )}

        <body className="main-body">
          {errorMessage && (
            <div className="error-message"> &#9888; {errorMessage}</div>
          )}
          {isLoading && <div className="isLoading">Loading...</div>}
          {!isLoading && !state.isLoggedIn && <Login />}
          {!isLoading && state.isLoggedIn && (
            <div className="user-panel">
              <div className="right-part">
                <AddNewLeetcodeForm />
                {/* <Logout /> */}
              </div>
              <div className="Problmes-panel">
                <Problmes />
              </div>
            </div>
          )}
        </body>
        <Footer />
      </div>
    </Context.Provider>
  );
}

export default App;
