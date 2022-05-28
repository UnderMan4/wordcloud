import React from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import GamePage from "./pages/game";
import ResultPage from "./pages/result";
import { AppProvider } from "./context/AppContext";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import { State } from "./types/State";

function App() {
   return (
      <div className="App">
         <AppProvider>
            <BrowserRouter>
               <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route
                     path="/game"
                     element={
                        <ProtectedRoute gameState={State.PLAYER}>
                           <GamePage />
                        </ProtectedRoute>
                     }
                  />
                  <Route
                     path="/result"
                     element={
                        <ProtectedRoute gameState={State.FINISHED}>
                           <ResultPage />
                        </ProtectedRoute>
                     }
                  />
               </Routes>
            </BrowserRouter>
         </AppProvider>
      </div>
   );
}

export default App;
