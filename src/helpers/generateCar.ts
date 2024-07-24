import {
	addCarToGarage,
	fetchCarModels,
	fetchCarNames,
} from "../store/garage/thunk";
import { AppDispatch } from "../store/hooks/hooks";
import { getRandomCarName } from "./getRandomCarName";
import { getRandomColor } from "./getRandomColor";

export const generateCar = async (dispatch: AppDispatch) => {
	const carNamesResponse = await dispatch(fetchCarNames()).unwrap();
	const carModelsResponse = await dispatch(fetchCarModels()).unwrap();

	const newCarName = getRandomCarName(carNamesResponse);
	const newCarModel = getRandomCarName(carModelsResponse);
	const newCarColor = getRandomColor();
	const fullCarName = `${newCarName} ${newCarModel}`;

	dispatch(addCarToGarage({ name: fullCarName, color: newCarColor }));
};
