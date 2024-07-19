import React from "react";
import CarSection from "./components/CarSection";
import styles from "./Garage.module.scss";

const Garage: React.FC = () => {
	const handleButtonClick = () => {};

	return (
		<div className={styles.garage}>
			<CarSection
				name="BMW"
				color="#833ab4"
				onButtonClick={handleButtonClick}
			/>
			<CarSection
				name="Audi"
				color="#0077e5"
				onButtonClick={handleButtonClick}
			/>
			<CarSection
				name="Tesla"
				color="#ff0000"
				onButtonClick={handleButtonClick}
			/>
		</div>
	);
};

export default Garage;
