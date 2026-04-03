# Multi-YouTube Nexus 📺

An interactive, multi-window application built with React and Node.js that empowers you to spawn and manage up to 5 YouTube live streams or videos simultaneously. Move away from rigid grid constraints and step into a true virtual "desktop experience".

## 🌟 Key Features

* **Floating Desktop Interface:** Every active player exists inside a floating OS-style frame. Freely drag them across the browser canvas or stretch and resize them to perfectly fit your viewing preference!
* **Native YouTube Integrations:** Powered by the official YouTube IFrame API to guarantee lightning-fast performance, zero fallback crashes, and built-in live stream detection.
* **Intelligent Auto-Play:** The moment you load a fresh YouTube URL, the player catches the video ID and auto-starts playback immediately without requiring secondary clicks.
* **Custom Volume & Playback Overrides:** Direct programmatic control layers applied externally to each video iframe to override the volume and track muting natively without interrupting your focus.
* **Glassmorphic Aesthetics:** Outfitted entirely with custom Vanilla CSS running sleek frosted glass UI containers set onto an animated, constantly shifting dark gradient desktop canvas.

## 🛠 Tech Stack

**Frontend:**
- React 19 (via Vite)
- `react-rnd` (Handles the rigorous boundaries, dragging computations, and scaling)
- `react-youtube` (Mounts and controls the official YouTube internal APIs)
- `lucide-react` (Crisp native SVG iconography)

**Backend:**
- Node.js & Express.js (Foundation established for persistent multi-session layout tracking via an API.)

## 🚀 Quick Start Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/manash44/multi-youtube-player.git
   cd multi-youtube-player
   ```

2. **Boot the Backend Server:**
   ```bash
   cd backend
   npm install
   node server.js
   ```
   *The server runs locally on `http://localhost:5000`*

3. **Boot the Frontend Client:**
   Open a new terminal window:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *The client runs instantly on `http://localhost:5173`*

## 🎨 Layout Constraints

For maximum UI fluidity and browser memory limits, the platform hard-caps the layout strictly up to **5 simultaneous active instances**. Each window protects its URL bounds so its input is never clipped underneath an iframe regardless of how severely you compress the frame size!
