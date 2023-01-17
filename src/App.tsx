import React, {createContext, useEffect, useState} from 'react';
import './App.css';
import {createField, DOTS_TO_FILL} from "./utils";
import {DotStatus, Field, GameState} from "./types";
import FieldRenderer from "./components/FieldRenderer";
import StatusBar from "./components/StatusBar";

const TIME_TO_REMEMBER = 5;
const TIME_TO_GUESS = 30;

type AppContextType = {
  field?: Field,
  gameState?: GameState,
  currentTurn?: number,
  currentTimer?: number,
  dotClickHandler?: (x: number, y: number) => void,
  playOneMoreTimeHandler?: () => void,
}

export const AppContext = createContext<AppContextType>({});

function App() {
  const [field, setField] = useState(createField());
  const [gameState, setGameState] = useState<GameState>(GameState.ShowNumbers);
  const [currentTurn, setCurrentTurn] = useState(1);
  const [currentTimer, setCurrentTimer] = useState(0);

  const dotClickHandler = (x: number, y: number) => {
    if (gameState !== GameState.Guessing || field[y][x]?.value === undefined) return;

    if (field[y][x].value === currentTurn) {
      const fieldCopy = field.map(row => row.slice());
      fieldCopy[y][x] = {
        ...field[y][x],
        status: DotStatus.Open
      };
      setField(fieldCopy);
      if (currentTurn === DOTS_TO_FILL) {
        setGameState(GameState.GameOverWon)
      } else {
        setCurrentTurn(n => n + 1);
      }
    } else {
      setGameState(GameState.GameOverLoose);
    }
  };

  const playOneMoreTimeHandler = () => {
    setField(createField());
    setGameState(GameState.ShowNumbers);
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
          playOneMoreTimeHandler,
        }}>
          <StatusBar/>
          <FieldRenderer/>
        </AppContext.Provider>
      </header>
    </div>
  );
}

export default App;
