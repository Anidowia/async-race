import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
	buttonText: string;
	onClick: () => void;
	type: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ buttonText, onClick, type }) => (
	<button className={styles.button} onClick={onClick} type={type}>
		{buttonText}
	</button>
);

export default Button;
