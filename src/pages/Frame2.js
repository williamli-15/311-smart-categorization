import React, { Component } from 'react';

class Frame2 extends Component {

  render() {
    return (
        <div class="flex flex-col items-center w-full max-w-md mx-auto p-4 space-y-8">
          <h1 class="text-2xl font-bold text-center">Request Services from the City of Boston</h1>
          <img
            src="/placeholder.svg"
            alt="Damaged road"
            class="w-full max-w-md"
            width="600"
            height="400"
            style={{ aspectRatio: '600 / 400', objectFit: 'cover' }}
          />
          <div class="text-lg">
            <p class="font-bold">Are you reporting one of the following?</p>
            <ul class="list-disc list-inside">
              <li>Pothole</li>
              <li>Damaged sidewalk</li>
            </ul>
          </div>
          <p class="text-lg">
            <span class="font-bold">Something else? Search our service library</span> 
          </p>
        </div>
    );
  }
}

export default Frame2;