import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../store/hooks/hooks";

import styles from "./WinnerBanner.module.scss";

const WinnerBanner: React.FC = () => {
	const { winnerTime, winnerName } = useSelector(
		(state: RootState) => state.engine
	);

	return (
		<div className={styles.banner}>
			<h1>WINNER</h1>
			{winnerName && <h1> {winnerName}</h1>}
			{winnerTime !== null && <h1>TIME: {(winnerTime / 1000).toFixed(2)} S</h1>}
		</div>
	);
};

export default WinnerBanner;
