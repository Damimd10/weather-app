import React from 'react';

function App() {
  return (
    <main>
      <div className="flex p-3 h-screen">
        <div className="w-1/4 bg-gray-500 h-full">Sidebar</div>
        <div className="w-3/4 bg-gray-400 h-full">Content</div>
      </div>
    </main>
  );
}

export default App;
