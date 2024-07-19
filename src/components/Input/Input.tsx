import React, { useState } from "react";
import styles from "./Input.module.scss";

interface InputProps {
	type: string;
	value?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ type, value, onChange }) => {
	const [inputValue, setInputValue] = useState(value || "");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
		if (onChange) {
			onChange(event);
		}
	};

	return (
		<div className={styles.input}>
			<input
				type={type}
				placeholder="input text"
				value={inputValue}
				onChange={handleChange}
			/>
		</div>
	);
};
Input.defaultProps = {
	value: "",
	onChange: () => {},
};
export default Input;
