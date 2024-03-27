import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';


const ShopPage = () => {
	const params = useParams()
	return (
		<div className='shop-page'>
        	<Routes>
            	<Route path='/' element={<CollectionsOverview />} />
            	<Route path='/:collectionId' element={<CollectionPage params={params} />} />
			</Routes>
		</div>
)};

export default ShopPage;