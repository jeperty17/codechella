import React from 'react';
import { Skull, AlertTriangle, Flame } from 'lucide-react';
import { Punishment } from '../types';

interface PunishmentsProps {
  punishments: Punishment[];
}

const Punishments: React.FC<PunishmentsProps> = ({ punishments }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild':
        return 'border-neon-green text-neon-green';
      case 'medium':
        return 'border-neon-yellow text-neon-yellow';
      case 'spicy':
        return 'border-neon-pink text-neon-pink';
      default:
        return 'border-cyber-text-dim text-cyber-text-dim';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'mild':
        return <AlertTriangle className="w-5 h-5" />;
      case 'medium':
        return <Flame className="w-5 h-5" />;
      case 'spicy':
        return <Skull className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-cyber-darker rounded-xl p-6 border-2 border-neon-pink circuit-pattern box-glow-pink">
        <div className="flex items-center space-x-3 mb-4">
          <Skull className="w-8 h-8 text-neon-pink" />
          <div>
            <h2 className="text-2xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-cyan">
              Season Punishments
            </h2>
            <p className="text-cyber-text-dim text-sm font-exo">Last place faces the consequences!</p>
          </div>
        </div>

        <div className="bg-cyber-dark rounded-lg p-4 border-2 border-neon-pink/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-cyber-text font-exo text-sm">Current Last Place:</span>
            <div className="flex items-center space-x-2">
              <img 
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" 
                alt="Last place"
                className="w-8 h-8 rounded-full border-2 border-neon-pink"
              />
              <span className="text-neon-pink font-orbitron font-bold">SynthSage</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-cyber-text-dim font-exo text-xs">Weeks remaining:</span>
            <span className="text-neon-yellow font-orbitron font-bold">4 weeks</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {punishments.map((punishment) => (
          <div
            key={punishment.id}
            className={`
              bg-cyber-darker rounded-xl p-6 border-2 transition-all duration-300 hover:scale-[1.02] scan-line
              ${getSeverityColor(punishment.severity)}
            `}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-4xl">{punishment.icon}</div>
                <div>
                  <h3 className="text-cyber-text font-orbitron font-bold text-lg">{punishment.title}</h3>
                  <div className={`flex items-center space-x-1 mt-1 ${getSeverityColor(punishment.severity)}`}>
                    {getSeverityIcon(punishment.severity)}
                    <span className="text-xs font-orbitron font-semibold uppercase">{punishment.severity}</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-cyber-text-dim font-exo text-sm leading-relaxed">
              {punishment.description}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-cyber-darker rounded-xl p-6 border-2 border-neon-cyan">
        <h3 className="text-xl font-orbitron font-bold text-neon-cyan mb-4">Punishment Rules</h3>
        <ul className="space-y-3 text-cyber-text font-exo">
          <li className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-neon-cyan rounded-full mt-2"></div>
            <span>Last place at season end must complete ONE punishment chosen by the league</span>
          </li>
          <li className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-neon-cyan rounded-full mt-2"></div>
            <span>Punishment severity is voted on by top 3 finishers</span>
          </li>
          <li className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-neon-cyan rounded-full mt-2"></div>
            <span>Photo/video evidence must be posted to league chat</span>
          </li>
          <li className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-neon-cyan rounded-full mt-2"></div>
            <span>Punishment must be completed within 2 weeks of season end</span>
          </li>
          <li className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-neon-cyan rounded-full mt-2"></div>
            <span>No backing out - it's all in good fun!</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Punishments;
