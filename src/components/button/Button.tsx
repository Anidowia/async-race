import React from "react";

import styles from "./Button.module.scss";

interface ButtonProps {
	onClick?: () => void;
	disabled?: boolean;
	children: React.ReactNode;
	type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
	onClick = () => {},
	children,
	type = "button",
	disabled = false,
}) => (
	<button
		onClick={onClick}
		type={type === "submit" ? "submit" : "button"}
		className={styles.button}
		disabled={disabled}
	>
		{children}
	</button>
);

Button.defaultProps = {
	onClick: () => {},
	type: "button",
	disabled: false,
};

export default Button;
