
import React, { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

interface SoundControlProps {
  name: string;
  icon: ReactNode;
  soundFile: string;
}

const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path d="M6.3 2.841A1.5 1.5 0 0 0 4 4.11V15.89a1.5 1.5 0 0 0 2.3 1.269l9.344-5.89a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
    </svg>
);

const PauseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Z" clipRule="evenodd" transform="rotate(90 10 10) scale(0.6, 1)" />
        <path fillRule="evenodd" d="M2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Z" clipRule="evenodd" transform="translate(6,0) rotate(90 10 10) scale(0.6, 1)" />
    </svg>
);


export const SoundControl: React.FC<SoundControlProps> = ({ name, icon, soundFile }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize the Audio object once and store it in the ref
    const audio = new Audio(soundFile);
    audio.loop = true;
    audioRef.current = audio;

    // Cleanup on component unmount
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [soundFile]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => console.error("Audio play failed:", error));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };
  
  const buttonBgClass = isPlaying ? 'bg-sky-400' : 'bg-slate-600';
  const buttonHoverBgClass = isPlaying ? 'hover:bg-sky-500' : 'hover:bg-slate-500';
  const iconColorClass = isPlaying ? 'text-sky-400' : 'text-slate-400';

  return (
    <div className="bg-slate-700/50 rounded-lg p-3 transition-all duration-300 hover:bg-slate-700">
      <div className="flex items-center space-x-4">
        <div className={`transition-colors duration-300 ${iconColorClass}`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-200 truncate">{name}</p>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full mt-2"
            aria-label={`${name} volume`}
          />
        </div>
        <button
          onClick={togglePlay}
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 transform active:scale-90 ${buttonBgClass} ${buttonHoverBgClass}`}
          aria-label={isPlaying ? `Pause ${name}` : `Play ${name}`}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
      </div>
    </div>
  );
};
