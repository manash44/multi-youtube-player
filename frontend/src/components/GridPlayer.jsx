import React, { useState } from 'react';
import YouTube from 'react-youtube';
import { Trash2, Play, Pause, Volume2, VolumeX, PlaySquare, Link } from 'lucide-react';

export function GridPlayer({ id, slotIndex, initialUrl, onRemove, totalCount }) {
  const [url, setUrl] = useState(initialUrl);
  const [inputUrl, setInputUrl] = useState(initialUrl);

  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [showInput, setShowInput] = useState(!initialUrl);

  const extractYoutubeId = (urlStr) => {
    if (!urlStr) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = urlStr.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleLoad = (e) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      setUrl(inputUrl.trim());
      setPlayer(null);
      setShowInput(false);
    }
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

  const handlePlayPause = () => {
    if (!player) return;
    if (isPlaying) player.pauseVideo();
    else player.playVideo();
  };

  const handleVolumeChange = (e) => {
    const newVol = parseInt(e.target.value, 10);
    setVolume(newVol);
    if (player) {
      player.setVolume(newVol);
      if (newVol > 0 && isMuted) { setIsMuted(false); player.unMute(); }
      else if (newVol === 0 && !isMuted) { setIsMuted(true); player.mute(); }
    }
  };

  const toggleMute = () => {
    if (!player) return;
    if (isMuted) { player.unMute(); setIsMuted(false); if (volume === 0) setVolume(50); }
    else { player.mute(); setIsMuted(true); }
  };

  const videoId = extractYoutubeId(url);
  // Compact mode for 4-5 windows
  const isCompact = totalCount >= 4;

  return (
    <div className={`grid-player slot-${slotIndex} count-${totalCount}`}>
      {/* Header */}
      <div className="gp-header">
        <div className="gp-title">
          <PlaySquare size={14} style={{ color: 'var(--accent)' }} />
          <span>Window {id}</span>
        </div>
        <div className="gp-actions">
          <button
            className="gp-icon-btn"
            onClick={() => setShowInput(!showInput)}
            title="Change URL"
          >
            <Link size={13} />
          </button>
          <button className="gp-icon-btn danger" onClick={onRemove} title="Remove">
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Video Area */}
      <div className="gp-video-area">
        {videoId && !showInput ? (
          <YouTube
            videoId={videoId}
            opts={{
              width: '100%',
              height: '100%',
              playerVars: { autoplay: 1, controls: 1, disablekb: 0 },
            }}
            onReady={onReady}
            onStateChange={onStateChange}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            iframeClassName="youtube-iframe"
          />
        ) : (
          <div className="gp-placeholder">
            <form className="gp-url-form" onSubmit={handleLoad}>
              <PlaySquare size={isCompact ? 24 : 36} style={{ color: 'var(--accent)', opacity: 0.6, marginBottom: '0.5rem' }} />
              {!isCompact && (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.75rem', textAlign: 'center' }}>
                  {url && !videoId ? 'Invalid URL — try again' : 'Paste a YouTube URL to start'}
                </p>
              )}
              <div className="gp-url-row">
                <input
                  type="text"
                  className="url-input"
                  placeholder="YouTube URL..."
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  autoFocus
                />
                <button type="submit" className="btn" style={{ padding: '0.4rem 0.7rem', gap: '0.2rem', fontSize: '0.8rem' }}>
                  <Link size={13} /> Load
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Controls */}
      {videoId && !showInput && (
        <div className="gp-controls">
          <button type="button" onClick={handlePlayPause} className="gp-ctrl-btn" title={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}
          </button>
          <button type="button" onClick={toggleMute} className="gp-ctrl-btn" title={isMuted ? 'Unmute' : 'Mute'}>
            {isMuted || volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
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
    </div>
  );
}
