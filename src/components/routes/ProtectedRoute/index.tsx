import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { appContext } from "../../../context/AppContext";
import { State } from "../../../types/State";

interface Props {
   children: React.ReactNode;
   gameState: State;
}

const ProtectedRoute = ({ gameState, children }: Props) => {
   const navigate = useNavigate();
   const { state } = useContext(appContext);

   useEffect(() => {
      if (state.gameState != gameState) {
         navigate("/");
      }
   }, []);

   return <>{children}</>;
};

export default ProtectedRoute;
