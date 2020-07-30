import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "redux/user/user-reducer";
import surveyReducer from "redux/survey/survey-reducer";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["user", "survey"],
};

const rootReducer = combineReducers({
	user: userReducer,
	survey: surveyReducer,
});

export default persistReducer(persistConfig, rootReducer);
