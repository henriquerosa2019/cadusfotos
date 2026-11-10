import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Disc3 } from 'lucide-react';

interface MusicPlayerProps {
  trackTitle?: string;
  artist?: string;
  audioSrc?: string;
}

export const GalleryMusicPlayer: React.FC<MusicPlayerProps> = ({
  trackTitle = "Canon in D (Pachelbel) — Trilha Clássica",
  artist = "Instrumental Romântico de Casamento",
  audioSrc = "/audio/trilha-casamento.mp3"
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Notify listeners (like HeroCover) of play state
  const notifyState = (playing: boolean) => {
    setIsPlaying(playing);
    window.dispatchEvent(new CustomEvent('gallery-audio-state-change', {
      detail: { isPlaying: playing, isMuted }
    }));
  };

  // Initialize and attempt auto-play on gallery entry
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.55; // Gentle background volume

    const attemptPlay = async () => {
      try {
        await audio.play();
        notifyState(true);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4500);
      } catch (err) {
        // Browser blocked autoplay without user gesture: wait for first interaction
        notifyState(false);
      }
    };

    attemptPlay();

    // Start on first user interaction if blocked by browser policy
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        if (audio && audio.paused) {
          audio.play().then(() => {
            notifyState(true);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 4500);
          }).catch(() => {});
        }
      }
    };

    const handleExternalToggle = () => {
      togglePlay();
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });
    window.addEventListener('gallery-audio-toggle', handleExternalToggle);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('gallery-audio-toggle', handleExternalToggle);
      if (audio) {
        audio.pause();
      }
    };
  }, [hasInteracted, isPlaying, isMuted]);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      notifyState(false);
    } else {
      audio.play().then(() => {
        notifyState(true);
      }).catch(err => {
        console.warn('Playback error:', err);
      });
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
    window.dispatchEvent(new CustomEvent('gallery-audio-state-change', {
      detail: { isPlaying, isMuted: !isMuted }
    }));
  };

  return (
    <>
      {/* Hidden HTML5 Native Audio Element */}
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
        onPlay={() => notifyState(true)}
        onPause={() => notifyState(false)}
      />

      {/* 1. Floating Sticky Mini-Player (Bottom Left) */}
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
              <span className="text-[11px] font-bold text-white tracking-wide truncate max-w-[180px] sm:max-w-[220px]">
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
              {isPlaying ? "Trilha Ativa • Clique para pausar" : "Trilha Pausada • Clique para tocar"}
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
            <p className="font-bold text-white">🎵 Trilha Sonora Iniciada</p>
            <p className="text-[10px] text-slate-300">Pachelbel - Canon in D (Instrumental)</p>
          </div>
        </div>
      )}
    </>
  );
};
