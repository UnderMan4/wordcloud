import React from "react";
import styles from "./style.module.scss";

interface Props {
   children?: React.ReactNode[] | React.ReactNode | string;
   className?: string;
}

const Card: React.FC<Props> = ({ children, className }) => {
   return (
      <section className={`${styles.card} ${className}`}>{children}</section>
   );
};

export default Card;
