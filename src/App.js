import './App.css';
import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import CheckoutPage from './pages/checkout/checkout.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { onSnapshot } from 'firebase/firestore';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';


const App = ({setCurrentUser, currentUser}) => {

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        onSnapshot(userRef, snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        })
      }

      setCurrentUser(userAuth);
    })
    return () => unsubscribeFromAuth();
  }, [setCurrentUser]);
  
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route path='/shop/*' element={<ShopPage />} />
          <Route exact path='/checkout' element={<CheckoutPage />} />
          <Route
            exact
            path='/signin'
            element={
              currentUser ? (
                <Navigate to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // collectionsArray: selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
