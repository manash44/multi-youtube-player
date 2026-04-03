import React from 'react';
import { YoutubePlayer } from './YoutubePlayer';

export function PlayerGrid({ players, onRemovePlayer }) {
  return (
    <div className="player-grid" data-count={players.length}>
      {players.map((player) => (
        <YoutubePlayer 
          key={player.id} 
          id={player.id} 
          initialUrl={player.url} 
          onRemove={() => onRemovePlayer(player.id)} 
        />
      ))}
    </div>
  );
}
