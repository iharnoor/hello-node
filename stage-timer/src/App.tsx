import React, { useState, useEffect, useCallback, useRef, createContext, useContext } from 'react'
import { Play, Pause, Square, RotateCcw, Settings, Maximize, Volume2, Clock, Timer as TimerIcon, StopCircle, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'
import './App.css'

type TimerType = 'countdown' | 'countup' | 'clock'

interface TimerConfig {
  id: string
  type: TimerType
  name: string
  duration: number
  showHundredths: boolean
  audioEnabled: boolean
  audioVolume: number
}

interface TimerContextType {
  timers: TimerConfig[]
  updateTimer: (config: TimerConfig) => void
  activeTimerId: string
  setActiveTimerId: (id: string) => void
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const TimerContext = createContext<TimerContextType | null>(null)

const useTimerContext = () => {
  const context = useContext(TimerContext)
  if (!context) {
    throw new Error('useTimerContext must be used within TimerProvider')
  }
  return context
}

const useTimer = (initialTime: number = 0) => {
  const [time, setTime] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(false)
  const startTimeRef = useRef<number>(0)
  const pausedTimeRef = useRef<number>(0)
  const animationFrameRef = useRef<number>()

  const updateTime = useCallback(() => {
    if (isRunning) {
      const now = performance.now()
      const elapsed = now - startTimeRef.current + pausedTimeRef.current
      setTime(elapsed)
      animationFrameRef.current = requestAnimationFrame(updateTime)
    }
  }, [isRunning])

  const start = useCallback(() => {
    if (!isRunning) {
      startTimeRef.current = performance.now()
      setIsRunning(true)
    }
  }, [isRunning])

  const pause = useCallback(() => {
    if (isRunning) {
      pausedTimeRef.current = time
      setIsRunning(false)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isRunning, time])

  const reset = useCallback(() => {
    setIsRunning(false)
    setTime(initialTime)
    pausedTimeRef.current = 0
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [initialTime])

  const stop = useCallback(() => {
    setIsRunning(false)
    setTime(0)
    pausedTimeRef.current = 0
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  useEffect(() => {
    if (isRunning) {
      animationFrameRef.current = requestAnimationFrame(updateTime)
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isRunning, updateTime])

  return { time, isRunning, start, pause, reset, stop }
}

const formatTime = (milliseconds: number, showHundredths: boolean = false): string => {
  const totalSeconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const hundredths = Math.floor((milliseconds % 1000) / 10)

  const mm = minutes.toString().padStart(2, '0')
  const ss = seconds.toString().padStart(2, '0')
  
  if (showHundredths) {
    const hh = hundredths.toString().padStart(2, '0')
    return `${mm}:${ss}.${hh}`
  }
  
  return `${mm}:${ss}`
}

const getCurrentTimeOfDay = (): string => {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  const seconds = now.getSeconds().toString().padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}

const createAudioContext = () => {
  if (typeof window !== 'undefined' && 'AudioContext' in window) {
    return new AudioContext()
  }
  return null
}

const Timer: React.FC<{ config: TimerConfig }> = ({ config }) => {
  const { updateTimer, isDarkMode, toggleDarkMode } = useTimerContext()
  const { time, isRunning, start, pause, reset, stop } = useTimer()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [clockTime, setClockTime] = useState(getCurrentTimeOfDay())
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [durationMinutes, setDurationMinutes] = useState(Math.floor(config.duration / 60000))
  const [durationSeconds, setDurationSeconds] = useState(Math.floor((config.duration % 60000) / 1000))
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    if (config.type === 'clock') {
      const interval = setInterval(() => {
        setClockTime(getCurrentTimeOfDay())
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [config.type])

  useEffect(() => {
    audioContextRef.current = createAudioContext()
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  const playNotification = useCallback(() => {
    if (config.audioEnabled && audioContextRef.current) {
      const oscillator = audioContextRef.current.createOscillator()
      const gainNode = audioContextRef.current.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContextRef.current.destination)
      
      oscillator.frequency.setValueAtTime(800, audioContextRef.current.currentTime)
      gainNode.gain.setValueAtTime(config.audioVolume * 0.3, audioContextRef.current.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.5)
      
      oscillator.start(audioContextRef.current.currentTime)
      oscillator.stop(audioContextRef.current.currentTime + 0.5)
    }
  }, [config.audioEnabled, config.audioVolume])

  useEffect(() => {
    if (config.type === 'countdown' && time >= config.duration && isRunning) {
      stop()
      playNotification()
    }
  }, [config.type, config.duration, time, isRunning, stop, playNotification])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return
      
      switch (event.code) {
        case 'Space':
          event.preventDefault()
          if (isRunning) {
            pause()
          } else {
            start()
          }
          break
        case 'KeyR':
          event.preventDefault()
          reset()
          break
        case 'Escape':
          event.preventDefault()
          if (isFullscreen) {
            document.exitFullscreen()
          } else {
            stop()
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isRunning, start, pause, reset, stop, isFullscreen])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const getDisplayTime = (): string => {
    switch (config.type) {
      case 'countdown':
        const remaining = Math.max(0, config.duration - time)
        return formatTime(remaining, config.showHundredths)
      case 'countup':
        return formatTime(time, config.showHundredths)
      case 'clock':
        return clockTime
      default:
        return '00:00'
    }
  }

  const getProgress = (): number => {
    if (config.type === 'countdown' && config.duration > 0) {
      return Math.min(100, (time / config.duration) * 100)
    }
    return 0
  }

  const handleDurationChange = () => {
    const newDuration = (durationMinutes * 60 + durationSeconds) * 1000
    updateTimer({ ...config, duration: newDuration })
  }

  const displayTime = getDisplayTime()
  const isCountdownComplete = config.type === 'countdown' && time >= config.duration
  const progress = getProgress()

  return (
    <Card className={`w-full ${isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none bg-black text-white' : ''}`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className={`flex items-center gap-2 ${isFullscreen ? 'text-2xl' : 'text-lg'}`}>
          {config.type === 'countdown' && <TimerIcon className="h-5 w-5" />}
          {config.type === 'countup' && <StopCircle className="h-5 w-5" />}
          {config.type === 'clock' && <Clock className="h-5 w-5" />}
          {config.name}
        </CardTitle>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleDarkMode}
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="relative"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="sr-only">{isDarkMode ? "Switch to light mode" : "Switch to dark mode"}</span>
          </Button>
          <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Timer Settings</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                {config.type === 'countdown' && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Duration</label>
                    <div className="flex gap-2 items-center">
                      <Input
                        type="number"
                        min="0"
                        max="59"
                        value={durationMinutes}
                        onChange={(e) => setDurationMinutes(parseInt(e.target.value) || 0)}
                        className="w-20"
                      />
                      <span>min</span>
                      <Input
                        type="number"
                        min="0"
                        max="59"
                        value={durationSeconds}
                        onChange={(e) => setDurationSeconds(parseInt(e.target.value) || 0)}
                        className="w-20"
                      />
                      <span>sec</span>
                      <Button onClick={handleDurationChange} size="sm">
                        Update
                      </Button>
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Show Hundredths</label>
                  <Switch
                    checked={config.showHundredths}
                    onCheckedChange={(checked) =>
                      updateTimer({ ...config, showHundredths: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Audio Notifications</label>
                  <Switch
                    checked={config.audioEnabled}
                    onCheckedChange={(checked) =>
                      updateTimer({ ...config, audioEnabled: checked })
                    }
                  />
                </div>
                {config.audioEnabled && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Volume2 className="h-4 w-4" />
                      Volume
                    </label>
                    <Slider
                      value={[config.audioVolume]}
                      onValueChange={([value]) =>
                        updateTimer({ ...config, audioVolume: value })
                      }
                      max={1}
                      min={0}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" size="icon" onClick={toggleFullscreen}>
            <Maximize className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className={`text-center ${isFullscreen ? 'flex-1 flex flex-col justify-center' : ''}`}>
        <div className={`font-mono font-bold ${isFullscreen ? 'text-9xl' : 'text-6xl'} ${
          isCountdownComplete ? 'text-red-500 animate-pulse' : isFullscreen ? 'text-white' : 'text-foreground'
        }`}>
          {displayTime}
        </div>
        
        {config.type === 'countdown' && !isFullscreen && (
          <div className="mt-4">
            <Progress value={progress} className="w-full h-2" />
          </div>
        )}
        
        {!isFullscreen && (
          <div className="flex justify-center gap-4 mt-8">
            <Button
              onClick={isRunning ? pause : start}
              size="lg"
              disabled={config.type === 'clock'}
              className="min-w-24"
            >
              {isRunning ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
              {isRunning ? 'Pause' : 'Start'}
            </Button>
            <Button onClick={reset} variant="outline" size="lg" disabled={config.type === 'clock'}>
              <RotateCcw className="h-5 w-5 mr-2" />
              Reset
            </Button>
            <Button onClick={stop} variant="outline" size="lg" disabled={config.type === 'clock'}>
              <Square className="h-5 w-5 mr-2" />
              Stop
            </Button>
          </div>
        )}
        
        {!isFullscreen && (
          <div className="mt-6 text-sm text-muted-foreground space-y-1">
            <p><kbd className="px-2 py-1 bg-muted rounded text-xs">Space</kbd> Start/Pause</p>
            <p><kbd className="px-2 py-1 bg-muted rounded text-xs">R</kbd> Reset</p>
            <p><kbd className="px-2 py-1 bg-muted rounded text-xs">ESC</kbd> Stop</p>
          </div>
        )}

        {isFullscreen && (
          <div className="mt-8 text-white/70 text-lg">
            Press <kbd className="px-3 py-1 bg-white/20 rounded">ESC</kbd> to exit fullscreen
          </div>
        )}
      </CardContent>
    </Card>
  )
}

const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [timers, setTimers] = useState<TimerConfig[]>([
    {
      id: 'countdown-1',
      type: 'countdown',
      name: 'Countdown Timer',
      duration: 5 * 60 * 1000,
      showHundredths: false,
      audioEnabled: true,
      audioVolume: 0.7,
    },
    {
      id: 'countup-1',
      type: 'countup',
      name: 'Countup Timer',
      duration: 0,
      showHundredths: false,
      audioEnabled: true,
      audioVolume: 0.7,
    },
    {
      id: 'clock-1',
      type: 'clock',
      name: 'Time of Day',
      duration: 0,
      showHundredths: false,
      audioEnabled: false,
      audioVolume: 0.7,
    },
  ])

  const [activeTimerId, setActiveTimerId] = useState(timers[0].id)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('stage-timer-dark-mode')
    const initialDarkMode = savedDarkMode !== null ? JSON.parse(savedDarkMode) : false
    
    if (initialDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    return initialDarkMode
  })

  useEffect(() => {
    const savedTimers = localStorage.getItem('stage-timer-configs')
    if (savedTimers) {
      try {
        const parsed = JSON.parse(savedTimers)
        setTimers(parsed)
      } catch (error) {
        console.error('Failed to load timer configurations:', error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('stage-timer-configs', JSON.stringify(timers))
  }, [timers])

  useEffect(() => {
    localStorage.setItem('stage-timer-dark-mode', JSON.stringify(isDarkMode))
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const updateTimer = useCallback((updatedConfig: TimerConfig) => {
    setTimers(prev => prev.map(timer => 
      timer.id === updatedConfig.id ? updatedConfig : timer
    ))
  }, [])

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev: boolean) => !prev)
  }, [])

  return (
    <TimerContext.Provider value={{ timers, updateTimer, activeTimerId, setActiveTimerId, isDarkMode, toggleDarkMode }}>
      {children}
    </TimerContext.Provider>
  )
}

function App() {
  return (
    <TimerProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Stage Timer
            </h1>
            <p className="text-xl text-muted-foreground">
              Professional timing solution for presentations and events
            </p>
          </header>

          <TimerTabs />

          <footer className="text-center mt-12 text-sm text-muted-foreground">
            <p>Built with React, TypeScript, and Tailwind CSS • PWA Ready</p>
          </footer>
        </div>
      </div>
    </TimerProvider>
  )
}

const TimerTabs: React.FC = () => {
  const { timers, activeTimerId, setActiveTimerId } = useTimerContext()

  return (
    <Tabs value={activeTimerId} onValueChange={setActiveTimerId} className="w-full max-w-4xl mx-auto">
      <TabsList className="grid w-full grid-cols-3 mb-8">
        {timers.map(timer => (
          <TabsTrigger key={timer.id} value={timer.id} className="flex items-center gap-2">
            {timer.type === 'countdown' && <TimerIcon className="h-4 w-4" />}
            {timer.type === 'countup' && <StopCircle className="h-4 w-4" />}
            {timer.type === 'clock' && <Clock className="h-4 w-4" />}
            {timer.name}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {timers.map(timer => (
        <TabsContent key={timer.id} value={timer.id}>
          <Timer config={timer} />
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default App
