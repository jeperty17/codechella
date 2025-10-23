import React from 'react';
import { Users, Calendar, Trophy, TrendingUp, Share2, Settings } from 'lucide-react';
import { Season, User } from '../types';

interface LeagueProps {
  season: Season;
  users: User[];
}

const League: React.FC<LeagueProps> = ({ season, users }) => {
  return (
    <div className="space-y-6">
      <div className="bg-cyber-darker rounded-xl p-6 border-2 border-neon-green circuit-pattern box-glow-green">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-neon-green to-neon-cyan rounded-lg flex items-center justify-center">
              <Users className="w-7 h-7 text-cyber-dark" />
            </div>
            <div>
              <h2 className="text-2xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-cyan">
                {season.name}
              </h2>
              <p className="text-cyber-text-dim text-sm font-exo">{users.length} active members</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-3 bg-cyber-dark rounded-lg border border-neon-cyan hover:border-glow-cyan transition-all duration-300">
              <Share2 className="w-5 h-5 text-neon-cyan" />
            </button>
            <button className="p-3 bg-cyber-dark rounded-lg border border-neon-pink hover:border-glow-pink transition-all duration-300">
              <Settings className="w-5 h-5 text-neon-pink" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-cyber-dark rounded-lg p-4 border border-neon-cyan">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-5 h-5 text-neon-cyan" />
              <span className="text-cyber-text-dim text-sm font-exo">Current Week</span>
            </div>
            <p className="text-3xl font-orbitron font-bold text-neon-cyan">{season.currentWeek}</p>
            <p className="text-cyber-text-dim text-xs font-exo">of {season.totalWeeks} weeks</p>
          </div>

          <div className="bg-cyber-dark rounded-lg p-4 border border-neon-pink">
            <div className="flex items-center space-x-2 mb-2">
              <Trophy className="w-5 h-5 text-neon-pink" />
              <span className="text-cyber-text-dim text-sm font-exo">Leader</span>
            </div>
            <p className="text-2xl font-orbitron font-bold text-neon-pink">{users[0].name}</p>
            <p className="text-cyber-text-dim text-xs font-exo">{users[0].points} points</p>
          </div>

          <div className="bg-cyber-dark rounded-lg p-4 border border-neon-yellow">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-neon-yellow" />
              <span className="text-cyber-text-dim text-sm font-exo">Avg Accuracy</span>
            </div>
            <p className="text-3xl font-orbitron font-bold text-neon-yellow">72.3%</p>
            <p className="text-cyber-text-dim text-xs font-exo">across all members</p>
          </div>
        </div>
      </div>

      <div className="bg-cyber-darker rounded-xl p-6 border-2 border-neon-cyan">
        <h3 className="text-xl font-orbitron font-bold text-neon-cyan mb-4">League Members</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-cyber-dark rounded-lg p-4 border border-cyber-text-dim hover:border-neon-cyan transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-neon-cyan"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-cyber-text font-orbitron font-bold">{user.name}</h4>
                    <span className="text-neon-yellow font-orbitron font-bold">#{user.rank}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-cyber-text-dim font-exo">
                    <span>{user.points} pts</span>
                    <span>•</span>
                    <span>{user.correctPicks}/{user.totalPicks}</span>
                    <span>•</span>
                    <span>{((user.correctPicks / user.totalPicks) * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-cyber-darker rounded-xl p-6 border-2 border-neon-pink">
        <h3 className="text-xl font-orbitron font-bold text-neon-pink mb-4">Invite Friends</h3>
        <p className="text-cyber-text-dim font-exo mb-4">
          Share your league code with friends to let them join the competition!
        </p>
        <div className="flex space-x-2">
          <input
            type="text"
            value="CYBER-2024-ARENA"
            readOnly
            className="flex-1 px-4 py-3 bg-cyber-dark border-2 border-neon-pink rounded-lg text-neon-pink font-orbitron font-bold text-center focus:outline-none focus:border-glow-pink"
          />
          <button className="px-6 py-3 bg-gradient-to-r from-neon-pink to-neon-cyan text-cyber-dark font-orbitron font-bold rounded-lg hover:scale-105 transition-transform duration-300 box-glow-pink">
            COPY
          </button>
        </div>
      </div>

      <div className="bg-cyber-darker rounded-xl p-6 border-2 border-neon-yellow">
        <h3 className="text-xl font-orbitron font-bold text-neon-yellow mb-4">Season Timeline</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-3 h-3 bg-neon-green rounded-full"></div>
            <div className="flex-1">
              <p className="text-cyber-text font-exo font-semibold">Season Started</p>
              <p className="text-cyber-text-dim text-sm font-exo">{season.startDate}</p>
            </div>
          </div>
          <div className="ml-1.5 border-l-2 border-neon-cyan h-8"></div>
          <div className="flex items-center space-x-4">
            <div className="w-3 h-3 bg-neon-cyan rounded-full animate-pulse"></div>
            <div className="flex-1">
              <p className="text-cyber-text font-exo font-semibold">Current Week</p>
              <p className="text-cyber-text-dim text-sm font-exo">Week {season.currentWeek} of {season.totalWeeks}</p>
            </div>
          </div>
          <div className="ml-1.5 border-l-2 border-cyber-text-dim h-8"></div>
          <div className="flex items-center space-x-4">
            <div className="w-3 h-3 bg-cyber-text-dim rounded-full"></div>
            <div className="flex-1">
              <p className="text-cyber-text font-exo font-semibold">Season Ends</p>
              <p className="text-cyber-text-dim text-sm font-exo">{season.endDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default League;
