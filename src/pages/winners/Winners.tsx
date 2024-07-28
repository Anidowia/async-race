import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchWinners } from "../../store/winners/thunk";
import { AppDispatch, RootState } from "../../store/hooks/hooks";
import { fetchCars } from "../../store/garage/thunk";
import { clearWinnerData } from "../../store/engine/slice";
import { setWinnersCurrentPage } from "../../store/pages/slice";

import Car from "../../common/cars/Car";
import Page from "../../common/pagination/Page";
import Button from "../../common/button/Button";

import styles from "./Winners.module.scss";

const Winners: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const { winners, status: winnersStatus } = useSelector(
		(state: RootState) => state.winners
	);
	const { cars, status: carsStatus } = useSelector(
		(state: RootState) => state.garage
	);
	const { winnersCurrentPage, winnersPerPage } = useSelector(
		(state: RootState) => state.page
	);

	const [sortConfig, setSortConfig] = useState<{
		key: string;
		direction: string;
	} | null>(null);
	const [sortDirection, setSortDirection] = useState<{ [key: string]: string }>(
		{
			wins: "asc",
			time: "asc",
		}
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
		(winnersCurrentPage - 1) * winnersPerPage,
		winnersCurrentPage * winnersPerPage
	);

	const filteredWinners = paginatedWinners.filter((winner) =>
		cars.some((car) => car.id === winner.id)
	);

	const sortedWinners = [...filteredWinners].sort((a, b) => {
		if (!sortConfig) return 0;

		const { key, direction } = sortConfig;

		const aValue = a[key as keyof typeof a];
		const bValue = b[key as keyof typeof b];

		if (aValue < bValue) {
			return direction === "asc" ? -1 : 1;
		}
		if (aValue > bValue) {
			return direction === "asc" ? 1 : -1;
		}
		return 0;
	});

	const handleSort = (key: string) => {
		const direction = sortDirection[key] === "asc" ? "desc" : "asc";
		setSortDirection({ ...sortDirection, [key]: direction });
		setSortConfig({ key, direction });
	};

	const handlePageChange = (page: number) => {
		dispatch(setWinnersCurrentPage(page));
	};

	return (
		<>
			{filteredWinners.length === 0 ? (
				<h3>Oops! No victories among the racers :(</h3>
			) : (
				<section className={styles.winners}>
					<h2>Winners: {winners.length}</h2>
					<h2>Page #{winnersCurrentPage}</h2>
					<table className="table-sortable">
						<thead>
							<tr>
								<th>№</th>
								<th>Car</th>
								<th>Name</th>
								<th>
									Wins
									<Button onClick={() => handleSort("wins")}>
										{sortDirection.wins === "asc" ? "△" : "▽"}
									</Button>
								</th>
								<th>
									Time
									<Button onClick={() => handleSort("time")}>
										{sortDirection.time === "asc" ? "△" : "▽"}
									</Button>
								</th>
							</tr>
						</thead>
						<tbody>
							{sortedWinners.map((winner, index) => {
								const matchedCar = cars.find((car) => car.id === winner.id);
								if (!matchedCar) return null;

								return (
									<tr key={winner.id}>
										<td>
											{(winnersCurrentPage - 1) * winnersPerPage + index + 1}
										</td>
										<td>
											<Car color={matchedCar.color} />
										</td>
										<td>{matchedCar.name}</td>
										<td>{winner.wins}</td>
										<td>{(winner.time / 1000).toFixed(2)}s</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</section>
			)}
			<Page
				currentPage={winnersCurrentPage}
				totalPages={Math.ceil(winners.length / winnersPerPage)}
				onPageChange={handlePageChange}
			/>
		</>
	);
};

export default Winners;
