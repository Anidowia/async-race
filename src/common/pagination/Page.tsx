import React from "react";

import Button from "../button/Button";

import { createPaginationHandlers } from "../../utils/pagination";

import styles from "./Page.module.scss";

const Page: React.FC<{
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
	const { handlePrevious, handleNext } = createPaginationHandlers(
		currentPage,
		totalPages,
		onPageChange
	);

	const isPreviousDisabled = currentPage <= 1;
	const isNextDisabled = currentPage >= totalPages;

	return (
		<div className={styles.pagination}>
			<Button onClick={handlePrevious} disabled={isPreviousDisabled}>
				&lt;
			</Button>
			<Button onClick={handleNext} disabled={isNextDisabled}>
				&gt;
			</Button>
		</div>
	);
};

export default Page;
