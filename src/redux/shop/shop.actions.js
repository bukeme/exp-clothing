import { collection, getDocs } from "firebase/firestore";

import {db, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';
import ShopActionTypes from './shop.types';

export const fetchCollectionsStart = () => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
	payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
	payload: errorMessage
})

export const fetchCollectionsStartAsync = () => {
	return async (dispatch) => {
		const q = collection(db, 'collections');
		dispatch(fetchCollectionsStart());
		try {
			const querySnapshot = await getDocs(q);
		    const collectionsMap = convertCollectionsSnapshotToMap(querySnapshot);
		    dispatch(fetchCollectionsSuccess(collectionsMap));
		} catch(error) {
			dispatch(fetchCollectionsFailure(error.message));
		}
	}
}