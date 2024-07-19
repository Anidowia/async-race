import React from "react";

import Header from "../../components/header/Header";

import styles from "./MainPage.module.scss";

const MainPage: React.FC = () => (
	<>
		<Header />
		<div className={`${styles.main}`} />
	</>
);

export default MainPage;
