import React from "react";
import styles from "./style.module.scss";

interface Props {
   username: string;
   score: number;
   onClick: React.MouseEventHandler<HTMLDivElement>;
}
const Save: React.FC<Props> = ({ username, score, onClick }) => {
   return (
      <div role="button" className={styles.save} onClick={onClick}>
         <h3>{username}</h3>
         <p>
            Highest score: <span>{score}</span>
         </p>
      </div>
   );
};

export default Save;
