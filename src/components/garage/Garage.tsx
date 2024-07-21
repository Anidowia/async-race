import React from "react";

import CarSection from "./components/CarSection";

import styles from "./Garage.module.scss";

interface CarPosition {
	[key: string]: number;
}

interface GarageProps {
	animatingCar: string | null;
	pausedCars: CarPosition;
	setPausedCars: React.Dispatch<React.SetStateAction<CarPosition>>;
	setAnimatingCar: React.Dispatch<React.SetStateAction<string | null>>;
}

const Garage: React.FC<GarageProps> = ({
	animatingCar,
	pausedCars,
	setPausedCars,
	setAnimatingCar,
}) => {
	const handleStartClick = (carName: string) => {
		setAnimatingCar(carName);
	};

	const handleStopClick = (carName: string) => {
		setPausedCars((prevPaused) => ({
			...prevPaused,
			[carName]: 0,
		}));
		setAnimatingCar(null);
	};

	const handleAnimationEnd = (carName: string) => {
		setPausedCars((prevPaused) => ({
			...prevPaused,
			[carName]: 80,
		}));
		setAnimatingCar(null);
	};

	return (
		<div className={styles.garage}>
			<CarSection
				name="BMW"
				color="#833ab4"
				onStartClick={() => handleStartClick("BMW")}
				onStopClick={() => handleStopClick("BMW")}
				animatingCar={
					animatingCar === "BMW" || animatingCar === "ALL" ? "BMW" : null
				}
				pausedPosition={pausedCars.BMW}
				onAnimationEnd={() => handleAnimationEnd("BMW")}
			/>
			<CarSection
				name="Audi"
				color="#0077e5"
				onStartClick={() => handleStartClick("Audi")}
				onStopClick={() => handleStopClick("Audi")}
				animatingCar={
					animatingCar === "Audi" || animatingCar === "ALL" ? "Audi" : null
				}
				pausedPosition={pausedCars.Audi}
				onAnimationEnd={() => handleAnimationEnd("Audi")}
			/>
			<CarSection
				name="Tesla"
				color="#ff0000"
				onStartClick={() => handleStartClick("Tesla")}
				onStopClick={() => handleStopClick("Tesla")}
				animatingCar={
					animatingCar === "Tesla" || animatingCar === "ALL" ? "Tesla" : null
				}
				pausedPosition={pausedCars.Tesla}
				onAnimationEnd={() => handleAnimationEnd("Tesla")}
			/>
		</div>
	);
};

export default Garage;
