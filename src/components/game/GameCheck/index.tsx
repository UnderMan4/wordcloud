import React, { useContext, useState } from "react";
import { appContext } from "../../../context/AppContext";
import Button from "../../shared/Button";
import Card from "../../shared/Card";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { Player } from "../../../types/LocalStorage";

interface Props {
   good: string[];
   checkboxes: React.MutableRefObject<HTMLInputElement[]>;
   numberOfCorrect: number;
}

const GameCheck: React.FC<Props> = ({ good, checkboxes, numberOfCorrect }) => {
   const [checkedCorrect, setCheckedCorrect] = useState<number>(0);
   const [checkedIncorrect, setCheckedIncorrect] = useState<number>(0);
   const [checked, setChecked] = useState<boolean>(false);
   const { dispatch, state } = useContext(appContext);
   const navigate = useNavigate();

   const checkAnswers = () => {
      let correct = 0;
      let incorrect = 0;
      checkboxes.current.forEach((element) => {
         element.disabled = true;
         if (
            element.checked &&
            element.labels &&
            element.labels[0].textContent
         ) {
            if (good.includes(element.labels[0].textContent)) {
               element.labels[0].classList.add(styles.correct);
               correct++;
            } else {
               element.labels[0].classList.add(styles.incorrect);
               incorrect++;
            }
         } else if (
            !element.checked &&
            element.labels &&
            element.labels[0].textContent
         ) {
            if (good.includes(element.labels[0].textContent)) {
               element.labels[0].classList.add(styles.missed);
            }
         }
      });
      setCheckedCorrect(correct);
      setCheckedIncorrect(incorrect);
      const list = window.localStorage.getItem("playerList");
      const playerList: Player[] = JSON.parse(list ? list : "[]");
      const playerName = state.player;
      const playerIndex: number = playerList
         .map((p) => {
            return p.username;
         })
         .indexOf(playerName);
      if (playerIndex == -1) {
         playerList.push({
            username: playerName,
            highestScore: state.currentGameInfo?.points,
         });
         window.localStorage.setItem("playerList", JSON.stringify(playerList));
      } else {
         const lastScore = playerList[playerIndex].highestScore;
         const newScore =
            correct * 2 - (incorrect + (numberOfCorrect - correct));
         playerList[playerIndex] = {
            username: playerName,
            highestScore: Math.max(lastScore ? lastScore : 0, newScore),
         };
         window.localStorage.setItem("playerList", JSON.stringify(playerList));
      }
      setChecked(true);
   };

   const finish = () => {
      dispatch({
         type: "FINISH_GAME",
         payload: {
            currentGameInfo: {
               points: Math.max(
                  0,
                  checkedCorrect * 2 -
                     (checkedIncorrect + (numberOfCorrect - checkedCorrect))
               ),
               correct: checkedCorrect,
               incorrect: checkedIncorrect,
               missed: numberOfCorrect - checkedCorrect,
            },
         },
      });

      navigate("/result");
   };
   return (
      <Card className={styles.gameCheck}>
         {checked ? (
            <Button className={styles.button} onClick={finish}>
               Finish
            </Button>
         ) : (
            <Button className={styles.button} onClick={checkAnswers}>
               Check
            </Button>
         )}
      </Card>
   );
};

export default GameCheck;
