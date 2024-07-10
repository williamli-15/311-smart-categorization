import React, { Component } from 'react';

class Frame4 extends Component {
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
          <h2 class="font-bold mb-2">Contact information</h2>
          <form class="space-y-4">
            <input
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Name"
            />
            <input
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="email"
              type="email"
            />
            <input
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="phone"
              type="tel"
            />
            <textarea
              class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="details/messages"
            ></textarea>
            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 w-full bg-blue-600 text-white">
              Submit
            </button>
          </form>
        </div>
    );
  }
}

export default Frame4;
