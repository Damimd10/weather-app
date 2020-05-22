import React from 'react';
import { useMachine } from '@xstate/react';

import { fetchMachine } from './machines/fetch';

import Sidebar from './components/Sidebar';

const ENDPOINT = 'http://api.weatherapi.com/v1/forecast.json';

function App() {
  const [state, send] = useMachine(fetchMachine, {
    actions: {
      notifySuccess: (ctx) => {},
    },
    services: {
      fetchData: (_, e) =>
        fetch(
          `${ENDPOINT}?key=${process.env.REACT_APP_WEATHER_TOKEN}&q=${e.query}&days=7`,
        ).then((response) => response.json()),
    },
  });

  return (
    <main>
      <div className="flex p-3 h-screen">
        <div className="w-1/4 bg-gray-500 h-full">
          <Sidebar send={send} state={state} />
        </div>
        <div className="w-3/4 bg-gray-400 h-full">Content</div>
      </div>
    </main>
  );
}

export default App;
