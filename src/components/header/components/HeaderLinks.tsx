import React from "react";
import { NavLink } from "react-router-dom";

import Divider from "../../../pages/MainPage/components/Divider";

import styles from "./HeaderLinks.module.scss";

const HeaderLinks: React.FC = () => (
	<>
		<header className={styles.header}>
			<h3>ASYNC RACE</h3>
			<ul className="header-menu">
				<li>
					<NavLink
						to="/"
						className={({ isActive }) => (isActive ? styles.activeLink : "")}
					>
						Garage
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/winners"
						className={({ isActive }) => (isActive ? styles.activeLink : "")}
					>
						Winners
					</NavLink>
				</li>
			</ul>
		</header>
		<div className={styles["header-divider"]}>
			<Divider />
		</div>
	</>
);

export default HeaderLinks;
