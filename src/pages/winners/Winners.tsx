import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchWinners } from "../../store/slices/winnersSlice";
import { AppDispatch, RootState } from "../../store";
import { fetchCars } from "../../store/slices/garageSlice";

import Car from "../../components/cars/Car";

import styles from "./Winners.module.scss";
import HeaderLinks from "../../components/header/components/HeaderLinks";

const Winners: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const { winners, status: winnersStatus } = useSelector(
		(state: RootState) => state.winners
	);
	const { cars, status: carsStatus } = useSelector(
		(state: RootState) => state.garage
	);

	useEffect(() => {
		if (winnersStatus === "idle") {
			dispatch(fetchWinners());
		}
		if (carsStatus === "idle") {
			dispatch(fetchCars());
		}
	}, [winnersStatus, carsStatus, dispatch]);

	return (
		<>
			<HeaderLinks />
			<div className={styles.winners}>
				<h2>Winners: {winners.length}</h2>
				<h2>Page 1/1</h2>
				<table>
					<thead>
						<tr>
							<th>№</th>
							<th>Car</th>
							<th>Name</th>
							<th>Wins</th>
							<th>Time</th>
						</tr>
					</thead>
					<tbody>
						{winners.map((winner, index) => {
							const matchedCar = cars.find((car) => car.id === winner.id);
							return (
								<tr key={winner.id}>
									<td>{index + 1}</td>
									<td>
										{matchedCar ? (
											<Car color={matchedCar.color} />
										) : (
											<Car color="ffff" />
										)}
									</td>
									<td>{matchedCar ? matchedCar.name : <span>Unknown</span>}</td>
									<td>{winner.wins}</td>
									<td>{winner.time}s</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default Winners;
