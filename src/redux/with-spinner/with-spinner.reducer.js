import {withSpinnerTypes} from './with-spinner.types';

const INITIAL_STATE = {
	isLoading: true
}

const withSpinnerReducer = (state=INITIAL_STATE, action) => {
	switch(action.type) {
		case withSpinnerTypes.IS_LOADING_BOOL:
			return {
				...state,
				isLoading: false
			};
		default:
			return state;
	}
}

export default withSpinnerReducer;