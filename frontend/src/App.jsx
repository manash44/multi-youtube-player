import React, { useState } from 'react';
import { YoutubePlayer } from './components/YoutubePlayer';
import { GridPlayer } from './components/GridPlayer';
import { Plus, MonitorPlay, LayoutGrid, Move, Minus } from 'lucide-react';
import './index.css';

function App() {
  const [mode, setMode] = useState('free'); // 'free' | 'auto'

  // Free mode state
  const [freePlayers, setFreePlayers] = useState([
    { id: 1, url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ' },
    { id: 2, url: '' },
  ]);
  const [nextFreeId, setNextFreeId] = useState(3);

  // Auto-layout mode state (2–10 windows)
  const [autoPlayers, setAutoPlayers] = useState([
    { id: 101, url: '' },
    { id: 102, url: '' },
  ]);
  const [nextAutoId, setNextAutoId] = useState(103);

  /* ─── Free mode actions ─── */
  const addFreePlayer = () => {
    setFreePlayers([...freePlayers, { id: nextFreeId, url: '' }]);
    setNextFreeId(nextFreeId + 1);
  };
  const removeFreePlayer = (id) => setFreePlayers(freePlayers.filter(p => p.id !== id));

  /* ─── Auto-layout mode actions ─── */
  const addAutoPlayer = () => {
    if (autoPlayers.length >= 10) return;
    setAutoPlayers([...autoPlayers, { id: nextAutoId, url: '' }]);
    setNextAutoId(nextAutoId + 1);
  };
  const removeAutoPlayer = (id) => {
    if (autoPlayers.length <= 2) return; // min 2
    setAutoPlayers(autoPlayers.filter(p => p.id !== id));
  };

  /* ─── Grid layout class for 2-10 windows ─── */
  const gridClass = `auto-grid count-${autoPlayers.length}`;

  const layoutHints = {
    2:  '⬛⬛ Side by Side',
    3:  '⬛⬛⬜ 2 + 1 Featured',
    4:  '⬛⬛⬛⬛ 2 × 2 Grid',
    5:  '⬛⬛⬛ 3 + 2 Layout',
    6:  '⬛⬛⬛ 3 × 2 Grid',
    7:  '⬛⬛⬛⬛ 4 + 3 Layout',
    8:  '⬛⬛⬛⬛ 4 × 2 Grid',
    9:  '⬛⬛⬛ 3 × 3 Grid',
    10: '⬛⬛⬛⬛⬛ 5 × 2 Grid',
  };

  return (
    <div className="app-container">
      {/* ── Top Bar ── */}
      <div className="top-bar">
        <h1>
          <MonitorPlay size={28} color="#60a5fa" />
          Multi-YouTube Nexus
        </h1>

        <div className="controls-bar">
          {/* Mode Toggle */}
          <div className="mode-toggle">
            <button
              id="btn-free-mode"
              className={`mode-btn ${mode === 'free' ? 'active' : ''}`}
              onClick={() => setMode('free')}
              title="Free Mode — draggable windows"
            >
              <Move size={16} />
              Free Mode
            </button>
            <button
              id="btn-auto-mode"
              className={`mode-btn ${mode === 'auto' ? 'active' : ''}`}
              onClick={() => setMode('auto')}
              title="Auto-Layout Mode — smart grid (2–10 windows)"
            >
              <LayoutGrid size={16} />
              Auto-Layout
            </button>
          </div>

          {/* Action Buttons */}
          {mode === 'free' ? (
            <button id="btn-add-free" className="btn" onClick={addFreePlayer}>
              <Plus size={18} /> New Window
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span className="window-count-badge">{autoPlayers.length} / 10</span>
              <button
                id="btn-remove-auto"
                className="btn btn-danger"
                onClick={() => removeAutoPlayer(autoPlayers[autoPlayers.length - 1].id)}
                disabled={autoPlayers.length <= 2}
                title="Remove last window"
              >
                <Minus size={18} />
              </button>
              <button
                id="btn-add-auto"
                className="btn"
                onClick={addAutoPlayer}
                disabled={autoPlayers.length >= 10}
                title="Add a window (max 10)"
              >
                <Plus size={18} /> Add Window
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Canvas ── */}
      {mode === 'free' ? (
        <div className="desktop-canvas">
          {freePlayers.map((player) => (
            <YoutubePlayer
              key={player.id}
              id={player.id}
              initialUrl={player.url}
              onRemove={() => removeFreePlayer(player.id)}
            />
          ))}
        </div>
      ) : (
        <div className="auto-canvas">
          <div className={gridClass}>
            {autoPlayers.map((player, index) => (
              <GridPlayer
                key={player.id}
                id={player.id}
                slotIndex={index}
                initialUrl={player.url}
                totalCount={autoPlayers.length}
                onRemove={() => removeAutoPlayer(player.id)}
              />
            ))}
          </div>
          {/* Layout hint pill */}
          <div className="layout-hint">
            {layoutHints[autoPlayers.length]}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
