import React, { Component } from 'react';
import MapComponent from '../components/MapComponent'; // Adjust the path as necessary
import { isPointOnManagedStreet } from '../components/locationCheck'; // Import the function

class Frame3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      streetName: '', // State variable to hold the street name
      locationChecked: false, // State to indicate if location check is completed
    };
  }

  handleLocationFound = async (latitude, longitude) => {
    console.log('Received latitude:', latitude, 'Received longitude:', longitude);

    if (isNaN(latitude) || isNaN(longitude)) {
      console.error('Coordinates must be numbers');
      this.setState({
        streetName: 'Invalid coordinates',
        locationChecked: true,
      });
      return;
    }

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    console.log('Parsed latitude:', lat, 'Parsed longitude:', lon);

    try {
      const result = await isPointOnManagedStreet(lat, lon);
      this.setState({
        streetName: result.near ? result.streetName : 'not a managed street',
        locationChecked: true,
      });
    } catch (error) {
      console.error('Error checking location:', error);
      this.setState({
        streetName: 'Failed to check location',
        locationChecked: true,
      });
    }
  };

  render() {
    const { selectedCategory, imageDataUrl } = this.props.location.state; // Access the image data URL and category
    const { streetName, locationChecked } = this.state; // Destructure the state

    // Get today's date
    const today = new Date();
    const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;

    return (
      <div className="flex flex-col items-center w-full max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-4">Request Services from the City of Boston</h1>
        <div className="w-full mb-4">
          <h2 className="text-lg font-semibold">{selectedCategory} Report</h2> {/* Dynamically set the title */}
          <p className="text-sm">{formattedDate}</p> {/* Display today's date */}
          <img
            src={imageDataUrl} // Use the passed data URL here
            alt={selectedCategory}
            className="w-24 h-24 mt-2 mx-auto" // auto margins
            width="100"
            height="100"
            style={{ aspectRatio: '100 / 100', objectFit: 'cover' }}
          />
        </div>
        <div className="w-full mb-4">
          <h2 className="text-lg font-semibold">Confirm Location</h2>
          <MapComponent onLocationFound={this.handleLocationFound} /> {/* Pass the callback function */}
        </div>
        <div className="w-full mb-4">
          {locationChecked ? (
            <p className="text-sm font-semibold">
              Near {streetName}
            </p>
          ) : (
            <p className="text-sm font-semibold">
              Checking location...
            </p>
          )}
        </div>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 w-full bg-blue-600 text-white"
        >
          Confirm
        </button>
      </div>
    );
  }
}

export default Frame3;
