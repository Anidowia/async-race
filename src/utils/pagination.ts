import { AppDispatch } from "../store/hooks/hooks";
import { setCurrentPage } from "../store/pages/slice";

export const handlePageAdjustment = (
	carsLength: number,
	currentPage: number,
	carsPerPage: number,
	dispatch: AppDispatch
) => {
	const totalPages = Math.ceil(carsLength / carsPerPage);
	if (currentPage > totalPages && totalPages > 0) {
		dispatch(setCurrentPage(totalPages));
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
