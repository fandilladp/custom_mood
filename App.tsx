
import React from 'react';
import { SoundControl } from './components/SoundControl';
import { SOUNDS } from './constants';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-2 sm:p-4 font-sans">
      <div className="w-full max-w-xs bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/30 ring-1 ring-white/10">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-sky-100">Ambient</h1>
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" title="Live"></div>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Create your perfect soundscape. Note: this app is designed to be a small, always-on-top window.
          </p>
        </div>

        <div className="space-y-2 px-4 pb-6 max-h-[70vh] overflow-y-auto">
          {SOUNDS.map((sound) => (
            <SoundControl
              key={sound.id}
              name={sound.name}
              icon={sound.icon}
              soundFile={sound.soundFile}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
