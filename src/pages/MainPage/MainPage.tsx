import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../../components/header/Header";

import styles from "./MainPage.module.scss";

const MainPage: React.FC = () => (
	<>
		<Header />
		<div className={`${styles.main}`}>
			<Outlet />
		</div>
	</>
);

export default MainPage;
