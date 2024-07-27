import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CarSection from "./components/CarSection";
import WinnerBanner from "../../layout/winnerBanner/WinnerBanner";

import { fetchCars } from "../../store/garage/thunk";
import { AppDispatch, RootState } from "../../store/hooks/hooks";
import { AnimatingCars, CarPosition } from "../../common/interface/interface";
import { controlRaceEnd } from "../../utils/animation";
import { setPausedCar } from "../../store/car/slice";
import { addWinner } from "../../store/winners/thunk";
import { setCurrentPage } from "../../store/pages/slice";
import { setWinnerName } from "../../store/engine/slice";

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
	const { currentPage, carsPerPage } = useSelector(
		(state: RootState) => state.page
	);

	useEffect(() => {
		if (status === "idle") {
			dispatch(fetchCars());
		}
	}, [status, dispatch]);

	useEffect(() => {
		if (winnerName && winnerTime !== null) {
			addWinner(winnerName, winnerTime, cars, dispatch);
		}
	}, [winnerName, winnerTime, cars]);

	const handlePageAdjustment = () => {
		const totalPages = Math.ceil(cars.length / carsPerPage);
		if (currentPage > totalPages && totalPages > 0) {
			dispatch(setCurrentPage(totalPages));
		}
	};

	const AnimationEnd = (carName: string) => {
		controlRaceEnd(
			carName,
			(position) => dispatch(setPausedCar({ carName, position })),
			setAnimatingCars,
			winnerName
		);

		if (winnerName === null) {
			dispatch(setWinnerName(carName));
		}
	};

	useEffect(() => {
		handlePageAdjustment();
	}, [cars.length, currentPage, carsPerPage, dispatch]);

	const paginatedCars = cars.slice(
		(currentPage - 1) * carsPerPage,
		currentPage * carsPerPage
	);

	return (
		<section className={styles.garage}>
			{cars.length === 0 ? (
				<h3>Oops! No cars in the garage :(</h3>
			) : (
				<>
					{winnerName != null && <WinnerBanner />}
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
