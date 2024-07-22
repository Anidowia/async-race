import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";

import Input from "../Input/Input";
import Button from "../button/Button";

import { RootState } from "../../store";

import styles from "./Header.module.scss";
import HeaderLinks from "./components/HeaderLinks";

interface HeaderProps {
	onRaceClick: () => void;
	onResetClick: () => void;
	onCreateCar: (name: string, color: string) => void;
	onGenerateCars: () => void;
}

const Header: React.FC<HeaderProps> = ({
	onRaceClick,
	onResetClick,
	onCreateCar,
	onGenerateCars,
}) => {
	const cars = useSelector((state: RootState) => state.garage.cars);

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
			<HeaderLinks />

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
									<Button type="submit">CREATE</Button>
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
									<Button>UPDATE</Button>
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
							<Button onClick={onGenerateCars}>GENERATE CARS</Button>
						</div>
					</div>
				</div>
				<div className={styles.page}>
					<h2>Cars: {cars.length}</h2>
					<h2>Page 1/1</h2>
				</div>
			</div>
		</>
	);
};

export default Header;
