import React, {createContext, useEffect, useState} from 'react';
import './App.css';
import {
  createField,
  getFieldParamsByWinsLooses,
  MIN_DOTS,
  MIN_SIZE,
  TIME_TO_GUESS,
  TIME_TO_REMEMBER
} from "./utils";
import {DotStatus, Field, GameState} from "./types";
import FieldRenderer from "./components/FieldRenderer";
import StatusBar from "./components/StatusBar";
import GameStats from "./components/GameStats";

type AppContextType = {
  field: Field,
  gameState: GameState,
  currentTurn: number,
  currentTimer: number,
  wins: number,
  looses: number,
  dotClickHandler: (x: number, y: number) => void,
  playOneMoreTimeHandler: () => void,
}

const initialFieldParams = {
  size: MIN_SIZE,
  dots: MIN_DOTS
};

const initialState = {
  field: createField(initialFieldParams),
  gameState: GameState.ShowNumbers,
  currentTurn: 1,
  currentTimer: 0,
  wins: 0,
  looses: 0,
  dotClickHandler: () => {},
  playOneMoreTimeHandler: () => {},
};

export const AppContext = createContext<AppContextType>(initialState);

function App() {
  const [field, setField] = useState(createField(initialFieldParams));
  const [gameState, setGameState] = useState<GameState>(GameState.ShowNumbers);
  const [currentTurn, setCurrentTurn] = useState(1);
  const [currentTimer, setCurrentTimer] = useState(0);
  const [wins, setWins] = useState(0);
  const [looses, setLooses] = useState(0);
  const [fieldParams, setFieldParams] = useState(initialFieldParams);

  const dotClickHandler = (x: number, y: number) => {
    if (gameState !== GameState.Guessing || field[y][x]?.value === undefined) return;

    const fieldCopy = field.map(row => row.slice());
    if (field[y][x].value === currentTurn) {
      fieldCopy[y][x] = {
        ...field[y][x],
        status: DotStatus.Open
      };
      setField(fieldCopy);
      if (currentTurn === fieldParams.dots) {
        setGameState(GameState.GameOverWon);
        setWins(v => v + 1);
      } else {
        setCurrentTurn(n => n + 1);
      }
    } else {
      fieldCopy[y][x] = {
        ...field[y][x],
        status: DotStatus.Wrong
      };
      setField(fieldCopy);
      setGameState(GameState.GameOverLoose);
      setLooses(v => v + 1);
    }
  };

  const playOneMoreTimeHandler = () => {
    const fieldParams = getFieldParamsByWinsLooses(wins, looses);
    setField(createField(fieldParams));
    setGameState(GameState.ShowNumbers);
    setFieldParams(fieldParams);
  };

  useEffect(() => {
    let timer1: ReturnType<typeof setTimeout>,
      timer2: ReturnType<typeof setInterval>;
    switch (gameState) {
      case GameState.ShowNumbers:
        timer1 = setTimeout(() => {
          setGameState(GameState.Guessing);
        }, TIME_TO_REMEMBER * 1000);
        setCurrentTimer(TIME_TO_REMEMBER);
        timer2 = setInterval(() => {
          setCurrentTimer(t => t - 1);
        }, 1000);
        break;
      case GameState.Guessing:
        setCurrentTurn(1);
        timer1 = setTimeout(() => {
          setGameState(GameState.GameOverLoose);
        }, TIME_TO_GUESS * 1000);
        setCurrentTimer(TIME_TO_GUESS);
        timer2 = setInterval(() => {
          setCurrentTimer(t => t - 1);
        }, 1000);
        break;
    }
    return () => {
      clearTimeout(timer1);
      clearInterval(timer2);
    }
  }, [gameState]);

  return (
    <div className="App">
      <header className="App-header">
        <h3>Игра "Запомни числа"</h3>
        <AppContext.Provider value={{
          field,
          gameState,
          dotClickHandler,
          currentTimer,
          currentTurn,
          wins,
          looses,
          playOneMoreTimeHandler,
        }}>
          <GameStats/>
          <StatusBar/>
          <FieldRenderer/>
        </AppContext.Provider>
      </header>
    </div>
  );
}

export default App;
