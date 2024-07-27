import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Wrapper from "./layout/wrapper/Wrapper";
import Winners from "./pages/winners/Winners";
import HeaderLinks from "./layout/header/components/HeaderLinks";
import Footer from "./layout/footer/Footer";

const App: React.FC = () => (
	<Router>
		<HeaderLinks />
		<Routes>
			<Route path="/" element={<Wrapper />} />
			<Route path="/winners" element={<Winners />} />
		</Routes>
		<Footer />
	</Router>
);

export default App;
