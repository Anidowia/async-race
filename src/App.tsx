import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Wrapper from "./layout/wrapper/Wrapper";
import Winners from "./pages/winners/Winners";

const App: React.FC = () => (
	<Router>
		<Routes>
			<Route path="/" element={<Wrapper />} />
			<Route path="/winners" element={<Winners />} />
		</Routes>
	</Router>
);

export default App;
