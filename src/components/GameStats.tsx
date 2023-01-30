import React, {useContext} from 'react';
import {AppContext} from "../App";

const GameStats = () => {
  const {wins, looses} = useContext(AppContext);
  return (
    <div>
      Выигрышей: <span data-testid="wins">{wins}</span>&nbsp;
      Проигрышей: <span data-testid="looses">{looses}</span>
    </div>
  );
};

export default GameStats;
