import React from 'react';
import { Trophy, TrendingUp, TrendingDown, Coins, Crown, Award, Medal, ArrowUp, ArrowDown } from 'lucide-react';
import { Arena } from '../../types';

interface ArenaLeaderboardProps {
  arena: Arena;
}

interface LeaderboardPlayer {
  id: string;
  name: string;
  avatar: string;
  weeklyChange: number;
  totalCoins: number;
  rankChange: number; // Positive = moved up, Negative = moved down, 0 = no change
}

// Test data for 6 players with rank movement
const testPlayers: LeaderboardPlayer[] = [
  {
    id: '1',
    name: 'Alex "Ace" Morgan',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    weeklyChange: 245,
    totalCoins: 1850,
    rankChange: 2, // Moved up 2 positions
  },
  {
    id: '2',
    name: 'Sarah "Sniper" Chen',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    weeklyChange: 180,
    totalCoins: 1620,
    rankChange: 0, // No change
  },
  {
    id: '3',
    name: 'Marcus "Maverick" Johnson',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
    weeklyChange: -50,
    totalCoins: 1340,
    rankChange: -1, // Dropped 1 position
  },
  {
    id: '4',
    name: 'Emily "Eagle Eye" Rodriguez',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    weeklyChange: 95,
    totalCoins: 1180,
    rankChange: 1, // Moved up 1 position
  },
  {
    id: '5',
    name: 'David "Dagger" Kim',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=200',
    weeklyChange: -120,
    totalCoins: 890,
    rankChange: -2, // Dropped 2 positions
  },
  {
    id: '6',
    name: 'Jessica "Jinx" Williams',
    avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=200',
    weeklyChange: -200,
    totalCoins: 650,
    rankChange: 0, // No change
  },
];

