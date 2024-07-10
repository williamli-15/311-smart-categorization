import React, { Component } from 'react';
import MapComponent from '../components/MapComponent'; // Adjust the path as necessary

class Frame3 extends Component {
  render() {

    // Access the selected category from props passed via router
    const { selectedCategory, imageDataUrl } = this.props.location.state;  // Access the image data URL and category

    // Get today's date
    const today = new Date();
    const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;

    return (
      <div className="flex flex-col items-center w-full max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-4">Request Services from the City of Boston</h1>
        <div className="w-full mb-4">
          <h2 className="text-lg font-semibold">{selectedCategory} Report</h2>  {/* Dynamically set the title */}
          <p className="text-sm">{formattedDate}</p>  {/* Display today's date */}
          <img 
            src={imageDataUrl}  // Use the passed data URL here
            alt={selectedCategory}
            className="w-24 h-24 mt-2 mx-auto"  // auto margins
            width="100"
            height="100" 
            style={{ aspectRatio: '100 / 100', objectFit: 'cover' }} 
          />
        </div>
        <div className="w-full mb-4">
          <h2 className="text-lg font-semibold">Confirm Location</h2>
          <MapComponent /> {/* This replaces the placeholder image */}
        </div>
        <div className="w-full mb-4">
          <p className="text-sm font-semibold">
            Near 18 Roxana st, #1<br />
            Hyde Park, MA 02136
          </p>
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
