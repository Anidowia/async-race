import React from "react";

import Button from "../button/Button";

import styles from "./Page.module.scss";

const Page: React.FC<{
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
	const handlePrevious = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNext = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	};

	return (
		<div className={styles.pagination}>
			<Button onClick={handlePrevious}>&lt;</Button>
			<Button onClick={handleNext}>&gt;</Button>
		</div>
	);
};

export default Page;
