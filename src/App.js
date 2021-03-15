/** From React */
import React from 'react';

/** Custom Components */
import Header from './Components/Header/header.component';
import Home from './Pages/Home/home.component';
import LocaleDetails from './Pages/LocaleDetails/localedetails.component';
import ImageDetails from './Pages/ImageDetails/imagedetails.component';
import SavedVenues from './Pages/SavedVenues/saved-venues.component';

/** Installed packeges */
import axios from 'axios';
import {BrowserRouter as Router , Route} from 'react-router-dom';

/** CSS */
import './App.css';

class App extends React.Component{

  constructor(props){
    super(props);

    this.state = {

      surroundingLocations: null
  
    }

  }

  getNearbyPlaces = (locationName) => {

    const endPoint = 'https://api.foursquare.com/v2/venues/explore?';
    const parameters = {

      client_id: 'TIG4VWGSW1OHNTJPY5YJWP0S3BH2DZBHLIBTQJ5PBKFNNU3O',
      client_secret: 'EZ01RYFOO4YWKPTMYUXDHSMQM0XNFCVDI20CXEBMI2MH4JR3',
      near: locationName,
      v: '20180323',
      limit: 10

    }
    
    axios.get(endPoint + new URLSearchParams(parameters))
    .then(response => { 

      this.setState({surroundingLocations: response.data.response.groups[0].items});

    }).catch((error) => {alert("Please search for existing location.")});
    
  }

  getNearbyPlacesUsingCurrentAddress = () => {
    
    let self = this;

    if(navigator.geolocation){
       
      navigator.geolocation.getCurrentPosition(function(position) {

          const endPoint = 'https://api.foursquare.com/v2/venues/explore?';
          const parameters = {

            client_id: 'TIG4VWGSW1OHNTJPY5YJWP0S3BH2DZBHLIBTQJ5PBKFNNU3O',
            client_secret: 'EZ01RYFOO4YWKPTMYUXDHSMQM0XNFCVDI20CXEBMI2MH4JR3',
            ll: position.coords.latitude+','+position.coords.longitude,
            v: '20180323',
            limit: 10

          }

          axios.get(endPoint + new URLSearchParams(parameters))
          .then(response => { 

            self.setState({surroundingLocations: response.data.response.groups[0].items})

          });
          
        },
        function(error) {
          console.error("Error Code = " + error.code + " - " + error.message);

          if(error.code === 0){
            alert("Unknown error");
          }else if(error.code === 1){
            alert("Permision denied");
          }else if(error.code === 2){
            alert("position unavailable");
          }else{
            alert("Timed out");
          }

        }

      );

    }else{

      alert("Browser does not support feature");

    }
    

  }

  render(){

    const { surroundingLocations } = this.state;

    return(

      <div className = "App">

        <Router>

          <Header />

          <Route exact path = "/" render = { () => (

            <Home surroundingLocations = { surroundingLocations }  
              getNearbyPlaces = { this.getNearbyPlaces } 
              useCurrentLocation = { this.getNearbyPlacesUsingCurrentAddress } />

          )}/>

          <Route exact path = "/locationimages/:venue_name/:venue_id" component = { LocaleDetails } />

          <Route exact path = "/imagedetails/:image_id" component = { ImageDetails } />

          <Route exact path = "/saved-venues" component = { SavedVenues } />

        </Router>

      </div>

    );

  }

}

export default App;
