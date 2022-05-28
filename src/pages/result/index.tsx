import { useContext } from "react";
import Button from "../../components/shared/Button";
import Card from "../../components/shared/Card";
import { appContext } from "../../context/AppContext";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { State } from "../../types/State";

const ResultPage: React.FC = () => {
   const { dispatch, state } = useContext(appContext);
   const navigate = useNavigate();

   const playAgain = () => {
      dispatch({ type: "CHANGE_STATE", payload: { gameState: State.PLAYER } });
      navigate("/game");
   };

   const changePlayer = () => {
      dispatch({
         type: "CHANGE_STATE",
         payload: { gameState: State.NEW_PLAYER },
      });
      navigate("/");
   };

   return (
      <div className={styles.resultPage}>
         <Card className={styles.card}>
            <h1>Congratulations {state.player}</h1>
            <div className={styles.info}>
               <table>
                  <tbody>
                     <tr>
                        <td>Points: </td>
                        <td> {state.currentGameInfo?.points}</td>
                     </tr>
                     <tr className={styles.correct}>
                        <td>Good: </td>
                        <td> {state.currentGameInfo?.correct}</td>
                     </tr>
                     <tr className={styles.incorrect}>
                        <td>Bad: </td>
                        <td> {state.currentGameInfo?.incorrect}</td>
                     </tr>
                     <tr className={styles.missed}>
                        <td>Missed: </td>
                        <td> {state.currentGameInfo?.missed}</td>
                     </tr>
                  </tbody>
               </table>
            </div>
            <div className={styles.buttons}>
               <Button onClick={playAgain}>Play again</Button>
               <Button onClick={changePlayer}>Change player</Button>
            </div>
         </Card>
      </div>
   );
};

export default ResultPage;
