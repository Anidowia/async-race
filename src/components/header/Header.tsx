import React from "react";
import { NavLink } from "react-router-dom";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";

import Input from "../Input/Input";
import Button from "../button/Button";
import Divider from "../../pages/MainPage/components/Divider";

import styles from "./Header.module.scss";

interface HeaderProps {
	onRaceClick: () => void;
	onResetClick: () => void;
	onCreateCar: (name: string, color: string) => void;
	carList: { [key: string]: string };
}

const Header: React.FC<HeaderProps> = ({
	onRaceClick,
	onResetClick,
	onCreateCar,
	carList,
}) => {
	const initialValues = {
		textInput: "",
		colorInput: "#0077e5",
	};

	const validationSchema = Yup.object({
		textInput: Yup.string().required("Required"),
		colorInput: Yup.string().required("Required"),
	});

	const handleCreateSubmit = (
		values: typeof initialValues,
		{ resetForm }: FormikHelpers<typeof initialValues>
	) => {
		onCreateCar(values.textInput, values.colorInput);
		resetForm();
	};

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
						<Formik
							initialValues={initialValues}
							validationSchema={validationSchema}
							onSubmit={handleCreateSubmit}
						>
							{({ handleChange, values }) => (
								<Form className={styles.inlineForm}>
									<Input
										type="text"
										value={values.textInput}
										onChange={handleChange}
										name="textInput"
									/>
									<Input
										type="color"
										value={values.colorInput}
										onChange={handleChange}
										name="colorInput"
									/>
									<Button onClick={() => {}}>CREATE</Button>
								</Form>
							)}
						</Formik>
					</div>
					<div className={styles["buttons-update"]}>
						<Formik
							initialValues={initialValues}
							validationSchema={validationSchema}
							onSubmit={() => {}}
						>
							{({ handleChange, values }) => (
								<Form className={styles.inlineForm}>
									<Input
										type="text"
										value={values.textInput}
										onChange={handleChange}
										name="textInput"
									/>
									<Input
										type="color"
										value="#141a22"
										onChange={handleChange}
										name="colorInput"
									/>
									<Button onClick={() => {}}>UPDATE</Button>
								</Form>
							)}
						</Formik>
					</div>
					<div className={styles["buttons-race"]}>
						<div className={styles.race}>
							<Button onClick={onRaceClick}>RACE</Button>
						</div>
						<Button onClick={onResetClick}>RESET</Button>
						<div className={styles.generate}>
							<Button onClick={() => {}}>GENERATE CARS</Button>
						</div>
					</div>
				</div>
				<div className={styles.page}>
					<h2>Cars: {Object.keys(carList).length}</h2>
					<h2>Page 1/1</h2>
				</div>
			</div>
		</>
	);
};

export default Header;
