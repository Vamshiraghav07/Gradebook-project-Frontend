

import React, { useState } from 'react';
import Header from './Components/Header';
import MainBlock from './Components/MainBlock';
import StatisticsBlock from './Components/StatisticsBlock';
import Footer from './Components/Footer';

function App() {
  
  const [showStatistics, setShowStatistics] = useState(false);

  return (
    <div className="App">
      <Header />
      <MainBlock />
      
      {showStatistics && <StatisticsBlock />}
      <button onClick={() => setShowStatistics(!showStatistics)}>
        {showStatistics ? "Hide Statistics" : "Show Statistics"}
      </button>
      <Footer />
    </div>
  );
}

export default App;
