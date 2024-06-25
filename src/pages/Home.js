// src/pages/Home.js
import React from 'react';
import Countries from '../components/Countries';

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Flags App
      </h1>
      <Countries />
    </div>
  );
};

export default Home;
