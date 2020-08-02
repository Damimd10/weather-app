import React from 'react';

import Content from './components/Content';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <main>
      <div className="flex flex-wrap h-screen border-2 rounded shadow-md">
        <div className="w-full flex items-center justify-center bg-white lg:h-full xl:h-full xl:w-1/4">
          <Sidebar />
        </div>
        <div className="w-full bg-gray-100 flex items-center justify-center h-full xl:w-3/4">
          <Content />
        </div>
      </div>
    </main>
  );
}

export default App;
