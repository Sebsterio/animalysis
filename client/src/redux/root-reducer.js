import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "redux/user/user-reducer";
import profileReducer from "redux/profile/profile-reducer";
import clinicReducer from "redux/clinic/clinic-reducer";
import petsReducer from "redux/pets/pets-reducer";
import surveyReducer from "redux/survey/survey-reducer";
import surveyDataReducer from "redux/survey-data/survey-data-reducer";
import errorReducer from "redux/error/error-reducer";

const persistConfig = {
	key: "root",
	storage,
	blacklist: ["error"],
};

// const surveyPersistConfig = {
// 	key: "survey",
// 	storage,
// 	blacklist: ["data"],
// };

const rootReducer = combineReducers({
	user: userReducer,
	profile: profileReducer,
	clinic: clinicReducer,
	pets: petsReducer,
	survey: surveyReducer,
	surveyData: surveyDataReducer,
	error: errorReducer,
	// survey: persistReducer(surveyPersistConfig, surveyReducer),
});

export default persistReducer(persistConfig, rootReducer);
