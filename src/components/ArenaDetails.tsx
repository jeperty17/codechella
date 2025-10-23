import React, { useState } from 'react';
import { ArrowLeft, Calendar, Trophy, Target, Settings, MessageSquare, FileText } from 'lucide-react';
import { Arena } from '../types';
import WeeklySummary from './arena-tabs/WeeklySummary';
import MakePicks from './arena-tabs/MakePicks';
import ArenaLeaderboard from './arena-tabs/ArenaLeaderboard';
import ArenaRules from './arena-tabs/ArenaRules';
import ArenaSettings from './arena-tabs/ArenaSettings';
import ArenaChat from './arena-tabs/ArenaChat';

interface ArenaDetailsProps {
  arena: Arena;
  onBack: () => void;
}

type TabType = 'summary' | 'picks' | 'leaderboard' | 'rules' | 'settings' | 'chat';

const ArenaDetails: React.FC<ArenaDetailsProps> = ({ arena, onBack }) => {
  const [activeTab, setActiveTab] = useState<TabType>('summary');

  const tabs = [
    { id: 'summary' as TabType, label: 'Weekly Summary', icon: Calendar },
    { id: 'picks' as TabType, label: 'Make Picks', icon: Target },
    { id: 'leaderboard' as TabType, label: 'Leaderboard', icon: Trophy },
    { id: 'rules' as TabType, label: 'Arena Rules', icon: FileText },
    { id: 'settings' as TabType, label: 'Settings', icon: Settings },
    { id: 'chat' as TabType, label: 'Chat', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-cyber-dark circuit-pattern py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="group flex items-center space-x-2 mb-6 px-6 py-3 bg-cyber-darker rounded-lg border-2 border-neon-pink hover:bg-neon-pink hover:text-cyber-dark transition-all duration-300 box-glow-pink"
        >
          <ArrowLeft className="w-5 h-5 text-neon-pink group-hover:text-cyber-dark group-hover:-translate-x-1 transition-all duration-300" />
          <span className="font-orbitron font-bold text-neon-pink group-hover:text-cyber-dark">
            Back to Arenas
          </span>
        </button>

        {/* Arena Header */}
        <div className="mb-8 bg-cyber-darker rounded-xl p-6 border-2 border-neon-cyan box-glow-cyan">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-green mb-2">
                {arena.name}
              </h1>
              <p className="text-cyber-text-dim font-exo text-lg mb-4">
                {arena.description}
              </p>
              <div className="flex items-center space-x-6 text-sm font-exo">
                <div className="flex items-center space-x-2">
                  <span className="text-cyber-text-dim">League:</span>
                  <span className="text-neon-cyan font-bold">{arena.league}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-cyber-text-dim">Members:</span>
                  <span className="text-neon-green font-bold">{arena.memberCount}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-cyber-text-dim">Week:</span>
                  <span className="text-neon-pink font-bold">{arena.season.currentWeek} / {arena.season.totalWeeks}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-cyber-text-dim font-exo mb-1">Arena Code</div>
              <div className="text-2xl font-orbitron font-bold text-neon-cyan tracking-wider">
                {arena.code}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 bg-cyber-darker rounded-xl p-2 border-2 border-cyber-text-dim">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    group relative px-4 py-3 rounded-lg font-orbitron font-bold text-sm transition-all duration-300
                    ${isActive 
                      ? 'bg-gradient-to-r from-neon-cyan to-neon-green text-cyber-dark' 
                      : 'bg-cyber-darkest text-cyber-text-dim hover:text-neon-cyan hover:bg-cyber-dark'
                    }
                  `}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyber-dark' : 'text-neon-cyan'}`} />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </div>
                  {isActive && (
                    <div className="absolute inset-0 border-2 border-neon-cyan rounded-lg box-glow-cyan pointer-events-none"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[600px]">
          {activeTab === 'summary' && <WeeklySummary arena={arena} />}
          {activeTab === 'picks' && <MakePicks arena={arena} />}
          {activeTab === 'leaderboard' && <ArenaLeaderboard arena={arena} />}
          {activeTab === 'rules' && <ArenaRules arena={arena} />}
          {activeTab === 'settings' && <ArenaSettings arena={arena} />}
          {activeTab === 'chat' && <ArenaChat arena={arena} />}
        </div>
      </div>
    </div>
  );
};

export default ArenaDetails;
