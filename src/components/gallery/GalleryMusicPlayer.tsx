import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Disc3 } from 'lucide-react';

interface MusicPlayerProps {
  trackTitle?: string;
  artist?: string;
  audioSrc?: string;
}

export const GalleryMusicPlayer: React.FC<MusicPlayerProps> = ({
  trackTitle = "Cinematic Romance — Trilha Instrumental Moderna",
  artist = "Piano & Cordas Cinematográficas Contemporâneas",
  audioSrc = "/audio/trilha-casamento.mp3"
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize once on mount with empty dependencies
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.55;

    // Direct event sync from native audio element
    const handleNativePlay = () => {
      setIsPlaying(true);
      window.dispatchEvent(new CustomEvent('gallery-audio-state-change', {
        detail: { isPlaying: true }
      }));
    };

    const handleNativePause = () => {
      setIsPlaying(false);
      window.dispatchEvent(new CustomEvent('gallery-audio-state-change', {
        detail: { isPlaying: false }
      }));
    };

    audio.addEventListener('play', handleNativePlay);
    audio.addEventListener('pause', handleNativePause);

    // Attempt auto-play smoothly
    audio.play().then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4500);
    }).catch(() => {
      // Browser blocked autoplay without user gesture: will play on first click/tap
    });

    // Start on first user interaction if blocked
    const handleFirstGesture = () => {
      if (audio && audio.paused) {
        audio.play().then(() => {
          setShowToast(true);
          setTimeout(() => setShowToast(false), 4500);
        }).catch(() => {});
      }
    };

    // Toggle listener from HeroCover button
    const handleExternalToggle = () => {
      if (!audio) return;
      if (audio.paused) {
        audio.play().catch(() => {});
      } else {
        audio.pause();
      }
    };

    window.addEventListener('click', handleFirstGesture, { once: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true });
    window.addEventListener('gallery-audio-toggle', handleExternalToggle);

    return () => {
      audio.removeEventListener('play', handleNativePlay);
      audio.removeEventListener('pause', handleNativePause);
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
      window.removeEventListener('gallery-audio-toggle', handleExternalToggle);
      audio.pause();
    };
  }, []); // Strictly empty dependency array to prevent play/pause oscillation

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(err => console.warn('Audio play error:', err));
    } else {
      audio.pause();
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      {/* Hidden HTML5 Native Audio Element */}
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
      />

      {/* Floating Sticky Mini-Player (Bottom Left) */}
      <div className="fixed bottom-5 left-5 z-40 animate-fade-in">
        <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-slate-950/90 hover:bg-slate-950 text-white backdrop-blur-xl border border-white/15 shadow-2xl transition-all duration-300 group hover:border-teal-400/50">
          {/* Animated Play/Pause Button */}
          <button
            onClick={togglePlay}
            className={`p-2.5 rounded-xl flex items-center justify-center transition-all ${
              isPlaying
                ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-500/25 ring-2 ring-teal-400/30'
                : 'bg-white/10 text-slate-300 hover:text-white hover:bg-white/20'
            }`}
            title={isPlaying ? "Pausar Trilha Sonora" : "Reproduzir Trilha Sonora"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current translate-x-0.5" />
            )}
          </button>

          {/* Track Details & Animated Equalizer */}
          <div className="flex flex-col cursor-pointer pr-1" onClick={togglePlay}>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-white tracking-wide truncate max-w-[190px] sm:max-w-[240px]">
                {trackTitle.split('—')[0]}
              </span>
              {/* Equalizer Waveform Bars when playing */}
              {isPlaying && (
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 bg-teal-400 rounded-full animate-pulse h-full" />
                  <span className="w-0.5 bg-teal-400 rounded-full animate-pulse h-2/3 [animation-delay:150ms]" />
                  <span className="w-0.5 bg-teal-400 rounded-full animate-pulse h-5/6 [animation-delay:300ms]" />
                  <span className="w-0.5 bg-teal-400 rounded-full animate-pulse h-1/2 [animation-delay:450ms]" />
                </div>
              )}
            </div>
            <span className="text-[9px] text-teal-300 font-medium">
              {isPlaying ? "Trilha Moderna Ativa • Clique para pausar" : "Trilha Pausada • Clique para tocar"}
            </span>
          </div>

          {/* Mute Button */}
          <button
            onClick={toggleMute}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title={isMuted ? "Reativar som" : "Silenciar"}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-rose-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-teal-300" />
            )}
          </button>
        </div>
      </div>

      {/* First-play Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-6 z-50 p-3.5 rounded-2xl bg-slate-900/95 text-white backdrop-blur-md border border-teal-500/40 shadow-2xl flex items-center gap-3 text-xs animate-bounce">
          <Disc3 className="w-5 h-5 text-teal-400 animate-spin" />
          <div>
            <p className="font-bold text-white">🎵 Trilha Sonora Moderna Ativa</p>
            <p className="text-[10px] text-slate-300">Cinematic Piano & Ambient Strings</p>
          </div>
        </div>
      )}
    </>
  );
};
