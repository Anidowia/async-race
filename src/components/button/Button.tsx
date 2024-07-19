import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
	onClick: () => void;
	type: "button" | "submit" | "reset";
	children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, type, children }) => (
	<button onClick={onClick} type={type} className={styles.button}>
		{children}
	</button>
);

export default Button;
