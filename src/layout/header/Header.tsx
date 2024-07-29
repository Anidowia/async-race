import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import Input from "../../common/input/Input";
import Button from "../../common/button/Button";

import { AppDispatch, RootState } from "../../store/hooks/hooks";
import { clearSelectedCar } from "../../store/garage/slice";
import { updateCar } from "../../store/garage/thunk";

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
	const { garageCurrentPage } = useSelector((state: RootState) => state.page);

	const initialValuesCreate = {
		textInput: "",
		colorInput: "#833ab4",
	};

	const initialValuesUpdate = {
		textInput: selectedCar?.name || "",
		colorInput: selectedCar?.color || "#833ab4",
	};

	const validationSchema = Yup.object({
		textInput: Yup.string()
			.required("Name is required")
			.max(30, "Car name cannot exceed 30 characters"),
	});

	const handleCreateSubmit = (
		values: typeof initialValuesCreate,
		{ resetForm }: FormikHelpers<typeof initialValuesCreate>
	) => {
		onCreateCar(values.textInput, values.colorInput);
		resetForm();
	};

	const handleUpdateSubmit = (
		values: typeof initialValuesUpdate,
		{ resetForm }: FormikHelpers<typeof initialValuesUpdate>
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
		<nav className={styles.grid}>
			<div className={styles.buttons}>
				<div className={styles["buttons-create"]}>
					<Formik
						initialValues={initialValuesCreate}
						validationSchema={validationSchema}
						onSubmit={handleCreateSubmit}
					>
						{({ handleChange, values, errors, touched }) => (
							<Form>
								<div className={styles.inlineForm}>
									<Input
										type="text"
										value={values.textInput}
										onChange={handleChange}
										name="textInput"
										id="carCreate"
									/>
									<Input
										type="color"
										value={values.colorInput}
										onChange={handleChange}
										name="colorInput"
										id="colorCreate"
									/>
									<Button type="submit">CREATE</Button>
								</div>
								{errors.textInput && touched.textInput && (
									<p>{errors.textInput}</p>
								)}
							</Form>
						)}
					</Formik>
				</div>
				<div className={styles["buttons-update"]}>
					<Formik
						initialValues={initialValuesUpdate}
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
				<h2>Page #{garageCurrentPage}</h2>
			</div>
		</nav>
	);
};

export default Header;
