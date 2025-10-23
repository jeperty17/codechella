import React, { useState } from 'react';
import { Clock, TrendingUp, CheckCircle2, Circle } from 'lucide-react';
import { Match } from '../types';

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const [selectedPick, setSelectedPick] = useState<'home' | 'away' | null>(null);
  const [confidence, setConfidence] = useState(50);

  const handlePick = (team: 'home' | 'away') => {
    setSelectedPick(team);
  };

  const handleSubmit = () => {
    if (selectedPick) {
      alert(`Pick submitted: ${selectedPick === 'home' ? match.homeTeam : match.awayTeam} with ${confidence}% confidence`);
    }
  };

  const getStatusBadge = () => {
    switch (match.status) {
      case 'live':
        return (
          <div className="flex items-center space-x-1 px-3 py-1 bg-neon-pink/20 border border-neon-pink rounded-full">
            <div className="w-2 h-2 bg-neon-pink rounded-full animate-pulse"></div>
            <span className="text-neon-pink text-xs font-orbitron font-bold">LIVE</span>
          </div>
        );
      case 'completed':
        return (
          <div className="flex items-center space-x-1 px-3 py-1 bg-neon-green/20 border border-neon-green rounded-full">
            <CheckCircle2 className="w-3 h-3 text-neon-green" />
            <span className="text-neon-green text-xs font-orbitron font-bold">FINAL</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center space-x-1 px-3 py-1 bg-neon-cyan/20 border border-neon-cyan rounded-full">
            <Clock className="w-3 h-3 text-neon-cyan" />
            <span className="text-neon-cyan text-xs font-orbitron font-bold">UPCOMING</span>
          </div>
        );
    }
  };

  return (
    <div className="bg-cyber-darker rounded-xl border-2 border-cyber-text-dim hover:border-neon-cyan transition-all duration-300 overflow-hidden scan-line">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-cyber-text-dim text-sm font-exo">Week {match.week}</span>
            <span className="text-cyber-text-dim">•</span>
            <span className="text-cyber-text text-sm font-exo">{match.date} at {match.time}</span>
          </div>
          {getStatusBadge()}
        </div>

        <div className="grid grid-cols-3 gap-4 items-center mb-6">
          <button
            onClick={() => handlePick('home')}
            disabled={match.status !== 'upcoming'}
            className={`
              flex flex-col items-center space-y-3 p-4 rounded-lg transition-all duration-300
              ${match.status === 'upcoming' ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed opacity-60'}
              ${selectedPick === 'home' 
                ? 'bg-neon-pink/20 border-2 border-neon-pink box-glow-pink' 
                : 'bg-cyber-dark border-2 border-transparent hover:border-neon-pink/50'
              }
            `}
          >
            <div className="relative">
              <img 
                src={match.homeTeamLogo} 
                alt={match.homeTeam}
                className="w-16 h-16 rounded-full object-cover border-2 border-neon-cyan"
              />
              {selectedPick === 'home' && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-neon-pink rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-cyber-dark" />
                </div>
              )}
            </div>
            <span className="text-cyber-text font-orbitron font-semibold text-center text-sm">
              {match.homeTeam}
            </span>
            {match.status === 'completed' && (
              <span className="text-2xl font-orbitron font-bold text-neon-green">{match.homeScore}</span>
            )}
            {match.status === 'live' && (
              <span className="text-2xl font-orbitron font-bold text-neon-pink glow-neon-pink">{match.homeScore}</span>
            )}
          </button>

          <div className="flex flex-col items-center space-y-2">
            <div className="text-4xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-pink">
              VS
            </div>
            {match.status === 'upcoming' && selectedPick && (
              <div className="flex items-center space-x-1 text-neon-yellow">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-orbitron">{confidence}%</span>
              </div>
            )}
          </div>

          <button
            onClick={() => handlePick('away')}
            disabled={match.status !== 'upcoming'}
            className={`
              flex flex-col items-center space-y-3 p-4 rounded-lg transition-all duration-300
              ${match.status === 'upcoming' ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed opacity-60'}
              ${selectedPick === 'away' 
                ? 'bg-neon-cyan/20 border-2 border-neon-cyan box-glow-cyan' 
                : 'bg-cyber-dark border-2 border-transparent hover:border-neon-cyan/50'
              }
            `}
          >
            <div className="relative">
              <img 
                src={match.awayTeamLogo} 
                alt={match.awayTeam}
                className="w-16 h-16 rounded-full object-cover border-2 border-neon-pink"
              />
              {selectedPick === 'away' && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-neon-cyan rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-cyber-dark" />
                </div>
              )}
            </div>
            <span className="text-cyber-text font-orbitron font-semibold text-center text-sm">
              {match.awayTeam}
            </span>
            {match.status === 'completed' && (
              <span className="text-2xl font-orbitron font-bold text-neon-green">{match.awayScore}</span>
            )}
            {match.status === 'live' && (
              <span className="text-2xl font-orbitron font-bold text-neon-pink glow-neon-pink">{match.awayScore}</span>
            )}
          </button>
        </div>

        {match.status === 'upcoming' && selectedPick && (
          <div className="space-y-4 pt-4 border-t border-cyber-text-dim">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-cyber-text text-sm font-exo">Confidence Level</label>
                <span className="text-neon-yellow font-orbitron font-bold">{confidence}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={confidence}
                onChange={(e) => setConfidence(Number(e.target.value))}
                className="w-full h-2 bg-cyber-dark rounded-lg appearance-none cursor-pointer accent-neon-yellow"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-gradient-to-r from-neon-pink to-neon-cyan text-cyber-dark font-orbitron font-bold rounded-lg hover:scale-105 transition-transform duration-300 box-glow-pink"
            >
              LOCK IN PICK
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchCard;
