import { useEffect, useRef, useState } from "react";
import GameCheck from "../../components/game/GameCheck";
import GameField from "../../components/game/GameField";
import GameTask from "../../components/game/GameTask";
import {
   animals,
   colors,
   food,
   harryPotter,
   ikea,
   periodicTable,
   tolkien,
} from "../../words";
import styles from "./style.module.scss";

const GamePage: React.FC = () => {
   const category = Math.floor(Math.random() * 7);
   let good: string[] = [];
   let bad: string[];
   const [goodList, setGoodList] = useState<string[]>();
   const [wordList, setWordList] = useState<string[]>();
   const [task, setTask] = useState<string>();
   const wordElements = useRef<HTMLDivElement[]>([]);
   const checkboxes = useRef<HTMLInputElement[]>([]);
   const [correctNumber, setCorrectNumber] = useState(0);

   const drawWords = () => {
      const numberOfCorrect = Math.floor(Math.random() * 3) + 5;
      const numberOfIncorrect = 15 - numberOfCorrect;

      switch (category) {
         case 0:
            good = animals
               .sort(() => 0.5 - Math.random())
               .slice(-numberOfCorrect);
            bad = food
               .concat(colors, ikea, tolkien, harryPotter, periodicTable)
               .sort(() => 0.5 - Math.random())
               .slice(-numberOfIncorrect);
            setTask("names of animals");
            break;
         case 1:
            good = food.sort(() => 0.5 - Math.random()).slice(-numberOfCorrect);
            bad = animals
               .concat(colors, ikea, tolkien, harryPotter, periodicTable)
               .sort(() => 0.5 - Math.random())
               .slice(-numberOfIncorrect);
            setTask("names of food");
            break;
         case 2:
            good = colors
               .sort(() => 0.5 - Math.random())
               .slice(-numberOfCorrect);
            bad = animals
               .concat(food, ikea, tolkien, harryPotter, periodicTable)
               .sort(() => 0.5 - Math.random())
               .slice(-numberOfIncorrect);
            setTask("names of colors");
            break;
         case 3:
            good = ikea.sort(() => 0.5 - Math.random()).slice(-numberOfCorrect);
            bad = animals
               .concat(food, colors, tolkien, harryPotter, periodicTable)
               .sort(() => 0.5 - Math.random())
               .slice(-numberOfIncorrect);
            setTask("names of ikea products");
            break;
         case 4:
            good = tolkien
               .sort(() => 0.5 - Math.random())
               .slice(-numberOfCorrect);
            bad = animals
               .concat(food, colors, ikea, harryPotter, periodicTable)
               .sort(() => 0.5 - Math.random())
               .slice(-numberOfIncorrect);
            setTask("names from Tolkien's universe");
            break;
         case 5:
            good = harryPotter
               .sort(() => 0.5 - Math.random())
               .slice(-numberOfCorrect);
            bad = animals
               .concat(food, colors, ikea, tolkien, periodicTable)
               .sort(() => 0.5 - Math.random())
               .slice(-numberOfIncorrect);
            setTask("names of spells from Harry Potter universe");
            break;
         default:
            good = periodicTable
               .sort(() => 0.5 - Math.random())
               .slice(-numberOfCorrect);
            bad = animals
               .concat(food, colors, ikea, tolkien, harryPotter)
               .sort(() => 0.5 - Math.random())
               .slice(-numberOfIncorrect);
            setTask("names from periodic table");
            break;
      }

      setGoodList([...good]);
      setWordList(good.concat(bad).sort(() => 0.5 - Math.random()));
      setCorrectNumber(numberOfCorrect);
   };

   useEffect(() => {
      drawWords();
   }, []);

   return (
      <div className={styles.gamePage}>
         {task && <GameTask task={task} />}
         {wordList && (
            <GameField
               wordlist={wordList}
               wordElements={wordElements}
               checkboxes={checkboxes}
            />
         )}
         {goodList && (
            <GameCheck
               good={goodList}
               checkboxes={checkboxes}
               numberOfCorrect={correctNumber}
            />
         )}
      </div>
   );
};

export default GamePage;
