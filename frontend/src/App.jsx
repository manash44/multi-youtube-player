import React, { useState } from 'react';
import { YoutubePlayer } from './components/YoutubePlayer';
import { Plus, MonitorPlay } from 'lucide-react';
import './index.css';

function App() {
  const [players, setPlayers] = useState([
    { id: 1, url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ' },
    { id: 2, url: '' }
  ]);
  const [nextId, setNextId] = useState(3);

  const addPlayer = () => {
    setPlayers([...players, { id: nextId, url: '' }]);
    setNextId(nextId + 1);
  };

  const removePlayer = (id) => {
    setPlayers(players.filter(p => p.id !== id));
  };

  return (
    <div className="app-container">
      <div className="top-bar">
        <h1>
          <MonitorPlay size={28} color="#60a5fa" />
          Multi-YouTube Nexus
        </h1>
        <div className="controls-bar">
          <button className="btn" onClick={addPlayer}>
            <Plus size={18} />
            New Window
          </button>
        </div>
      </div>

      <div className="desktop-canvas">
        {players.map((player) => (
          <YoutubePlayer 
            key={player.id} 
            id={player.id} 
            initialUrl={player.url} 
            onRemove={() => removePlayer(player.id)} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;
