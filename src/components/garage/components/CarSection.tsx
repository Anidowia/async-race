import React from "react";
import Button from "../../button/Button";
import Car from "../../cars/Car";

import styles from "./CarSection.module.scss";

interface CarSectionProps {
	name: string;
	color: string;
	onButtonClick: () => void;
}

const CarSection: React.FC<CarSectionProps> = ({
	name,
	color,
	onButtonClick,
}) => (
	<div className={styles.cars}>
		<div className={styles["cars-line"]}>
			<h4>{name}</h4>
			<div className={styles["edit-remove"]}>
				<div className={styles.edit}>
					<Button onClick={onButtonClick} type="button">
						🖉
					</Button>
				</div>
				<div className={styles.remove}>
					<Button onClick={onButtonClick} type="button">
						🗑
					</Button>
				</div>
			</div>
		</div>
		<div className={styles["car-container"]}>
			<div className={styles["button-container"]}>
				<div className={styles.race}>
					<Button onClick={onButtonClick} type="button">
						{"\u25B6"}
					</Button>
				</div>
				<Button onClick={onButtonClick} type="button">
					{"\u23F9"}
				</Button>
			</div>
			<Car color={color} />
		</div>
	</div>
);

export default CarSection;
