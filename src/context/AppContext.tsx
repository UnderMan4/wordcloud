import React, { createContext, useReducer } from "react";
import { State } from "../types/State";

type action = {
   type: string;
   payload: data;
};

type data = {
   player?: string;
   highestScore?: number;
   gameState?: State;
   currentGameInfo?: gameInfo;
};
type gameInfo = {
   points: number;
   correct: number;
   incorrect: number;
   missed: number;
};

type contextType = {
   dispatch: React.Dispatch<action>;
   state: data;
};

const appReducer = (state: any, action: action) => {
   switch (action.type) {
      case "SET_PLAYER": {
         return {
            ...state,
            player: action.payload.player,
         };
      }
      case "CHANGE_STATE": {
         return {
            ...state,
            gameState: action.payload.gameState,
         };
      }
      case "FINISH_GAME": {
         return {
            ...state,
            currentGameInfo: action.payload.currentGameInfo,
            gameState: State.FINISHED,
         };
      }
   }
};
const initialState = {
   player: "",
   highestScore: 0,
   gameState: State.NEW_PLAYER,
};
const appContext = createContext<contextType>({
   state: initialState,
   dispatch: () => null,
});

interface Props {
   children: React.ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }) => {
   const [state, dispatch] = useReducer(appReducer, initialState);

   const value = { state, dispatch };
   return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export { appContext, AppProvider };
