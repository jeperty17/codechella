import React from 'react';
import { Trophy, Zap, Users, Target } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'matches', label: 'Matches', icon: Target },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'punishments', label: 'Punishments', icon: Zap },
    { id: 'league', label: 'My League', icon: Users },
  ];

  return (
    <header className="bg-cyber-darker border-b-2 border-neon-cyan circuit-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-neon-pink to-neon-cyan rounded-lg flex items-center justify-center box-glow-pink">
                <Trophy className="w-7 h-7 text-cyber-dark" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-green">
                PicksArena
              </h1>
              <p className="text-xs text-cyber-text-dim font-exo">Predict. Compete. Dominate.</p>
            </div>
          </div>

          <nav className="hidden md:flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`
                    px-6 py-3 rounded-lg font-orbitron font-semibold text-sm
                    transition-all duration-300 flex items-center space-x-2
                    ${isActive 
                      ? 'bg-gradient-to-r from-neon-pink to-neon-cyan text-cyber-dark box-glow-pink' 
                      : 'text-cyber-text hover:text-neon-cyan border border-cyber-text-dim hover:border-neon-cyan'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-2 px-4 py-2 bg-cyber-dark rounded-lg border border-neon-green border-glow-green">
              <Zap className="w-4 h-4 text-neon-yellow animate-pulse" />
              <span className="text-neon-green font-orbitron font-bold">2,450</span>
              <span className="text-cyber-text-dim text-xs">PTS</span>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-neon-pink box-glow-pink overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" 
                alt="User" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <nav className="md:hidden flex overflow-x-auto pb-4 space-x-2 scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  px-4 py-2 rounded-lg font-orbitron font-semibold text-xs whitespace-nowrap
                  transition-all duration-300 flex items-center space-x-2
                  ${isActive 
                    ? 'bg-gradient-to-r from-neon-pink to-neon-cyan text-cyber-dark' 
                    : 'text-cyber-text border border-cyber-text-dim'
                  }
                `}
              >
                <Icon className="w-3 h-3" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
