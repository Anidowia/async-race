import React from "react";

import Button from "../../button/Button";
import Car from "../../cars/Car";

import styles from "./CarSection.module.scss";

interface CarSectionProps {
	name: string;
	color: string;
	onStartClick: () => void;
	onStopClick: () => void;
	animatingCar: boolean;
	pausedPosition: number;
	onAnimationEnd: () => void;
}

const CarSection: React.FC<CarSectionProps> = ({
	name,
	color,
	onStartClick,
	onStopClick,
	animatingCar,
	pausedPosition,
	onAnimationEnd,
}) => (
	<div className={styles.cars}>
		<div className={styles["cars-line"]}>
			<h4>{name}</h4>
			<div className={styles["edit-remove"]}>
				<div className={styles.edit}>
					<Button onClick={onStartClick}>🖉</Button>
				</div>
				<div className={styles.remove}>
					<Button onClick={onStopClick}>🗑</Button>
				</div>
			</div>
		</div>
		<div className={styles["car-container"]}>
			<div className={styles["button-container"]}>
				<div className={styles.race}>
					<Button onClick={onStartClick}>{"\u25B6"}</Button>
				</div>
				<Button onClick={onStopClick}>{"\u23F9"}</Button>
			</div>
			<div
				id={`car-${name}`}
				className={animatingCar ? styles.animateCar : styles.pausedCar}
				style={{ transform: `translateX(${pausedPosition}vw)` }}
				onAnimationEnd={onAnimationEnd}
			>
				<Car color={color} />
			</div>
		</div>
	</div>
);

export default CarSection;
