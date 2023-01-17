import React, {useContext} from 'react';
import {Dot, DotStatus, GameState} from "../types";
import styles from "./DotRenderer.module.css";
import {AppContext} from "../App";

type DotRendererProps = {
  dot: Dot
};

const DotRenderer = ({dot}: DotRendererProps) => {
  const {gameState, dotClickHandler} = useContext(AppContext);
  return (
    <div
      onClick={() => dotClickHandler?.call(this, dot.x, dot.y)}
      className={`${styles.dot} ${dot?.value ? styles.filled : ""}`}>
      {gameState === GameState.ShowNumbers || dot?.status === DotStatus.Open ? dot?.value : ""}
    </div>
  );
};

export default DotRenderer;
