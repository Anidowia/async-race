import React, { useState, useEffect } from "react";
import styles from "./Input.module.scss";

interface InputProps {
	type: string;
	value?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	name?: string;
	id: string;
}

const Input: React.FC<InputProps> = ({
	type,
	value = "",
	onChange,
	name,
	id,
}) => {
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		const savedValue = localStorage.getItem(id);
		if (savedValue) {
			setInputValue(savedValue);
		} else {
			setInputValue(value);
		}
	}, [id, value]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		setInputValue(newValue);
		localStorage.setItem(id, newValue);
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
				id={id}
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
