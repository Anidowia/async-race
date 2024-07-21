import React from "react";

import Garage from "../../components/garage/Garage";

import styles from "./MainPage.module.scss";

interface CarPosition {
	[key: string]: number;
}

interface MainPageProps {
	animatingCar: string | null;
	pausedCars: CarPosition;
	setPausedCars: React.Dispatch<React.SetStateAction<CarPosition>>;
	setAnimatingCar: React.Dispatch<React.SetStateAction<string | null>>;
}

const MainPage: React.FC<MainPageProps> = ({
	animatingCar,
	pausedCars,
	setPausedCars,
	setAnimatingCar,
}) => (
	<div className={styles.main}>
		<Garage
			animatingCar={animatingCar}
			pausedCars={pausedCars}
			setPausedCars={setPausedCars}
			setAnimatingCar={setAnimatingCar}
		/>
	</div>
);

export default MainPage;
