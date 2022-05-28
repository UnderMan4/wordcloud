import React, { useEffect, useState } from "react";
import Save from "../Save";
import styles from "./style.module.scss";

interface Props {
   setPlayer: (player: string) => void;
}

const SaveList: React.FC<Props> = ({ setPlayer }) => {
   type userInfo = {
      username: string;
      highestScore: number;
   };
   const [userList, setUserList] = useState<userInfo[]>([]);
   useEffect(() => {
      const list = window.localStorage.getItem("playerList");
      setUserList(JSON.parse(list ? list : "[]"));
   }, []);

   return (
      <div className={styles.saveList}>
         <div className={styles.wrapper}>
            {userList.map((user, index) => (
               <Save
                  key={index}
                  username={user.username}
                  score={user.highestScore}
                  onClick={() => setPlayer(user.username)}
               />
            ))}
         </div>
      </div>
   );
};

export default SaveList;
