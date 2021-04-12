import React from 'react';
import {BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import Dashboard from './Landing/Dashboard';
import ProtectedRoute from '../hoc/ProtectedRoute';
import FavouritePage from './FavouriteMovie/FavouritePage'
import MovieSearch from './Search/MovieSearch';
import MovieDetail from './MovieDetail/MovieDetail'
const App = () => {
  return (

    <Router>

      <Switch>
      <Route exact path='/' component={Home}/>
      <Route path ='/login' component={Login}/>
      <Route path ='/register' component={Register}/>
      </Switch>
        <Switch>
            <ProtectedRoute path ='/dashboard' component={Dashboard}/>
            <ProtectedRoute exact path="/movie/:movieId/:type" component={MovieDetail} />
            <ProtectedRoute path ='/myFavourites' component={FavouritePage}/>
            <ProtectedRoute exact path ='/searchResults'component={MovieSearch}/>


          </Switch>      

         
     
    </Router>
  )
}

export default App;
