import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CarSection from "./components/CarSection";

import { fetchCars } from "../../store/garage/thunk";
import { AppDispatch, RootState } from "../../store/hooks/hooks";
import { AnimatingCars, CarPosition } from "../../common/interface/interface";
import { handleAnimationEnd } from "../../utils/animation";
import { setFirstCarFinished } from "../../store/garage/slice";
import { setPausedCar } from "../../store/car/slice";

import styles from "./Garage.module.scss";

interface GarageProps {
	animatingCars: AnimatingCars;
	pausedCars: CarPosition;
	setAnimatingCars: React.Dispatch<React.SetStateAction<AnimatingCars>>;
	handleStartClick: (id: number, carName: string) => void;
	handleStopClick: (id: number, carName: string) => void;
	firstCarFinished: string | null;
}

const Garage: React.FC<GarageProps> = ({
	animatingCars,
	pausedCars,
	setAnimatingCars,
	handleStartClick,
	handleStopClick,
	firstCarFinished,
}) => {
	const dispatch: AppDispatch = useDispatch();
	const { cars, status } = useSelector((state: RootState) => state.garage);

	useEffect(() => {
		if (status === "idle") {
			dispatch(fetchCars());
		}
	}, [status, dispatch]);

	const AnimationEnd = (carName: string) => {
		handleAnimationEnd(
			carName,
			(position) => dispatch(setPausedCar({ carName, position })),
			setAnimatingCars,
			firstCarFinished,
			(newFirstCar: string | null) => dispatch(setFirstCarFinished(newFirstCar))
		);
	};

	return (
		<section className={styles.garage}>
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
					onAnimationEnd={() => AnimationEnd(car.name)}
				/>
			))}
		</section>
	);
};

export default Garage;
