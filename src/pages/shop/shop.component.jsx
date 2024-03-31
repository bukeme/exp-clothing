import React, { useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import {connect} from 'react-redux';
import { collection, onSnapshot } from "firebase/firestore";

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionPage from '../collection/collection.component';
import {db, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';
import {updateCollections} from '../../redux/shop/shop.actions';
import {isLoadingBool} from '../../redux/with-spinner/with-spinner.actions';
import {selectIsLoading} from '../../redux/with-spinner/with-spinner.selectors';


// class ShopPage extends React.Component {
// 	unsubscribeFromSnapshot = null;

// 	componentDidMount() {
// 		const q = query(collection(db, 'collections'));
// 		onSnapshot(q, querySnapshot => {
// 			querySnapshot.forEach(doc => {
// 				console.log(querySnapshot);
// 			});
// 		});
// 	}

// 	render() {
// 		console.log(this.props);
// 		const params = useParams()
// 		return (
// 			<div className='shop-page'>
// 	        	<Routes>
// 	            	<Route path='/' element={<CollectionsOverview />} />
// 	            	<Route path='/:collectionId' element={<CollectionPage params={params} />} />
// 				</Routes>
// 			</div>
// 		);
// 	}
// }

const ShopPage = ({updateCollections, isLoading, isLoadingBool}) => {
  const params = useParams();
  const CollectionsOverviewWithSpinnerComponent = WithSpinner(CollectionsOverview);
  const CollectionPageWithSpinnerComponent = WithSpinner(CollectionPage)

  useEffect(() => {
    const q = collection(db, 'collections');
    const unsubscribeFromSnapshot = onSnapshot(q, (querySnapshot) => {
    	const collectionsMap = convertCollectionsSnapshotToMap(querySnapshot);
    	updateCollections(collectionsMap);
      isLoadingBool();
    });
    
    return () => unsubscribeFromSnapshot();
  }, [updateCollections, isLoading, isLoadingBool]); // Empty dependency array to run the effect only once on mount

  return (
    <div className='shop-page'>
      <Routes>
        <Route
          path='/'
          element={<CollectionsOverviewWithSpinnerComponent isLoading={isLoading} />} />
        <Route
          path='/:collectionId'
          element={<CollectionPageWithSpinnerComponent isLoading={isLoading} params={params} />} />
      </Routes>
    </div>
  );
};


const mapDispatchToProps = dispatch => ({
	updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap)),
  isLoadingBool: () => dispatch(isLoadingBool())
});

const mapStateToProps = state => ({
  isLoading: selectIsLoading(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);