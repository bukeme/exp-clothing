import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
	[selectShop],
	shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
	[selectShopCollections],
	collections => collections ? Object.values(collections) : []
);

export const selectCollection = collectionUrlParam =>
	createSelector(
		[selectShopCollections],
		collections => collections ? collections[collectionUrlParam] : null
	);

export const selectIsCollectionFetching = createSelector(
	[selectShop],
	shop => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
	[selectShop],
	shop => !!shop.collections
);