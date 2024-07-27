import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchWinners } from "../../store/winners/thunk";
import { AppDispatch, RootState } from "../../store/hooks/hooks";
import { fetchCars } from "../../store/garage/thunk";

import Car from "../../common/cars/Car";

import styles from "./Winners.module.scss";
import HeaderLinks from "../../layout/header/components/HeaderLinks";
import { clearWinnerData } from "../../store/engine/slice";

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
		dispatch(clearWinnerData());
	}, [winnersStatus, carsStatus, dispatch]);

	return (
		<>
			<HeaderLinks />
			<section className={styles.winners}>
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
									<td>{(winner.time / 1000).toFixed(2)}s</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</section>
		</>
	);
};

export default Winners;
