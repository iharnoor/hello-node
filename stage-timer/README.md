# 🎯 Stage Timer - Professional Timing Solution

A complete stage timer web application similar to StageTimer.io, built with React TypeScript and Tailwind CSS. Perfect for presentations, events, and professional timing needs.

![Stage Timer Screenshot](https://app.devin.ai/attachments/880f4163-ebc3-42be-b195-4f567f4e5550/localhost_5173_161318.png)

## ✨ Features

### 🕐 Multiple Timer Types
- **Countdown Timer**: Set duration and count down to zero with visual progress
- **Countup Timer**: Start from zero and count up indefinitely  
- **Time of Day Clock**: Display current time in MM:SS format

### ⚡ Precision & Control
- **MM:SS Format**: Clear, readable time display optimized for presentations
- **Optional Hundredths**: Toggle .XX precision for precise timing needs
- **Real-time Updates**: Smooth, accurate timing using Performance API
- **Keyboard Shortcuts**: Professional controls without mouse interaction

### 🎨 Professional Interface
- **Clean Design**: Minimalist interface optimized for stage presentations
- **Dark/Light Theme**: Toggle between themes with accessibility support
- **Fullscreen Mode**: Distraction-free presentation view
- **Responsive Layout**: Works on desktop, tablet, and mobile devices

### 🔊 Audio & Accessibility  
- **Audio Notifications**: Customizable sound alerts when timers complete
- **Volume Control**: Adjustable notification volume
- **Color Blind Support**: High contrast themes and non-color-dependent indicators
- **Screen Reader Support**: Full accessibility with ARIA labels

### 💾 Smart Persistence
- **Local Storage**: Automatically saves timer configurations and preferences
- **PWA Ready**: Install as app with offline functionality
- **Settings Sync**: Theme and audio preferences persist across sessions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/iharnoor/hello-node.git
cd hello-node/stage-timer

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📖 Usage Examples

### Basic Countdown Timer
1. Select "Countdown Timer" tab
2. Click Settings ⚙️ to set duration (default: 5:00)
3. Press **Start** or **Spacebar** to begin
4. Timer counts down with visual progress bar
5. Audio notification plays when complete

![Countdown Timer](https://app.devin.ai/attachments/f3fba315-3156-44f8-bbb8-af01ad24e8e3/localhost_5173_161413.png)

### Presentation Timing
1. Switch to "Countup Timer" for open-ended presentations
2. Enable fullscreen mode 🔲 for clean display
3. Use keyboard shortcuts for hands-free control
4. Toggle hundredths precision for precise timing

![Countup Timer](https://app.devin.ai/attachments/3cd8e2d6-4ab5-467f-a032-8f84e4c01397/localhost_5173_161350.png)

### Settings & Customization
- **Show Hundredths**: Toggle .XX precision display
- **Audio Notifications**: Enable/disable completion sounds  
- **Volume Control**: Adjust notification volume
- **Dark Theme**: Switch themes for different environments

![Settings Dialog](https://app.devin.ai/attachments/2c7ac3d2-8650-415c-b31f-3de6e18ef075/localhost_5173_161425.png)

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **Space** | Start/Pause timer |
| **R** | Reset timer to initial state |
| **ESC** | Stop timer or exit fullscreen |

All shortcuts work globally and are optimized for presentation use.

## 🎨 Accessibility Features

### Color Blind Support
- High contrast color schemes in both light and dark themes
- Visual indicators beyond color (icons, progress bars, text states)
- Clear button states and hover effects
- Consistent visual hierarchy

### Screen Reader Support
- Semantic HTML structure with proper headings
- ARIA labels for all interactive elements
- Screen reader announcements for timer state changes
- Keyboard navigation support

### Visual Accessibility
- Large, readable fonts optimized for distance viewing
- High contrast ratios meeting WCAG guidelines
- Clear focus indicators for keyboard navigation
- Scalable interface that works at different zoom levels

## 🛠️ Technical Details

### Built With
- **React 18** - Modern React with hooks and context
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool and dev server
- **shadcn/ui** - High-quality component library
- **Lucide Icons** - Beautiful, consistent icons

### Architecture
- **Performance API**: High-precision timing using `performance.now()`
- **Web Audio API**: Programmatic sound generation for notifications
- **Service Worker**: PWA functionality and offline support
- **Local Storage**: Persistent settings and configurations
- **Context API**: Global state management for timers and theme

### Browser Support
- Chrome/Edge 88+
- Firefox 87+
- Safari 14+
- Mobile browsers with PWA support

## 📱 PWA Features

Install Stage Timer as a standalone app:

1. **Desktop**: Click install prompt in address bar
2. **Mobile**: Add to Home Screen from browser menu
3. **Offline**: Core timer functionality works without internet
4. **Updates**: Automatic updates when online

## 🔧 Development

### Project Structure
```
stage-timer/
├── src/
│   ├── components/ui/     # shadcn/ui components
│   ├── App.tsx           # Main application logic
│   ├── App.css           # Custom styles
│   └── main.tsx          # Entry point
├── public/
│   ├── manifest.json     # PWA manifest
│   └── sw.js            # Service worker
└── package.json
```

### Key Components
- **TimerProvider**: Global state management with React Context
- **Timer**: Individual timer component with controls and display
- **TimerTabs**: Tab interface for switching between timer types
- **Settings Dialog**: Configuration interface for customization

### Adding New Features
1. Follow existing TypeScript patterns
2. Use shadcn/ui components for consistency
3. Add proper accessibility attributes
4. Test across different browsers and devices
5. Update localStorage schema if needed

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [StageTimer.io](https://stagetimer.io)
- Built with [shadcn/ui](https://ui.shadcn.com) components
- Icons by [Lucide](https://lucide.dev)
- Developed by [Devin AI](https://devin.ai) for [@iharnoor](https://github.com/iharnoor)

---

**Perfect for**: Presentations • Conferences • Events • Workshops • Public Speaking • Time Management
