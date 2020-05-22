import React, { useState } from 'react';

const Sidebar = ({ send, state }) => {
  const [city, setCity] = useState();

  const handleTextChange = (e) => setCity(e.target.value);

  const handleKeyPress = (e) => {
    if (e.which === 13 || e.keyCode === 13) {
      send('FETCH', { query: city });
    }
  };

  return (
    <section className="m-2">
      <div className="relative text-center text-gray-600">
        <input
          className="bg-white w-4/5 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
          name="serch"
          onChange={handleTextChange}
          onKeyPress={handleKeyPress}
          placeholder="Search"
          type="search"
          value={city}
        />
      </div>
    </section>
  );
};

export default Sidebar;
