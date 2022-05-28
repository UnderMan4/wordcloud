import React from "react";
import styles from "./style.module.scss";

interface Props {
   value: string;
   onInput: React.ChangeEventHandler<HTMLInputElement>;
   placeholder?: string;
}

const TextInput: React.FC<Props> = ({ onInput, placeholder, value }) => {
   return (
      <input
         className={styles.input}
         type="text"
         placeholder={placeholder}
         onInput={onInput}
         value={value}
      />
   );
};

export default TextInput;
