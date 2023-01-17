import React, {useContext} from 'react';
import {GameState} from "../types";
import {AppContext} from "../App";

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

  return <>
    <div>
      {showGameState()}
    </div>
    <div>
      {/*TODO: create progress bar*/ " "}
      {gameState === GameState.Guessing || gameState === GameState.ShowNumbers ? currentTimer : ""}
      {(gameState === GameState.GameOverLoose || gameState === GameState.GameOverWon) &&
        <button onClick={playOneMoreTimeHandler}>
          Ещё раз?
        </button>}
    </div>
  </>;
};

export default StatusBar;
