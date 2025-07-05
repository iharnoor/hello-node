# 🎯 Stage Timer - Professional Timing Solution

A complete stage timer web application similar to StageTimer.io, built with React TypeScript and Tailwind CSS. Perfect for presentations, events, and professional timing needs.

![Stage Timer Dark Mode](https://app.devin.ai/attachments/880f4163-ebc3-42be-b195-4f567f4e5550/localhost_5173_161318.png)

## 🎨 Theme Showcase

### Dark Theme (Perfect for Low-Light Environments)
![Dark Mode Countdown Timer](/home/ubuntu/screenshots/localhost_5173_164910.png)

### Light Theme (Ideal for Bright Presentations)
![Light Mode Time Display](/home/ubuntu/screenshots/localhost_5173_164947.png)

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

## 📖 Usage Examples & Visual Guide

### 🕐 Timer Types Comparison

#### Countdown Timer (Perfect for Timed Presentations)
Set a specific duration and watch it count down to zero with visual progress indication.

![Dark Mode Countdown Timer](/home/ubuntu/screenshots/localhost_5173_164910.png)

**Use Cases:**
- Conference presentations with strict time limits
- Workshop sessions and breakout activities
- Exam timing and test administration
- Meeting time management

#### Countup Timer (Ideal for Open-Ended Sessions)
Start from zero and count up indefinitely - perfect when you need to track elapsed time.

![Dark Mode Countup Timer](/home/ubuntu/screenshots/localhost_5173_164922.png)

**Use Cases:**
- Q&A sessions and open discussions
- Creative workshops and brainstorming
- Performance timing and rehearsals
- General time tracking

#### Time of Day Clock (Current Time Display)
Display the current time in a clean, readable format for audience reference.

![Dark Mode Time of Day](/home/ubuntu/screenshots/localhost_5173_164934.png)

**Use Cases:**
- Event schedules and time announcements
- Live streaming and broadcasts
- Conference room displays
- Public information screens

### 🎯 Step-by-Step Usage Guide

#### Setting Up a Countdown Timer
1. **Select Timer Type**: Click on "Countdown Timer" tab
2. **Configure Duration**: Click Settings ⚙️ to set your desired time (default: 5:00)
3. **Start Timer**: Press **Start** button or hit **Spacebar**
4. **Monitor Progress**: Watch the visual progress bar and time display
5. **Audio Alert**: Receive notification when timer reaches zero

#### Customizing Your Experience
Access the settings dialog to personalize your timer experience:

![Settings Dialog Light Mode](/home/ubuntu/screenshots/localhost_5173_165000.png)

**Available Options:**
- **Show Hundredths**: Toggle .XX precision for precise timing
- **Audio Notifications**: Enable/disable completion sound alerts
- **Theme Toggle**: Switch between dark and light modes instantly

### 🎨 Theme Switching in Action

**Dark Mode** - Perfect for low-light environments, stage presentations, and reducing eye strain:
![Dark Mode Interface](/home/ubuntu/screenshots/localhost_5173_164910.png)

**Light Mode** - Ideal for bright rooms, projector displays, and high-contrast needs:
![Light Mode Interface](/home/ubuntu/screenshots/localhost_5173_164947.png)

### 🚀 Real-World Scenarios

#### Conference Presentation Setup
```
1. Choose Countdown Timer (15:00 for keynote)
2. Enable Dark Mode for stage lighting
3. Use Fullscreen mode for clean display
4. Rely on Spacebar for hands-free control
```

#### Workshop Facilitation
```
1. Start with Countup Timer for introductions
2. Switch to Countdown for timed activities
3. Use Time of Day for schedule reference
4. Toggle audio alerts based on room size
```

#### Live Event Management
```
1. Set multiple countdown timers for segments
2. Use light mode for bright venue lighting
3. Enable hundredths for precise timing
4. Utilize keyboard shortcuts for quick control
```

## ⌨️ Keyboard Shortcuts & Controls

| Key | Action | Visual Indicator |
|-----|--------|------------------|
| **Space** | Start/Pause timer | ▶️ Play/⏸️ Pause button highlights |
| **R** | Reset timer to initial state | 🔄 Reset button highlights |
| **ESC** | Stop timer or exit fullscreen | ⏹️ Stop button highlights |

All shortcuts work globally and are optimized for presentation use. Visual feedback confirms each action.

### 🎮 Control Tips & Best Practices

#### For Presentations
- **Spacebar**: Most important control - practice using it without looking
- **ESC**: Quick exit from fullscreen when needed
- **R**: Reset between presentation segments

#### For Live Events
- **Pre-configure**: Set up timers before the event starts
- **Test Audio**: Verify notification sounds work in your environment
- **Backup Plan**: Know manual controls in case of technical issues

#### For Workshops
- **Visual Cues**: Use progress bars to show remaining time
- **Audio Alerts**: Enable for background timing during activities
- **Theme Choice**: Match room lighting conditions

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
