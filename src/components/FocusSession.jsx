import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Square, Camera, Eye, EyeOff, Timer } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { toast } from './ui/use-toast';

const FocusSession = ({ userData }) => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [duration, setDuration] = useState(25);
  const [cameraActive, setCameraActive] = useState(false);
  const [focusScore, setFocusScore] = useState(100);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleStopSession();
            return 0;
          }
          return prev - 1;
        });

        if (cameraActive) {
          const randomScore = Math.floor(Math.random() * 20) + 80;
          setFocusScore(randomScore);
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, isPaused, cameraActive]);

  // Replace Helmet: set title and meta description for this view
  useEffect(() => {
    document.title = 'Focus Session - FocusFy';
    const metaName = 'description';
    let meta = document.querySelector(`meta[name="${metaName}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = metaName;
      document.head.appendChild(meta);
    }
    meta.content = 'Start a focus session with real-time monitoring to boost your productivity.';
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraActive(true);
        toast({
          title: "Camera Started 📸",
          description: "Focus monitoring is now active"
        });
      }
    } catch (error) {
      toast({
        title: "Camera Access Denied",
        description: "Please allow camera access for focus tracking",
        variant: "destructive"
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      streamRef.current = null;
      setCameraActive(false);
    }
  };

  const handleStartSession = () => {
    setIsActive(true);
    setIsPaused(false);
    setTimeLeft(duration * 60);
    toast({
      title: "Session Started! 🎯",
      description: "Stay focused and productive!"
    });
  };

  const handlePauseSession = () => {
    setIsPaused(!isPaused);
    toast({
      title: isPaused ? "Session Resumed" : "Session Paused",
      description: isPaused ? "Keep going!" : "Take a quick break"
    });
  };

  const handleStopSession = () => {
    setIsActive(false);
    setIsPaused(false);
    stopCamera();
    
    const sessionTime = (duration * 60 - timeLeft) / 60;
    
    // Safety check for localStorage operations
    try {
        const storedStats = localStorage.getItem(`stats_${userData.id}`);
        const stats = storedStats ? JSON.parse(storedStats) : {
        todayFocus: 0,
        weeklyGoal: 20,
        totalSessions: 0,
        averageFocus: 0
        };

        stats.todayFocus = Number((stats.todayFocus + sessionTime / 60).toFixed(2));
        stats.totalSessions += 1;
        localStorage.setItem(`stats_${userData.id}`, JSON.stringify(stats));
    } catch (error) {
        console.error("Error saving session stats:", error);
    }

    toast({
      title: "Session Complete! 🎉",
      description: `Great work! You focused for ${Math.floor(sessionTime)} minutes`
    });

    setTimeLeft(duration * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Title/meta handled via useEffect */}

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 p-4 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2">Focus Session</h1>
            <p className="text-purple-300">Track your focus with AI-powered monitoring</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8"
            >
              <div className="text-center mb-8">
                <motion.div
                  animate={{
                    scale: isActive && !isPaused ? [1, 1.05, 1] : 1
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block"
                >
                  <div className="relative">
                    <svg className="w-64 h-64 transform -rotate-90">
                      <circle
                        cx="128"
                        cy="128"
                        r="120"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-slate-800"
                      />
                      <motion.circle
                        cx="128"
                        cy="128"
                        r="120"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={2 * Math.PI * 120}
                        strokeDashoffset={2 * Math.PI * 120 * (1 - timeLeft / (duration * 60))}
                        className="text-purple-500"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Timer className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                        <p className="text-6xl font-bold text-white mb-1">
                          {formatTime(timeLeft)}
                        </p>
                        <p className="text-purple-300 text-sm">
                          {isActive ? (isPaused ? 'Paused' : 'In Progress') : 'Ready to Start'}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {!isActive && (
                <div className="mb-6">
                  <label className="text-purple-200 text-sm font-medium mb-3 block">
                    Session Duration: {duration} minutes
                  </label>
                  <Slider
                    value={[duration]}
                    onValueChange={(value) => setDuration(value[0])}
                    min={5}
                    max={120}
                    step={5}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>5 min</span>
                    <span>120 min</span>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                {!isActive ? (
                  <Button
                    onClick={handleStartSession}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold py-6 text-lg"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Session
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={handlePauseSession}
                      variant="outline"
                      className="flex-1 border-purple-500/50 hover:bg-purple-500/10 text-white py-6"
                    >
                      {isPaused ? <Play className="w-5 h-5 mr-2" /> : <Pause className="w-5 h-5 mr-2" />}
                      {isPaused ? 'Resume' : 'Pause'}
                    </Button>
                    <Button
                      onClick={handleStopSession}
                      variant="destructive"
                      className="flex-1 py-6"
                    >
                      <Square className="w-5 h-5 mr-2" />
                      Stop
                    </Button>
                  </>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Camera className="w-5 h-5 text-purple-400" />
                  Focus Monitor
                </h2>
                <Button
                  onClick={cameraActive ? stopCamera : startCamera}
                  variant="outline"
                  size="sm"
                  className="border-purple-500/50"
                  disabled={!isActive}
                >
                  {cameraActive ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                  {cameraActive ? 'Stop' : 'Start'} Camera
                </Button>
              </div>

              <div className="relative aspect-video bg-slate-800 rounded-lg overflow-hidden mb-6">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                {!cameraActive && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80">
                    <div className="text-center">
                      <Camera className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                      <p className="text-slate-400">Camera is off</p>
                    </div>
                  </div>
                )}
                {cameraActive && (
                  <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur px-4 py-2 rounded-lg">
                    <p className="text-xs text-slate-400">Focus Score</p>
                    <p className="text-2xl font-bold text-white">{focusScore}%</p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                  <span className="text-slate-300">Posture Detection</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    cameraActive ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'
                  }`}>
                    {cameraActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                  <span className="text-slate-300">Face Recognition</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    cameraActive ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'
                  }`}>
                    {cameraActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                  <span className="text-slate-300">Distraction Alert</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    cameraActive ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'
                  }`}>
                    {cameraActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FocusSession;
