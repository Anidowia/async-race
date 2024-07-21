import React from "react";

import Garage from "../../components/garage/Garage";

import styles from "./MainPage.module.scss";

interface CarPosition {
	[key: string]: number;
}

interface AnimatingCars {
	[key: string]: boolean;
}
interface MainPageProps {
	animatingCars: AnimatingCars;
	pausedCars: CarPosition;
	setPausedCars: React.Dispatch<React.SetStateAction<CarPosition>>;
	setAnimatingCars: React.Dispatch<React.SetStateAction<AnimatingCars>>;
}

const MainPage: React.FC<MainPageProps> = ({
	animatingCars,
	pausedCars,
	setPausedCars,
	setAnimatingCars,
}) => (
	<div className={styles.main}>
		<Garage
			animatingCars={animatingCars}
			pausedCars={pausedCars}
			setPausedCars={setPausedCars}
			setAnimatingCars={setAnimatingCars}
		/>
	</div>
);

export default MainPage;
