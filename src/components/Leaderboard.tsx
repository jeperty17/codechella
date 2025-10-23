import React from 'react';
import { Trophy, TrendingUp, Flame, Award } from 'lucide-react';
import { User } from '../types';

interface LeaderboardProps {
  users: User[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ users }) => {
  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="w-10 h-10 bg-gradient-to-br from-neon-yellow to-neon-pink rounded-full flex items-center justify-center box-glow-pink">
            <Trophy className="w-6 h-6 text-cyber-dark" />
          </div>
        );
      case 2:
        return (
          <div className="w-10 h-10 bg-gradient-to-br from-cyber-text to-neon-cyan rounded-full flex items-center justify-center box-glow-cyan">
            <Trophy className="w-5 h-5 text-cyber-dark" />
          </div>
        );
      case 3:
        return (
          <div className="w-10 h-10 bg-gradient-to-br from-neon-green to-cyber-text-dim rounded-full flex items-center justify-center box-glow-green">
            <Trophy className="w-5 h-5 text-cyber-dark" />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 bg-cyber-dark rounded-full flex items-center justify-center border-2 border-cyber-text-dim">
            <span className="text-cyber-text font-orbitron font-bold">{rank}</span>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-cyber-darker rounded-xl p-6 border-2 border-neon-cyan circuit-pattern">
        <h2 className="text-2xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-green mb-2">
          Season Leaderboard
        </h2>
        <p className="text-cyber-text-dim text-sm font-exo mb-6">Top predictors of Winter Championship 2024</p>

        <div className="space-y-3">
          {users.map((user, index) => (
            <div
              key={user.id}
              className={`
                bg-cyber-dark rounded-lg p-4 border-2 transition-all duration-300 hover:scale-[1.02]
                ${index === 0 ? 'border-neon-pink box-glow-pink' : 
                  index === 1 ? 'border-neon-cyan box-glow-cyan' : 
                  index === 2 ? 'border-neon-green box-glow-green' : 
                  'border-cyber-text-dim hover:border-neon-cyan'}
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getRankBadge(user.rank)}
                  
                  <div className="relative">
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-neon-cyan"
                    />
                    {user.streak > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-neon-pink rounded-full flex items-center justify-center">
                        <Flame className="w-3 h-3 text-cyber-dark" />
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-cyber-text font-orbitron font-bold">{user.name}</h3>
                    <div className="flex items-center space-x-3 text-xs text-cyber-text-dim font-exo">
                      <span>{user.correctPicks}/{user.totalPicks} correct</span>
                      <span>•</span>
                      <span>{((user.correctPicks / user.totalPicks) * 100).toFixed(1)}% accuracy</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  {user.streak > 0 && (
                    <div className="flex items-center space-x-1 px-3 py-1 bg-neon-pink/20 border border-neon-pink rounded-full">
                      <Flame className="w-4 h-4 text-neon-pink" />
                      <span className="text-neon-pink font-orbitron font-bold text-sm">{user.streak}</span>
                    </div>
                  )}

                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <Award className="w-4 h-4 text-neon-yellow" />
                      <span className="text-2xl font-orbitron font-bold text-neon-yellow">{user.points}</span>
                    </div>
                    <span className="text-xs text-cyber-text-dim font-exo">points</span>
                  </div>

                  {index < 3 && (
                    <TrendingUp className={`
                      w-5 h-5 
                      ${index === 0 ? 'text-neon-pink' : 
                        index === 1 ? 'text-neon-cyan' : 
                        'text-neon-green'}
                    `} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-cyber-darker rounded-xl p-6 border-2 border-neon-pink hover:box-glow-pink transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-cyber-text font-orbitron font-semibold">Most Accurate</h3>
            <Trophy className="w-5 h-5 text-neon-pink" />
          </div>
          <p className="text-2xl font-orbitron font-bold text-neon-pink">{users[0].name}</p>
          <p className="text-cyber-text-dim text-sm font-exo">{((users[0].correctPicks / users[0].totalPicks) * 100).toFixed(1)}% accuracy</p>
        </div>

        <div className="bg-cyber-darker rounded-xl p-6 border-2 border-neon-cyan hover:box-glow-cyan transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-cyber-text font-orbitron font-semibold">Longest Streak</h3>
            <Flame className="w-5 h-5 text-neon-cyan" />
          </div>
          <p className="text-2xl font-orbitron font-bold text-neon-cyan">{users[0].name}</p>
          <p className="text-cyber-text-dim text-sm font-exo">{users[0].streak} wins in a row</p>
        </div>

        <div className="bg-cyber-darker rounded-xl p-6 border-2 border-neon-green hover:box-glow-green transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-cyber-text font-orbitron font-semibold">Most Active</h3>
            <TrendingUp className="w-5 h-5 text-neon-green" />
          </div>
          <p className="text-2xl font-orbitron font-bold text-neon-green">{users[0].name}</p>
          <p className="text-cyber-text-dim text-sm font-exo">{users[0].totalPicks} total picks</p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
