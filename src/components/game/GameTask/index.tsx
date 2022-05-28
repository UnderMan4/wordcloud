import React from "react";
import Card from "../../shared/Card";
import styles from "./style.module.scss";

interface Props {
   task: string;
}

const GameTask: React.FC<Props> = ({ task }) => {
   return <Card className={styles.gameTask}>Select all {task}</Card>;
};

export default GameTask;
