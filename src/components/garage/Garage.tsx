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
	carList: { [key: string]: string };
}

const Garage: React.FC<GarageProps> = ({
	animatingCars,
	pausedCars,
	setPausedCars,
	setAnimatingCars,
	carList,
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
			{Object.entries(carList).map(([name, color]) => (
				<CarSection
					key={name}
					name={name}
					color={color}
					onStartClick={() => handleStartClick(name)}
					onStopClick={() => handleStopClick(name)}
					animatingCar={animatingCars[name] || false}
					pausedPosition={pausedCars[name] || 0}
					onAnimationEnd={() => handleAnimationEnd(name)}
				/>
			))}
		</div>
	);
};

export default Garage;
