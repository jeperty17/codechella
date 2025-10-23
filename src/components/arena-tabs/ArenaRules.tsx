import React from 'react';
import { FileText, AlertCircle, Award, Flame } from 'lucide-react';
import { Arena } from '../../types';

interface ArenaRulesProps {
  arena: Arena;
}

const ArenaRules: React.FC<ArenaRulesProps> = ({ arena }) => {
  return (
    <div className="space-y-6">
      <div className="bg-cyber-darker rounded-xl p-6 border-2 border-neon-green box-glow-green">
        <div className="flex items-center space-x-3">
          <FileText className="w-6 h-6 text-neon-green" />
          <h2 className="text-2xl font-orbitron font-bold text-neon-green">
            Arena Rules
          </h2>
        </div>
      </div>

      <div className="bg-cyber-darker rounded-xl p-6 border-2 border-neon-cyan">
        <div className="flex items-center space-x-3 mb-4">
          <AlertCircle className="w-6 h-6 text-neon-cyan" />
          <h3 className="text-xl font-orbitron font-bold text-neon-cyan">
            How It Works
          </h3>
        </div>
        <div className="space-y-3 text-cyber-text font-exo">
          <p>
            <span className="text-neon-pink font-bold">1.</span> Each week, make your picks for all upcoming matches in the {arena.league} league.
          </p>
          <p>
            <span className="text-neon-pink font-bold">2.</span> Earn points for correct predictions. The earlier you pick, the more points you can earn!
          </p>
          <p>
            <span className="text-neon-pink font-bold">3.</span> Build your streak by making consecutive correct picks to multiply your points.
          </p>
          <p>
            <span className="text-neon-pink font-bold">4.</span> Compete against {arena.memberCount} members to climb the leaderboard.
          </p>
        </div>
      </div>

      <div className="bg-cyber-darker rounded-xl p-6 border-2 border-neon-yellow">
        <div className="flex items-center space-x-3 mb-4">
          <Award className="w-6 h-6 text-neon-yellow" />
          <h3 className="text-xl font-orbitron font-bold text-neon-yellow">
            Scoring System
          </h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-cyber-darkest rounded-lg">
            <span className="text-cyber-text font-exo">Correct Pick</span>
            <span className="text-neon-green font-orbitron font-bold text-xl">+50 pts</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-cyber-darkest rounded-lg">
            <span className="text-cyber-text font-exo">Streak Bonus (per game)</span>
            <span className="text-neon-cyan font-orbitron font-bold text-xl">+10 pts</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-cyber-darkest rounded-lg">
            <span className="text-cyber-text font-exo">Early Pick Bonus</span>
            <span className="text-neon-pink font-orbitron font-bold text-xl">+25 pts</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-cyber-darkest rounded-lg">
            <span className="text-cyber-text font-exo">Perfect Week</span>
            <span className="text-neon-yellow font-orbitron font-bold text-xl">+100 pts</span>
          </div>
        </div>
      </div>

      {arena.punishment && (
        <div className="bg-gradient-to-r from-neon-pink/20 to-neon-cyan/20 rounded-xl p-6 border-2 border-neon-pink box-glow-pink">
          <div className="flex items-center space-x-3 mb-4">
            <Flame className="w-6 h-6 text-neon-pink" />
            <h3 className="text-xl font-orbitron font-bold text-neon-pink">
              Season Punishment
            </h3>
          </div>
          <p className="text-cyber-text font-exo text-lg">
            {arena.punishment}
          </p>
          <p className="text-cyber-text-dim font-exo text-sm mt-2">
            The member with the lowest score at the end of the season must complete this challenge!
          </p>
        </div>
      )}

      <div className="bg-cyber-darker rounded-xl p-6 border-2 border-cyber-text-dim">
        <h3 className="text-xl font-orbitron font-bold text-neon-green mb-4">
          Season Timeline
        </h3>
        <div className="space-y-3 text-cyber-text font-exo">
          <div className="flex items-center justify-between">
            <span>Season Start:</span>
            <span className="text-neon-cyan font-bold">{new Date(arena.season.startDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Season End:</span>
            <span className="text-neon-pink font-bold">{new Date(arena.season.endDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Current Week:</span>
            <span className="text-neon-green font-bold">{arena.season.currentWeek} / {arena.season.totalWeeks}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArenaRules;
