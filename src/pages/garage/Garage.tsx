import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CarSection from "./components/CarSection";

import { fetchCars } from "../../store/garage/thunk";
import { AppDispatch, RootState } from "../../store/hooks/hooks";
import { EngineStatus } from "../../store/engine/types";
import { toggleEngine } from "../../store/engine/thunk";
import { AnimatingCars, CarPosition } from "../../common/interface/interface";

import styles from "./Garage.module.scss";

interface GarageProps {
	animatingCars: AnimatingCars;
	pausedCars: CarPosition;
	setPausedCars: React.Dispatch<React.SetStateAction<CarPosition>>;
	setAnimatingCars: React.Dispatch<React.SetStateAction<AnimatingCars>>;
	handleStartClick: (id: number, carName: string) => void;
}

const Garage: React.FC<GarageProps> = ({
	animatingCars,
	pausedCars,
	setPausedCars,
	setAnimatingCars,
	handleStartClick,
}) => {
	const dispatch: AppDispatch = useDispatch();
	const { cars, status } = useSelector((state: RootState) => state.garage);

	useEffect(() => {
		if (status === "idle") {
			dispatch(fetchCars());
		}
	}, [status, dispatch]);

	const handleAnimationEnd = (carName: string) => {
		setPausedCars((prevPaused) => ({
			...prevPaused,
			[carName]: 88,
		}));
		setAnimatingCars((prev) => ({
			...prev,
			[carName]: false,
		}));
	};

	const handleStopClick = (id: number, carName: string) => {
		dispatch(toggleEngine({ id, status: EngineStatus.STOP }))
			.unwrap()
			.then(() => {
				const carElement = document.getElementById(`${carName}`);
				if (carElement) {
					carElement.style.transform = "translateX(0)";
				}
				setPausedCars((prevPaused) => ({
					...prevPaused,
					[carName]: 0,
				}));
				setAnimatingCars((prev) => ({
					...prev,
					[carName]: false,
				}));
			});
	};

	return (
		<div className={styles.garage}>
			{cars.map((car) => (
				<CarSection
					key={car.id}
					id={car.id}
					name={car.name}
					color={car.color}
					onStartClick={() => handleStartClick(car.id, car.name)}
					onStopClick={() => handleStopClick(car.id, car.name)}
					animatingCar={animatingCars[car.name] || false}
					pausedPosition={pausedCars[car.name] || 0}
					onAnimationEnd={() => handleAnimationEnd(car.name)}
				/>
			))}
		</div>
	);
};

export default Garage;
