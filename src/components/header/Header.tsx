import React from "react";
import { NavLink } from "react-router-dom";

import Input from "../Input/Input";
import Button from "../button/Button";

import styles from "./Header.module.scss";
import Divider from "../../pages/MainPage/components/Divider";

const Header: React.FC = () => {
	const handleButtonClick = () => {};

	return (
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

			<div className={styles.grid}>
				<div className={styles.buttons}>
					<div className={styles["buttons-create"]}>
						<Input type="text" />
						<Button onClick={handleButtonClick} type="button">
							CREATE
						</Button>
						<Input type="color" value="#0077e5" />
					</div>
					<div className={styles["buttons-update"]}>
						<Input type="text" />
						<Button onClick={handleButtonClick} type="button">
							UPDATE
						</Button>
						<Input type="color" value="#004f98" />
					</div>
					<div className={styles["buttons-race"]}>
						<div className={styles.race}>
							<Button onClick={handleButtonClick} type="button">
								RACE
							</Button>
						</div>
						<Button onClick={handleButtonClick} type="button">
							RESET
						</Button>
						<div className={styles.generate}>
							<Button onClick={handleButtonClick} type="button">
								GENERATE CARS
							</Button>
						</div>
					</div>
				</div>
				<div className={styles.page}>
					<h2>Cars: 1</h2>
					<h2>Page 1/1</h2>
				</div>
			</div>
		</>
	);
};

export default Header;
