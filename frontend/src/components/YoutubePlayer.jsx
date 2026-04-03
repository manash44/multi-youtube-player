import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import YouTube from 'react-youtube';
import { Trash2, Play, Pause, Volume2, VolumeX, PlaySquare, Link } from 'lucide-react';

export function YoutubePlayer({ id, initialUrl, onRemove }) {
  const [url, setUrl] = useState(initialUrl);
  const [inputUrl, setInputUrl] = useState(initialUrl);
  
  // Custom Controls State
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);

  const extractYoutubeId = (urlStr) => {
    if (!urlStr) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = urlStr.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleLoad = (e) => {
    e.preventDefault();
    setUrl(inputUrl);
    setPlayer(null); // Reset player instance for new video
  };

  const onReady = (event) => {
    setPlayer(event.target);
    event.target.setVolume(volume);
    if (isMuted) event.target.mute();
    event.target.playVideo();
  };

  const onStateChange = (event) => {
    if (event.data === 1) setIsPlaying(true);
    else if (event.data === 2) setIsPlaying(false);
  };

  const handlePlayPause = (e) => {
    e.stopPropagation();
    if (!player) return;
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  const handleVolumeChange = (e) => {
    e.stopPropagation();
    const newVol = parseInt(e.target.value, 10);
    setVolume(newVol);
    if (player) {
      player.setVolume(newVol);
      if (newVol > 0 && isMuted) {
        setIsMuted(false);
        player.unMute();
      } else if (newVol === 0 && !isMuted) {
        setIsMuted(true);
        player.mute();
      }
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!player) return;
    if (isMuted) {
      player.unMute();
      setIsMuted(false);
      if (volume === 0) setVolume(50); // Restore a bit of volume if it was 0
    } else {
      player.mute();
      setIsMuted(true);
    }
  };

  const videoId = extractYoutubeId(url);

  return (
    <Rnd
      default={{
        x: (id * 40) % 400,
        y: (id * 40) % 400,
        width: 500,
        height: 420,
      }}
      minWidth={320}
      minHeight={280}
      bounds="parent"
      dragHandleClassName="window-header"
      className="rnd-window"
    >
      <div className="window-header">
        <div className="window-title">
          <PlaySquare size={16} style={{ color: 'var(--accent)' }} />
          <span>Window {id}</span>
        </div>
        <div className="window-actions">
          <button onClick={onRemove} title="Close Window" onMouseDown={(e) => e.stopPropagation()}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <div className="window-content">
        <div className="video-area">
          {videoId ? (
            <YouTube 
              videoId={videoId} 
              opts={{
                width: '100%',
                height: '100%',
                playerVars: { 
                  autoplay: 1, 
                  controls: 1, // Keep native controls for scrubbing timeline 
                  disablekb: 0 
                } 
              }}
              onReady={onReady}
              onStateChange={onStateChange}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              iframeClassName="youtube-iframe"
            />
          ) : (
            <div style={{ position: 'absolute', top:0, left:0, width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,0.5)' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {url ? "Invalid YouTube URL" : "No video loaded"}
              </p>
            </div>
          )}
        </div>

        {/* Custom Application Controls (Volume & Play) */}
        {videoId && (
          <div className="custom-controls" onMouseDown={(e) => e.stopPropagation()} style={{
            display: 'flex', gap: '0.75rem', padding: '0.5rem 1rem', background: 'rgba(0,0,0,0.5)', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)'
          }}>
            <button type="button" onClick={handlePlayPause} className="btn" style={{ padding: '0.4rem', background: 'transparent' }} title={isPlaying ? "Pause" : "Play"}>
               {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
            </button>
            
            <button type="button" onClick={toggleMute} className="btn" style={{ padding: '0.4rem', background: 'transparent' }} title={isMuted ? "Unmute" : "Mute"}>
               {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            
            <input 
              type="range" 
              min="0" max="100" 
              value={isMuted ? 0 : volume} 
              onChange={handleVolumeChange}
              style={{ flex: 1, cursor: 'pointer', accentColor: 'var(--accent)' }}
            />
          </div>
        )}

        <form className="url-input-container" onSubmit={handleLoad} onMouseDown={(e) => e.stopPropagation()}>
          <input 
            type="text" 
            className="url-input" 
            placeholder="Paste YouTube URL here..." 
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
          />
          <button type="submit" className="btn" style={{ padding: '0.4rem 0.8rem', gap: '0.25rem' }} title="Load New Video">
            <Link size={14} />
            Load
          </button>
        </form>
      </div>
    </Rnd>
  );
}
