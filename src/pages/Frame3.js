import React, { Component } from 'react';

class Frame3 extends Component {
  render() {
    return (
      <div className="flex flex-col items-center w-full max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-4">Request Services from the City of Boston</h1>
        <div className="w-full mb-4">
          <h2 className="text-lg font-semibold">Pothole Report</h2>
          <p className="text-sm">6/10/25</p>
          <img 
            src="/placeholder.svg" 
            alt="Pothole" 
            className="w-24 h-24 mt-2" 
            width="100"
            height="100" 
            style={{ aspectRatio: '100 / 100', objectFit: 'cover' }} 
          />
        </div>
        <div className="w-full mb-4">
          <h2 className="text-lg font-semibold">Confirm Location</h2>
          <img 
            src="/placeholder.svg" 
            alt="Map"
            className="w-full h-48 mt-2" 
            width="300" 
            height="200" 
            style={{ aspectRatio: '300 / 200', objectFit: 'cover' }} 
          />
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