const ArenaLeaderboard: React.FC<ArenaLeaderboardProps> = ({ arena }) => {
  // Sort players by total coins (descending)
  const sortedPlayers = [...testPlayers].sort((a, b) => b.totalCoins - a.totalCoins);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-neon-yellow" />;
    if (rank === 2) return <Award className="w-6 h-6 text-cyber-text" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-orange-400" />;
    return null;
  };

  const getRowStyles = (rank: number, totalPlayers: number) => {
    if (rank === 1) {
      return 'bg-gradient-to-r from-neon-green/35 via-neon-green/20 to-transparent border-neon-green hover:from-neon-green/45 hover:via-neon-green/25 shadow-[0_0_15px_rgba(138,255,0,0.2)]';
    }
    if (rank === totalPlayers) {
      return 'bg-gradient-to-r from-neon-pink/35 via-neon-pink/20 to-transparent border-neon-pink hover:from-neon-pink/45 hover:via-neon-pink/25 shadow-[0_0_15px_rgba(255,0,128,0.2)]';
    }
    return 'border-cyber-text-dim hover:border-neon-cyan hover:bg-cyber-darkest/50';
  };

  const getRankBadgeStyles = (rank: number, totalPlayers: number) => {
    if (rank === 1) {
      return 'bg-gradient-to-br from-neon-yellow to-neon-green text-cyber-dark shadow-[0_0_20px_rgba(138,255,0,0.4)]';
    }
    if (rank === totalPlayers) {
      return 'bg-gradient-to-br from-neon-pink to-red-600 text-white shadow-[0_0_20px_rgba(255,0,128,0.4)]';
    }
    if (rank <= 3) {
      return 'bg-gradient-to-br from-neon-cyan to-neon-green text-cyber-dark';
    }
    return 'bg-cyber-darkest text-cyber-text-dim';
  };

  const getRankMovementIndicator = (rankChange: number) => {
    if (rankChange > 0) {
      return (
        <div className="flex items-center space-x-1 bg-neon-green/20 px-2 py-1 rounded-full border border-neon-green/40">
          <ArrowUp className="w-3 h-3 text-neon-green" />
          <span className="text-xs font-orbitron font-bold text-neon-green">
            +{rankChange}
          </span>
        </div>
      );
    }
    if (rankChange < 0) {
      return (
        <div className="flex items-center space-x-1 bg-neon-pink/20 px-2 py-1 rounded-full border border-neon-pink/40">
          <ArrowDown className="w-3 h-3 text-neon-pink" />
          <span className="text-xs font-orbitron font-bold text-neon-pink">
            {rankChange}
          </span>
        </div>
      );
    }
    return null; // No indicator for no change
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-cyber-darker rounded-xl p-6 border-2 border-neon-yellow box-glow-yellow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Trophy className="w-6 h-6 text-neon-yellow" />
            <div>
              <h2 className="text-2xl font-orbitron font-bold text-neon-yellow">
                Arena Leaderboard
              </h2>
              <p className="text-cyber-text-dim font-exo text-sm mt-1">
                Week {arena.season.currentWeek} standings for {arena.name}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-orbitron font-bold text-neon-cyan">
              {sortedPlayers.length}
            </div>
            <div className="text-cyber-text-dim font-exo text-xs">
              Players
            </div>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-cyber-darker rounded-xl p-4 border-2 border-neon-green">
          <div className="flex items-center space-x-3">
            <Crown className="w-8 h-8 text-neon-green" />
            <div>
              <div className="text-2xl font-orbitron font-bold text-neon-green">
                {sortedPlayers[0]?.totalCoins || 0}
              </div>
              <div className="text-xs font-exo text-cyber-text-dim">
                Top Player Coins
              </div>
            </div>
          </div>
        </div>

        <div className="bg-cyber-darker rounded-xl p-4 border-2 border-neon-cyan">
          <div className="flex items-center space-x-3">
            <Coins className="w-8 h-8 text-neon-cyan" />
            <div>
              <div className="text-2xl font-orbitron font-bold text-neon-cyan">
                {Math.round(sortedPlayers.reduce((sum, p) => sum + p.totalCoins, 0) / sortedPlayers.length)}
              </div>
              <div className="text-xs font-exo text-cyber-text-dim">
                Average Coins
              </div>
            </div>
          </div>
        </div>

        <div className="bg-cyber-darker rounded-xl p-4 border-2 border-neon-yellow">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-8 h-8 text-neon-yellow" />
            <div>
              <div className="text-2xl font-orbitron font-bold text-neon-yellow">
                {sortedPlayers.filter(p => p.weeklyChange > 0).length}
              </div>
              <div className="text-xs font-exo text-cyber-text-dim">
                Players Gaining
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-cyber-darker rounded-xl border-2 border-neon-cyan overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-cyber-darkest border-b-2 border-neon-cyan">
                <th className="px-6 py-4 text-left">
                  <span className="text-sm font-orbitron font-bold text-neon-cyan">RANK</span>
                </th>
                <th className="px-6 py-4 text-left">
                  <span className="text-sm font-orbitron font-bold text-neon-cyan">PLAYER NAME</span>
                </th>
                <th className="px-6 py-4 text-center">
                  <span className="text-sm font-orbitron font-bold text-neon-cyan">WEEKLY GAIN/LOSS</span>
                </th>
                <th className="px-6 py-4 text-right">
                  <span className="text-sm font-orbitron font-bold text-neon-cyan">TOTAL COINS</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedPlayers.map((player, index) => {
                const rank = index + 1;
                const isPositiveChange = player.weeklyChange > 0;
                const isNegativeChange = player.weeklyChange < 0;

                return (
                  <tr
                    key={player.id}
                    className={`
                      border-b-2 transition-all duration-300
                      ${getRowStyles(rank, sortedPlayers.length)}
                    `}
                  >
                    {/* Rank */}
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <div className={`
                            w-12 h-12 rounded-full flex items-center justify-center font-orbitron font-bold text-xl
                            ${getRankBadgeStyles(rank, sortedPlayers.length)}
                          `}>
                            {rank}
                          </div>
                          {getRankMovementIndicator(player.rankChange)}
                        </div>
                        {getRankIcon(rank)}
                      </div>
                    </td>

                    {/* Player Name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={player.avatar}
                          alt={player.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-neon-cyan"
                        />
                        <div>
                          <div className="font-orbitron font-bold text-lg text-neon-cyan">
                            {player.name}
                          </div>
                          <div className="text-xs text-cyber-text-dim font-exo">
                            {rank === 1 ? '👑 Champion' : rank === sortedPlayers.length ? '⚠️ Danger Zone' : `Position #${rank}`}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Weekly Gain/Loss */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-2">
                        {isPositiveChange && <TrendingUp className="w-5 h-5 text-neon-green" />}
                        {isNegativeChange && <TrendingDown className="w-5 h-5 text-neon-pink" />}
                        <span className={`
                          text-xl font-orbitron font-bold
                          ${isPositiveChange ? 'text-neon-green' : isNegativeChange ? 'text-neon-pink' : 'text-cyber-text-dim'}
                        `}>
                          {isPositiveChange ? '+' : ''}{player.weeklyChange}
                        </span>
                      </div>
                    </td>

                    {/* Total Coins */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <Coins className="w-6 h-6 text-neon-yellow" />
                        <span className="text-2xl font-orbitron font-bold text-neon-yellow">
                          {player.totalCoins.toLocaleString()}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4 p-4">
          {sortedPlayers.map((player, index) => {
            const rank = index + 1;
            const isPositiveChange = player.weeklyChange > 0;
            const isNegativeChange = player.weeklyChange < 0;

            return (
              <div
                key={player.id}
                className={`
                  rounded-xl p-4 border-2 transition-all duration-300
                  ${getRowStyles(rank, sortedPlayers.length)}
                `}
              >
                {/* Rank and Player Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center font-orbitron font-bold text-lg
                        ${getRankBadgeStyles(rank, sortedPlayers.length)}
                      `}>
                        {rank}
                      </div>
                      {getRankMovementIndicator(player.rankChange)}
                    </div>
                    {getRankIcon(rank)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Coins className="w-5 h-5 text-neon-yellow" />
                    <span className="text-xl font-orbitron font-bold text-neon-yellow">
                      {player.totalCoins.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Player Details */}
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={player.avatar}
                    alt={player.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-neon-cyan"
                  />
                  <div className="flex-1">
                    <div className="font-orbitron font-bold text-neon-cyan">
                      {player.name}
                    </div>
                    <div className="text-xs text-cyber-text-dim font-exo">
                      {rank === 1 ? '👑 Champion' : rank === sortedPlayers.length ? '⚠️ Danger Zone' : `Position #${rank}`}
                    </div>
                  </div>
                </div>

                {/* Weekly Change */}
                <div className="bg-cyber-darkest rounded-lg p-3 border-2 border-cyber-text-dim">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-exo text-cyber-text-dim">
                      Weekly Change
                    </span>
                    <div className="flex items-center space-x-2">
                      {isPositiveChange && <TrendingUp className="w-4 h-4 text-neon-green" />}
                      {isNegativeChange && <TrendingDown className="w-4 h-4 text-neon-pink" />}
                      <span className={`
                        text-lg font-orbitron font-bold
                        ${isPositiveChange ? 'text-neon-green' : isNegativeChange ? 'text-neon-pink' : 'text-cyber-text-dim'}
                      `}>
                        {isPositiveChange ? '+' : ''}{player.weeklyChange}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-cyber-darker rounded-xl p-4 border-2 border-cyber-text-dim">
        <h3 className="text-sm font-orbitron font-bold text-cyber-text-dim mb-3">
          Leaderboard Legend
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-exo">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-neon-yellow to-neon-green"></div>
            <span className="text-cyber-text-dim">1st Place - Champion</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-neon-green" />
            <span className="text-cyber-text-dim">Positive weekly gain</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-neon-pink to-red-600"></div>
            <span className="text-cyber-text-dim">Last Place - Danger Zone</span>
          </div>
          <div className="flex items-center space-x-2">
            <ArrowUp className="w-4 h-4 text-neon-green" />
            <span className="text-cyber-text-dim">Rank improved</span>
          </div>
          <div className="flex items-center space-x-2">
            <ArrowDown className="w-4 h-4 text-neon-pink" />
            <span className="text-cyber-text-dim">Rank dropped</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArenaLeaderboard;
