import { AppDispatch } from "../store/hooks/hooks";
import {
	setGarageCurrentPage,
	setWinnersCurrentPage,
} from "../store/pages/slice";

export const handlePageAdjustment = (
	carsLength: number,
	currentPage: number,
	carsPerPage: number,
	dispatch: AppDispatch,
	isGaragePage: boolean
) => {
	const totalPages = Math.ceil(carsLength / carsPerPage);
	if (currentPage > totalPages && totalPages > 0) {
		if (isGaragePage) {
			dispatch(setGarageCurrentPage(totalPages));
		} else {
			dispatch(setWinnersCurrentPage(totalPages));
		}
	}
};

export const createPaginationHandlers = (
	currentPage: number,
	totalPages: number,
	onPageChange: (page: number) => void
) => ({
	handlePrevious: () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	},
	handleNext: () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	},
});

export const getPaginatedCars = (
	cars: Array<{
		color: string;
		id: number;
		name: string;
	}>,
	currentPage: number,
	carsPerPage: number
) => cars.slice((currentPage - 1) * carsPerPage, currentPage * carsPerPage);
