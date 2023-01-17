import React, {useContext} from 'react';
import {GameState} from "../types";
import {AppContext} from "../App";
import ProgressBar from "@ramonak/react-progress-bar";
import {TIME_TO_GUESS, TIME_TO_REMEMBER} from "../utils";
import styles from "./StatusBar.module.css";

const StatusBar = () => {
  const {gameState, currentTimer, playOneMoreTimeHandler} = useContext(AppContext);
  const showGameState = () => {
    switch (gameState) {
      case GameState.ShowNumbers:
        return "Запомните расположение и порядок чисел";
      case GameState.Guessing:
        return "Нажмите на клеточки с числами в порядке возрастания";
      case GameState.GameOverWon:
        return "Вы выиграли! 😊";
      case GameState.GameOverLoose:
        return "Вы проиграли 😔";
    }
  };

  const progressValue = gameState === GameState.Guessing
    ? ~~(currentTimer / TIME_TO_GUESS * 100)
    : ~~(currentTimer / TIME_TO_REMEMBER * 100);

  return <>
    <div>
      {showGameState()}
    </div>
    <div className={styles.bar}>
      {(gameState === GameState.Guessing || gameState === GameState.ShowNumbers) &&
        <ProgressBar completed={progressValue} isLabelVisible={false} animateOnRender={true}/>}
      {(gameState === GameState.GameOverLoose || gameState === GameState.GameOverWon) &&
        <button className={styles.oneMoreButton} onClick={playOneMoreTimeHandler}>
          Ещё раз?
        </button>}
    </div>
  </>;
};

export default StatusBar;
