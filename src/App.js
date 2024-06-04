import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import PhotoSearch from './components/photo-search/PhotoSearch';
import Header from './components/Header';

// Define the ProtectedRoute component
const ProtectedRoute = ({ component: Component, currentUser, ...props }) => {
  if (!currentUser) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/" />;
  }

  // If the user is authenticated, render the component with the Header
  return (
    <>
      <Header currentUser={currentUser} onLogout={props.onLogout} />
      <Component {...props} />
    </>
  );
};

const App = ({ currentUser }) => {
  const [collections, setCollections] = useState([]);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const handleAddToCollection = (photo, collectionId) => {
    const collection = collections.find((c) => c.id === collectionId);
    if (collection) {
      const updatedCollection = {
        ...collection,
        photos: [...collection.photos, photo],
      };
      setCollections(collections.map((c) => (c.id === collectionId ? updatedCollection : c)));
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div>
            <h1>Welcome to the Photo Search & Management Application</h1>
            <Login />
            <p>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        } />
        <Route path="/signup" element={
          <div>
            <h1>Welcome to the Photo Search & Management Application</h1>
            <Signup />
            <p>
              Already have an account? <Link to="/">Login</Link>
            </p>
          </div>
        } />
        <Route path="/photo-search" element={
          <ProtectedRoute
            component={PhotoSearch}
            currentUser={currentUser}
            collections={collections}
            onAddToCollection={handleAddToCollection}
            onLogout={handleLogout}
          />
        } />
      </Routes>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps)(App);
