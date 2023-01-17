import React, {useContext} from 'react';
import {AppContext} from "../App";
import styles from "./FieldRenderer.module.css";
import DotRenderer from "./DotRenderer";

const FieldRenderer = () => {
  const {field} = useContext(AppContext);
  return (
    <div>
      {field?.map((row, rowIndex) => <div className={styles.row} key={rowIndex}>
        {row.map((dot, dotIndex) => <DotRenderer key={dotIndex} dot={dot}/>)}
      </div>)}
    </div>
  );
};

export default FieldRenderer;
