import React, { Component } from 'react';

class Frame5 extends Component {
  render() {
    return (
        <div class="max-w-md mx-auto p-4">
          <h1 class="text-2xl font-bold mb-4">Request Services from the City of Boston</h1>
          <div class="flex justify-between mb-4">
            <div>
              <p class="font-bold">Pothole Report</p>
              <p>6/10/25</p>
              <img
                src="/placeholder.svg"
                alt="Pothole"
                class="mt-2"
                width="100"
                height="100"
                style={{ aspectRatio: '100 / 100', objectFit: 'cover' }}
              />
            </div>
            <div>
              <p class="font-semibold">Near 18 Roxana st, #1</p>
              <p class="font-semibold">Hyde Park, MA 02136</p>
              <img
                src="/placeholder.svg"
                alt="Map"
                class="mt-2"
                width="100"
                height="100"
                style={{ aspectRatio: '100 / 100', objectFit: 'cover' }}
              />
            </div>
          </div>
          <div class="w-full mt-4">
      <h2 class="text-xl font-bold italic">Location alert:</h2>
      <p class="mt-2 text-lg italic">
        This pot hole is on a state road and cannot be fixed by the City of Boston. Please contact the state
        Department of Transportation for service of this pot hole.
      </p>
    </div>
    <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 mt-4 bg-blue-600 text-white">
      Report another Issue
    </button>
        </div>
    );
  }
}

export default Frame5;
