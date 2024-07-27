import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchWinners } from "../../store/winners/thunk";
import { AppDispatch, RootState } from "../../store/hooks/hooks";
import { fetchCars } from "../../store/garage/thunk";
import { clearWinnerData } from "../../store/engine/slice";
import { setCurrentPage } from "../../store/pages/slice";

import Car from "../../common/cars/Car";
import Page from "../../common/pagination/Page";

import styles from "./Winners.module.scss";

const Winners: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const { winners, status: winnersStatus } = useSelector(
		(state: RootState) => state.winners
	);
	const { cars, status: carsStatus } = useSelector(
		(state: RootState) => state.garage
	);
	const { currentPage, winnersPerPage } = useSelector(
		(state: RootState) => state.page
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

	const paginatedWinners = winners.slice(
		(currentPage - 1) * winnersPerPage,
		currentPage * winnersPerPage
	);

	const handlePageChange = (page: number) => {
		dispatch(setCurrentPage(page));
	};

	return (
		<>
			<section className={styles.winners}>
				<h2>Winners: {winners.length}</h2>
				<h2>
					Page {currentPage}/{Math.ceil(winners.length / winnersPerPage)}
				</h2>
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
						{paginatedWinners.map((winner, index) => {
							const matchedCar = cars.find((car) => car.id === winner.id);
							return (
								<tr key={winner.id}>
									<td>{(currentPage - 1) * winnersPerPage + index + 1}</td>
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
			<Page
				currentPage={currentPage}
				totalPages={Math.ceil(winners.length / winnersPerPage)}
				onPageChange={handlePageChange}
			/>
		</>
	);
};

export default Winners;
