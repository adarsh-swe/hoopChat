import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
// Redux
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";

const App = () => (
	<Provider store={store}>
		<BrowserRouter>
			<Fragment>
				<Navbar />
				<Routes>
					<Route exact path="/" Component={Landing} />
				</Routes>
				<section className="container">
					<Alert />
					<Routes>
						<Route exact path="/register" Component={Register} />
						<Route exact path="/login" Component={Login} />
					</Routes>
				</section>
			</Fragment>
		</BrowserRouter>
	</Provider>
);

export default App;
