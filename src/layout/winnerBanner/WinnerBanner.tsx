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
			{winnerName && <p>First Car: {winnerName}</p>}
			{winnerTime !== null && <p>TIME: {(winnerTime / 1000).toFixed(2)} s</p>}
		</div>
	);
};

export default WinnerBanner;
