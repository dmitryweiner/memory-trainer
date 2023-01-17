import React, {useContext} from 'react';
import {Dot, DotStatus, GameState} from "../types";
import styles from "./DotRenderer.module.css";
import {AppContext} from "../App";

type DotRendererProps = {
  dot: Dot
};

const DotRenderer = ({dot}: DotRendererProps) => {
  const {gameState, dotClickHandler} = useContext(AppContext);

  let dotStyles = styles.dot;
  if (dot?.status === DotStatus.Wrong) {
    dotStyles += ` ${styles.wrong}`;
  } else if (dot?.value) {
    dotStyles += ` ${styles.filled}`;
  }

  let dotValue = "";
  if (gameState === GameState.ShowNumbers
    || dot?.status === DotStatus.Open
    || dot?.status === DotStatus.Wrong) {
    dotValue = dot.value?.toString() ?? "";
  }

  return (
    <div
      onClick={() => dotClickHandler?.call(this, dot.x, dot.y)}
      className={dotStyles}>
      {dotValue}
    </div>
  );
};

export default DotRenderer;
