import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "redux/user/user-reducer";
import petsReducer from "redux/pets/pets-reducer";
import surveyReducer from "redux/survey/survey-reducer";
import surveyDataReducer from "redux/survey-data/survey-data-reducer";

const persistConfig = {
	key: "root",
	storage,
	// whitelist: [],
};

// const surveyPersistConfig = {
// 	key: "survey",
// 	storage,
// 	blacklist: ["data"],
// };

const rootReducer = combineReducers({
	user: userReducer,
	pets: petsReducer,
	survey: surveyReducer,
	surveyData: surveyDataReducer,
	// survey: persistReducer(surveyPersistConfig, surveyReducer),
});

export default persistReducer(persistConfig, rootReducer);
