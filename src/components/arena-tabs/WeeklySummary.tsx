import React from 'react';
import { Calendar, TrendingUp, Target, Award } from 'lucide-react';
import { Arena } from '../../types';

interface WeeklySummaryProps {
  arena: Arena;
}

const WeeklySummary: React.FC<WeeklySummaryProps> = ({ arena }) => {
  const weekStats = {
    totalPicks: 12,
    correctPicks: 8,
    accuracy: 67,
    pointsEarned: 240,
    rank: 3,
    totalMembers: arena.memberCount,
  };

  return (
    <div className="space-y-6">
      <div className="bg-cyber-darker rounded-xl p-6 border-2 border-neon-cyan box-glow-cyan">
        <div className="flex items-center space-x-3 mb-4">
          <Calendar className="w-6 h-6 text-neon-cyan" />
          <h2 className="text-2xl font-orbitron font-bold text-neon-cyan">
            Week {arena.season.currentWeek} Summary
          </h2>
        </div>
        <p className="text-cyber-text-dim font-exo">
          Your performance this week in {arena.name}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-cyber-darker rounded-xl p-6 border-2 border-neon-pink hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-8 h-8 text-neon-pink" />
            <span className="text-3xl font-orbitron font-bold text-neon-pink">
              {weekStats.totalPicks}
            </span>
          </div>
          <div className="text-cyber-text-dim font-exo text-sm">Total Picks</div>
        </div>

        <div className="bg-cyber-darker rounded-xl p-6 border-2 border-neon-green hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-neon-green" />
            <span className="text-3xl font-orbitron font-bold text-neon-green">
              {weekStats.correctPicks}
            </span>
          </div>
          <div className="text-cyber-text-dim font-exo text-sm">Correct Picks</div>
        </div>

        <div className="bg-cyber-darker rounded-xl p-6 border-2 border-neon-cyan hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-2">
            <Award className="w-8 h-8 text-neon-cyan" />
            <span className="text-3xl font-orbitron font-bold text-neon-cyan">
              {weekStats.accuracy}%
            </span>
          </div>
          <div className="text-cyber-text-dim font-exo text-sm">Accuracy</div>
        </div>

        <div className="bg-cyber-darker rounded-xl p-6 border-2 border-neon-yellow hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">🏆</span>
            <span className="text-3xl font-orbitron font-bold text-neon-yellow">
              {weekStats.pointsEarned}
            </span>
          </div>
          <div className="text-cyber-text-dim font-exo text-sm">Points Earned</div>
        </div>
      </div>

      <div className="bg-cyber-darker rounded-xl p-6 border-2 border-neon-green">
        <h3 className="text-xl font-orbitron font-bold text-neon-green mb-4">
          Your Ranking
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-4xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-green">
              #{weekStats.rank}
            </div>
            <div className="text-cyber-text-dim font-exo text-sm">
              out of {weekStats.totalMembers} members
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-orbitron font-bold text-neon-pink">
              {weekStats.pointsEarned} pts
            </div>
            <div className="text-cyber-text-dim font-exo text-sm">
              this week
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklySummary;
