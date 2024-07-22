import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CarSection from "./components/CarSection";

import { fetchCars } from "../../store/slices/garageSlice";
import { AppDispatch, RootState } from "../../store";

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
	const dispatch: AppDispatch = useDispatch();
	const { cars, status } = useSelector((state: RootState) => state.garage);

	useEffect(() => {
		if (status === "idle") {
			dispatch(fetchCars());
		}
	}, [status, dispatch]);

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
			{cars.map((car) => (
				<CarSection
					key={car.id}
					id={car.id}
					name={car.name}
					color={car.color}
					onStartClick={() => handleStartClick(car.name)}
					onStopClick={() => handleStopClick(car.name)}
					animatingCar={animatingCars[car.name] || false}
					pausedPosition={pausedCars[car.name] || 0}
					onAnimationEnd={() => handleAnimationEnd(car.name)}
				/>
			))}
		</div>
	);
};

export default Garage;
