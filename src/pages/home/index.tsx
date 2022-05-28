import React, { useContext, useState } from "react";
import SaveList from "../../components/saves/SaveList";
import Button from "../../components/shared/Button";
import Card from "../../components/shared/Card";
import TextInput from "../../components/shared/TextInput";
import { appContext } from "../../context/AppContext";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { State } from "../../types/State";

const HomePage: React.FC = () => {
   const [player, setPlayer] = useState<string>("");
   const { dispatch } = useContext(appContext);
   const navigate = useNavigate();
   const [error, setError] = useState<boolean>(false);

   const play = () => {
      if (player != "") {
         dispatch({
            type: "CHANGE_STATE",
            payload: { gameState: State.PLAYER },
         });
         dispatch({ type: "SET_PLAYER", payload: { player: player } });
         navigate("/game");
      } else {
         setError(true);
      }
   };

   return (
      <main className={styles.homePage}>
         <Card className={styles.newPlayer}>
            <h1>New Game</h1>
            <div>
               <TextInput
                  placeholder="username"
                  onInput={(e) => setPlayer(e.target.value)}
                  value={player}
               />
               {error && <p className={styles.error}>Enter your username</p>}
            </div>
            <Button onClick={play}>Play</Button>
         </Card>
         <Card className={styles.selectPlayer}>
            <h1>Load Save</h1>
            <SaveList setPlayer={setPlayer} />
         </Card>
      </main>
   );
};

export default HomePage;
