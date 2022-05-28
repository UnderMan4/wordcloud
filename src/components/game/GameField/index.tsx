import React, { useEffect, useRef } from "react";
import Card from "../../shared/Card";
import styles from "./style.module.scss";

interface Props {
   wordlist: string[];
   wordElements: React.MutableRefObject<HTMLDivElement[]>;
   checkboxes: React.MutableRefObject<HTMLInputElement[]>;
}

const GameField: React.FC<Props> = ({ wordlist, wordElements, checkboxes }) => {
   const container = useRef<HTMLDivElement>(null);

   const renderWords = (): React.ReactNode => {
      return wordlist.map((word, index) => (
         <div
            className={styles.word}
            key={index}
            ref={(e) => e && wordElements.current.push(e)}
            style={{ top: "50%", left: "50%" }}
         >
            <input
               type="checkbox"
               ref={(e) => e && checkboxes.current.push(e)}
               id={`${index}${word}`}
            />
            <label htmlFor={`${index}${word}`}>{word}</label>
         </div>
      ));
   };

   const movePoint = (x: number, y: number, dist: number, angle: number) => {
      return {
         x: x + dist * Math.cos(angle * (Math.PI / 180)),
         y: y + dist * Math.sin(angle * (Math.PI / 180)),
      };
   };

   useEffect(() => {
      if (container.current) {
         const boundary = { top: 0, left: 0, right: 0, bottom: 0 };
         wordElements.current.forEach((word, index) => {
            if (index == 0) {
               const wordBoundary = word.getBoundingClientRect();
               boundary.top = wordBoundary.top;
               boundary.left = wordBoundary.left;
               boundary.right = wordBoundary.right;
               boundary.bottom = wordBoundary.bottom;
            } else {
               const dist = 5;
               let left = Number(word.style.left.split("%")[0]);
               let top = Number(word.style.top.split("%")[0]);
               const angle = Math.random() * 360;
               word.style.left = `50%`;
               word.style.top = `50%`;
               do {
                  const newPos = movePoint(left, top, dist, angle);
                  left = newPos.x;
                  top = newPos.y;
                  word.style.left = `${left}%`;
                  word.style.top = `${top}%`;

                  if (left > 85) {
                     word.style.left = `calc(100%-${word.clientWidth}px)`;
                     break;
                  }

                  if (left < 0) {
                     word.style.left = "0%";
                     break;
                  }

                  if (top > 90) {
                     word.style.top = `calc(100%-${word.clientHeight})`;
                     break;
                  }

                  if (top < 0) {
                     word.style.top = "0%";
                     break;
                  }
               } while (
                  word.getBoundingClientRect().top < boundary.bottom &&
                  word.getBoundingClientRect().left < boundary.right &&
                  word.getBoundingClientRect().right > boundary.left &&
                  word.getBoundingClientRect().bottom > boundary.top
               );
               const wordBoundary = word.getBoundingClientRect();
               boundary.left = Math.min(boundary.left, wordBoundary.left);
               boundary.top = Math.min(boundary.top, wordBoundary.top);
               boundary.right = Math.max(boundary.right, wordBoundary.right);
               boundary.bottom = Math.max(boundary.bottom, wordBoundary.bottom);
            }
         });
      }
   }, [container.current?.hasChildNodes()]);

   return (
      <Card className={styles.gameField}>
         <div className={styles.field} ref={container}>
            {renderWords()}
         </div>
      </Card>
   );
};

export default GameField;
