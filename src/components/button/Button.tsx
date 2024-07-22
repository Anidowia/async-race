import React from "react";

import styles from "./Button.module.scss";

interface ButtonProps {
	onClick?: () => void;
	children: React.ReactNode;
	type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
	onClick = () => {},
	children,
	type = "button",
}) => (
	<button
		onClick={onClick}
		type={type === "submit" ? "submit" : "button"}
		className={styles.button}
	>
		{children}
	</button>
);

Button.defaultProps = {
	onClick: () => {},
	type: "button",
};

export default Button;
