import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CarSection from "./components/CarSection";
import WinnerBanner from "../../layout/winnerBanner/WinnerBanner";

import { fetchCars } from "../../store/garage/thunk";
import { AppDispatch, RootState } from "../../store/hooks/hooks";
import { AnimatingCars, CarPosition } from "../../common/interface/interface";
import { controlRaceEnd } from "../../utils/animation";
import { setPausedCar } from "../../store/car/slice";
import { addWinner, fetchWinners } from "../../store/winners/thunk";
import { resetActiveCars, setWinnerName } from "../../store/engine/slice";
import { getPaginatedCars, handlePageAdjustment } from "../../utils/pagination";

import styles from "./Garage.module.scss";

interface GarageProps {
	animatingCars: AnimatingCars;
	pausedCars: CarPosition;
	setAnimatingCars: React.Dispatch<React.SetStateAction<AnimatingCars>>;
	startRace: (id: number, carName: string) => void;
	stopRace: (id: number, carName: string) => void;
}

const Garage: React.FC<GarageProps> = ({
	animatingCars,
	pausedCars,
	setAnimatingCars,
	startRace,
	stopRace,
}) => {
	const dispatch: AppDispatch = useDispatch();
	const { cars, status } = useSelector((state: RootState) => state.garage);
	const { winnerTime, winnerName } = useSelector(
		(state: RootState) => state.engine
	);
	const { garageCurrentPage, carsPerPage } = useSelector(
		(state: RootState) => state.page
	);
	const paginatedCars = getPaginatedCars(cars, garageCurrentPage, carsPerPage);

	useEffect(() => {
		if (status === "idle") {
			dispatch(fetchCars());
		}
		if (status === "idle") {
			dispatch(fetchWinners());
		}
	}, [status, dispatch]);

	const activeCars = useSelector((state: RootState) => state.engine.activeCars);

	useEffect(() => {
		const allCarsStopped = Object.values(animatingCars).every(
			(animating) => !animating
		);
		if (allCarsStopped) {
			dispatch(resetActiveCars());
		}
	}, [animatingCars, dispatch]);

	useEffect(() => {
		if (winnerName && winnerTime !== null && activeCars > 1) {
			addWinner(winnerName, winnerTime, cars, dispatch);
		}
	}, [winnerName, winnerTime, cars, dispatch]);

	useEffect(() => {
		handlePageAdjustment(
			cars.length,
			garageCurrentPage,
			carsPerPage,
			dispatch,
			true
		);
	}, [cars.length, garageCurrentPage, carsPerPage, dispatch]);

	const AnimationEnd = (carName: string) => {
		controlRaceEnd(
			carName,
			(position) => dispatch(setPausedCar({ carName, position })),
			setAnimatingCars
		);

		if (winnerName === null) {
			dispatch(setWinnerName(carName));
		}
	};

	return (
		<section className={styles.garage}>
			{cars.length === 0 ? (
				<h3>Oops! No cars in the garage :(</h3>
			) : (
				<>
					{winnerName != null && winnerTime != null && activeCars > 1 && (
						<WinnerBanner />
					)}
					{paginatedCars.map((car) => (
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
				</>
			)}
		</section>
	);
};

export default Garage;
