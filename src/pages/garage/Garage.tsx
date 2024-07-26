import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CarSection from "./components/CarSection";
import WinnerBanner from "../../layout/winnerBanner/WinnerBanner";

import { fetchCars } from "../../store/garage/thunk";
import { AppDispatch, RootState } from "../../store/hooks/hooks";
import { AnimatingCars, CarPosition } from "../../common/interface/interface";
import { controlRaceEnd } from "../../utils/animation";
import {
	clearFirstCarFinished,
	setFirstCarFinished,
} from "../../store/garage/slice";
import { setPausedCar } from "../../store/car/slice";
import { clearWinnerTime, setWinnerName } from "../../store/engine/slice";

import styles from "./Garage.module.scss";

interface GarageProps {
	animatingCars: AnimatingCars;
	pausedCars: CarPosition;
	setAnimatingCars: React.Dispatch<React.SetStateAction<AnimatingCars>>;
	startRace: (id: number, carName: string) => void;
	stopRace: (id: number, carName: string) => void;
	firstCarFinished: string | null;
}

const Garage: React.FC<GarageProps> = ({
	animatingCars,
	pausedCars,
	setAnimatingCars,
	startRace,
	stopRace,
	firstCarFinished,
}) => {
	const dispatch: AppDispatch = useDispatch();
	const { cars, status } = useSelector((state: RootState) => state.garage);
	const winnerTime = useSelector((state: RootState) => state.engine.winnerTime);

	useEffect(() => {
		if (status === "idle") {
			dispatch(fetchCars());
		}
	}, [status, dispatch]);

	useEffect(() => {
		dispatch(clearFirstCarFinished());
		dispatch(clearWinnerTime());
	}, [dispatch]);

	const AnimationEnd = (carName: string) => {
		controlRaceEnd(
			carName,
			(position) => dispatch(setPausedCar({ carName, position })),
			setAnimatingCars,
			firstCarFinished,
			(newFirstCar: string | null) => {
				if (firstCarFinished === null) {
					dispatch(setWinnerName(newFirstCar!));
					dispatch(setFirstCarFinished(newFirstCar));
				}
			}
		);
	};

	return (
		<section className={styles.garage}>
			{firstCarFinished != null && winnerTime !== null && <WinnerBanner />}
			{cars.map((car) => (
				<CarSection
					key={car.id}
					id={car.id}
					name={car.name}
					color={car.color}
					onStartClick={() => startRace(car.id, car.name)}
					onStopClick={() => stopRace(car.id, car.name)}
					animatingCar={animatingCars[car.name] || false}
					pausedPosition={pausedCars[car.name] || 0}
					onAnimationEnd={() => AnimationEnd(car.name)}
				/>
			))}
		</section>
	);
};

export default Garage;
