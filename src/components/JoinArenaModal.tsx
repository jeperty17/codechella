import React, { useState } from 'react';
import { X, UserPlus, AlertCircle } from 'lucide-react';
import { formatArenaCode } from '../utils/arenaCode';

interface JoinArenaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (arenaCode: string) => void;
  error?: string;
}

const JoinArenaModal: React.FC<JoinArenaModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit,
  error: externalError 
}) => {
  const [arenaCode, setArenaCode] = useState('');
  const [localError, setLocalError] = useState('');

  if (!isOpen) return null;

  const handleChange = (value: string) => {
    // Only allow alphanumeric characters and convert to uppercase
    const sanitized = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    
    // Limit to 6 characters
    if (sanitized.length <= 6) {
      setArenaCode(sanitized);
      setLocalError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (arenaCode.length !== 6) {
      setLocalError('Arena code must be 6 characters');
      return;
    }

    onSubmit(arenaCode);
  };

  const handleClose = () => {
    setArenaCode('');
    setLocalError('');
    onClose();
  };

  const displayError = externalError || localError;
  const formattedCode = arenaCode.length === 6 ? formatArenaCode(arenaCode) : arenaCode;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-cyber-darker rounded-2xl border-2 border-neon-cyan box-glow-cyan overflow-hidden">
        <div className="absolute inset-0 circuit-pattern opacity-10"></div>
        
        <div className="relative">
          <div className="flex items-center justify-between p-6 border-b-2 border-neon-cyan/30">
            <h2 className="text-2xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-green">
              Join Arena
            </h2>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg bg-cyber-dark border-2 border-neon-pink hover:bg-neon-pink hover:text-cyber-dark transition-all duration-300 group"
            >
              <X className="w-6 h-6 text-neon-pink group-hover:text-cyber-dark" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-neon-cyan font-orbitron font-bold mb-2">
                Arena Code
              </label>
              <p className="text-cyber-text-dim font-exo text-sm mb-3">
                Enter the 6-character code shared by your friend
              </p>
              
              <div className="relative">
                <input
                  type="text"
                  value={arenaCode}
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder="ABC123"
                  maxLength={6}
                  className="w-full px-4 py-4 bg-cyber-dark border-2 border-cyber-text-dim rounded-lg text-cyber-text font-orbitron text-2xl text-center tracking-widest uppercase focus:border-neon-cyan focus:outline-none transition-all duration-300"
                  autoFocus
                />
                
                {arenaCode.length === 6 && (
                  <div className="absolute inset-0 border-2 border-neon-green rounded-lg pointer-events-none animate-pulse"></div>
                )}
              </div>

              {arenaCode.length > 0 && (
                <div className="mt-3 text-center">
                  <span className="text-neon-cyan font-orbitron text-lg tracking-wider">
                    {formattedCode}
                  </span>
                  <span className="ml-2 text-cyber-text-dim font-exo text-sm">
                    ({arenaCode.length}/6)
                  </span>
                </div>
              )}

              {displayError && (
                <div className="mt-3 p-3 bg-red-500/10 border-2 border-red-500 rounded-lg flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-500 font-exo">{displayError}</p>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4 pt-4">
              <button
                type="submit"
                disabled={arenaCode.length !== 6}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-neon-cyan to-neon-green rounded-xl font-orbitron font-bold text-lg text-cyber-dark hover:scale-105 transition-all duration-300 box-glow-cyan disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
              >
                <UserPlus className="w-5 h-5" />
                <span>JOIN ARENA</span>
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-6 py-4 bg-cyber-dark rounded-xl font-orbitron font-bold text-lg text-cyber-text border-2 border-cyber-text-dim hover:border-neon-cyan hover:text-neon-cyan transition-all duration-300"
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinArenaModal;
