import React from "react";

import styles from "./Button.module.scss";

interface ButtonProps {
	onClick: () => void;
	children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => (
	<button onClick={onClick} type="submit" className={styles.button}>
		{children}
	</button>
);

export default Button;
