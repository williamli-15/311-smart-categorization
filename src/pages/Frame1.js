import React, { Component } from 'react';

class Frame1 extends Component {
    handleCameraClick = () => {
    // Implement or call search functionality
    console.log('Camera button clicked');
    }
    
    handleSearchClick = () => {
    // Implement or call search functionality
    console.log('Search button clicked');
    }

  render() {
    return (
        <div class="flex flex-col items-center w-full max-w-md mx-auto p-4 space-y-8">
          <h1 class="text-2xl font-bold text-center">Request Services from the City of Boston</h1>
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center justify-center w-full h-48 bg-gray-300">
                <button 
                onClick={this.handleCameraClick}
                className="flex justify-center items-center w-full h-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-label="Use camera to report an issue"
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-12 h-12 text-gray-500"
                >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                    <circle cx="9" cy="9" r="2"></circle>
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                </svg>
                </button>
            </div>
            <p className="text-center">Use your camera to report an issue.</p>
          </div>
          <div class="flex flex-col items-center space-y-2">
            <div class="flex items-center justify-center w-full h-48 bg-gray-300">
              <button class="justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-4 h-4"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
                <span>Search</span>
              </button>
            </div>
            <p class="text-center">Search our library of available services</p>
          </div>
        </div>
    );
  }
}

export default Frame1;