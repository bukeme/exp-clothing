import React from 'react';

import {SpinnerContainer, SpinnerOverlay} from './with-spinner.styles';

const WithSpinner = WrapperComponent => ({isLoading, ...otherProps}) => {
	return isLoading ? (
		<SpinnerContainer>
			<SpinnerOverlay />
		</SpinnerContainer>
	) : (
		<WrapperComponent {...otherProps} />
	)
}

export default WithSpinner;