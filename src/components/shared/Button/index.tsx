import React from "react";
import styles from "./style.module.scss";

interface Props {
   children?: React.ReactNode | string;
   onClick?: React.MouseEventHandler<HTMLButtonElement>;
   className?: string;
}

const Button: React.FC<Props> = ({ children, onClick, className = "" }) => {
   return (
      <button className={`${styles.button} ${className}`} onClick={onClick}>
         {children}
      </button>
   );
};

export default Button;
