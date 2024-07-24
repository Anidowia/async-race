import React, { useState, useEffect } from "react";
import styles from "./Input.module.scss";

interface InputProps {
	type: string;
	value?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	name?: string;
}

const Input: React.FC<InputProps> = ({ type, value = "", onChange, name }) => {
	const [inputValue, setInputValue] = useState(value);

	useEffect(() => {
		setInputValue(value);
	}, [value]);

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
				name={name}
			/>
		</div>
	);
};

Input.defaultProps = {
	value: "",
	name: "",
	onChange: () => {},
};

export default Input;
