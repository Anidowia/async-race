import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import Input from "../Input/Input";
import Button from "../button/Button";
import HeaderLinks from "./components/HeaderLinks";

import { AppDispatch, RootState } from "../../store";
import { clearSelectedCar, updateCar } from "../../store/slices/garageSlice";

import styles from "./Header.module.scss";

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
	const dispatch: AppDispatch = useDispatch();

	const cars = useSelector((state: RootState) => state.garage.cars);
	const selectedCar = useSelector(
		(state: RootState) => state.garage.selectedCar
	);
	const initialValues = {
		textInput: selectedCar?.name || "",
		colorInput: selectedCar?.color || "#0077e5",
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

	const handleUpdateSubmit = (
		values: typeof initialValues,
		{ resetForm }: FormikHelpers<typeof initialValues>
	) => {
		if (selectedCar) {
			const updatedCar: { id: number; name: string; color: string } = {
				id: selectedCar.id,
				name: values.textInput,
				color: values.colorInput,
			};
			dispatch(updateCar(updatedCar));
			resetForm();
			dispatch(clearSelectedCar());
		}
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
							onSubmit={handleUpdateSubmit}
							enableReinitialize
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
									<Button type="submit">UPDATE</Button>
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
