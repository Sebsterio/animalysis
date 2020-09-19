import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import { store, persistor } from "redux/store";
import * as serviceWorker from "./serviceWorker";

import { App } from "App";
import "styles/index.scss";

ReactDOM.render(
	<React.StrictMode>
		<CssBaseline />
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

serviceWorker.register();
