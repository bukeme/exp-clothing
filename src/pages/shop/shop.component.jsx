import React, { useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import {connect} from 'react-redux';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';
import {fetchCollectionsStartAsync} from '../../redux/shop/shop.actions';



const ShopPage = ({fetchCollectionsStartAsync}) => {
  const params = useParams();

  useEffect(() => {
    fetchCollectionsStartAsync()
  }, [fetchCollectionsStartAsync]); // Empty dependency array to run the effect only once on mount

  return (
    <div className='shop-page'>
      <Routes>
        <Route
          path='/'
          element={<CollectionsOverviewContainer />} />
        <Route
          path='/:collectionId'
          element={<CollectionPageContainer params={params} />} />
      </Routes>
    </div>
  );
};


const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(null, mapDispatchToProps)(ShopPage);