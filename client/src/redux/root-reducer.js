import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "redux/user/user-reducer";
import surveyReducer from "redux/survey/survey-reducer";
import reportsReducer from "redux/reports/reports-reducer";

const persistConfig = {
	key: "root",
	storage,
	whitelist: [],
};

// const surveyPersistConfig = {
// 	key: "survey",
// 	storage,
// 	blacklist: ["data"],
// };

const rootReducer = combineReducers({
	user: userReducer,
	survey: surveyReducer,
	reports: reportsReducer,
	// survey: persistReducer(surveyPersistConfig, surveyReducer),
});

export default persistReducer(persistConfig, rootReducer);
