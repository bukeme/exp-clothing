import {createSelector} from 'reselect';

const selectWithSpinner = state => state.withSpinner;

export const selectIsLoading = createSelector(
	[selectWithSpinner],
	withSpinner => withSpinner.isLoading
);