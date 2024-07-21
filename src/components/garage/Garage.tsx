import React from "react";

import CarSection from "./components/CarSection";

import styles from "./Garage.module.scss";

interface CarPosition {
	[key: string]: number;
}

interface AnimatingCars {
	[key: string]: boolean;
}

interface GarageProps {
	animatingCars: AnimatingCars;
	pausedCars: CarPosition;
	setPausedCars: React.Dispatch<React.SetStateAction<CarPosition>>;
	setAnimatingCars: React.Dispatch<React.SetStateAction<AnimatingCars>>;
}

const Garage: React.FC<GarageProps> = ({
	animatingCars,
	pausedCars,
	setPausedCars,
	setAnimatingCars,
}) => {
	const handleStartClick = (carName: string) => {
		setAnimatingCars((prev) => ({
			...prev,
			[carName]: true,
		}));
	};

	const handleStopClick = (carName: string) => {
		setPausedCars((prevPaused) => ({
			...prevPaused,
			[carName]: 0,
		}));
		setAnimatingCars((prev) => ({
			...prev,
			[carName]: false,
		}));
	};

	const handleAnimationEnd = (carName: string) => {
		setPausedCars((prevPaused) => ({
			...prevPaused,
			[carName]: 80,
		}));
		setAnimatingCars((prev) => ({
			...prev,
			[carName]: false,
		}));
	};

	return (
		<div className={styles.garage}>
			<CarSection
				name="BMW"
				color="#833ab4"
				onStartClick={() => handleStartClick("BMW")}
				onStopClick={() => handleStopClick("BMW")}
				animatingCar={animatingCars.BMW}
				pausedPosition={pausedCars.BMW}
				onAnimationEnd={() => handleAnimationEnd("BMW")}
			/>
			<CarSection
				name="Audi"
				color="#0077e5"
				onStartClick={() => handleStartClick("Audi")}
				onStopClick={() => handleStopClick("Audi")}
				animatingCar={animatingCars.Audi}
				pausedPosition={pausedCars.Audi}
				onAnimationEnd={() => handleAnimationEnd("Audi")}
			/>
			<CarSection
				name="Tesla"
				color="#ff0000"
				onStartClick={() => handleStartClick("Tesla")}
				onStopClick={() => handleStopClick("Tesla")}
				animatingCar={animatingCars.Tesla}
				pausedPosition={pausedCars.Tesla}
				onAnimationEnd={() => handleAnimationEnd("Tesla")}
			/>
		</div>
	);
};

export default Garage;
