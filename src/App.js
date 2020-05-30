import React from 'react';

import Content from './components/Content';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <main className="">
      <div className="flex h-screen border-2 rounded shadow-md">
        <div className="w-1/4 bg-white h-full">
          <Sidebar />
        </div>
        <div className="w-3/4 bg-gray-100 h-full">
          <Content />
        </div>
      </div>
    </main>
  );
}

export default App;
