import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage/MainPage";
import Garage from "./components/garage/Garage";
import Winners from "./pages/winners/Winners";

const App: React.FC = () => (
	<Router>
		<Routes>
			<Route path="/" element={<MainPage />}>
				<Route index element={<Garage />} />
				<Route path="winners" element={<Winners />} />
			</Route>
		</Routes>
	</Router>
);

export default App;
