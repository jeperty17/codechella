import React, { useState } from 'react';
import Landing from './components/Landing';
import ArenaHub from './components/ArenaHub';
import ArenaDetails from './components/ArenaDetails';
import Header from './components/Header';
import MatchCard from './components/MatchCard';
import Leaderboard from './components/Leaderboard';
import Punishments from './components/Punishments';
import League from './components/League';
import { ArrowLeft } from 'lucide-react';
import { matches, users, punishments, currentSeason, arenas } from './data/mockData';

type Page = 'landing' | 'arenaHub' | 'arenaDetails' | 'matches';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [selectedArenaId, setSelectedArenaId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('matches');

  const upcomingMatches = matches.filter(m => m.status === 'upcoming');
  const liveMatches = matches.filter(m => m.status === 'live');
  const completedMatches = matches.filter(m => m.status === 'completed');

  const selectedArena = selectedArenaId 
    ? arenas.find(a => a.id === selectedArenaId) 
    : null;

  const handleEnterArena = () => {
    setCurrentPage('arenaHub');
  };

  const handleSelectArena = (arenaId: string) => {
    setSelectedArenaId(arenaId);
    setCurrentPage('arenaDetails');
  };

  const handleBackToArenas = () => {
    setCurrentPage('arenaHub');
    setSelectedArenaId(null);
  };

  const handleBackToHome = () => {
    setCurrentPage('landing');
  };

  const handleCreateArena = () => {
    console.log('Create Arena clicked');
  };

  const handleJoinArena = () => {
    console.log('Join Arena clicked');
  };

  if (currentPage === 'landing') {
    return <Landing onEnter={handleEnterArena} />;
  }

  if (currentPage === 'arenaHub') {
    return (
      <ArenaHub
        onSelectArena={handleSelectArena}
        onCreateArena={handleCreateArena}
        onJoinArena={handleJoinArena}
        onBackToHome={handleBackToHome}
      />
    );
  }

  if (currentPage === 'arenaDetails' && selectedArena) {
    return (
      <ArenaDetails
        arena={selectedArena}
        onBack={handleBackToArenas}
      />
    );
  }

  return (
    <div className="min-h-screen bg-cyber-dark circuit-pattern">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={handleBackToArenas}
          className="group flex items-center space-x-2 mb-6 px-6 py-3 bg-cyber-darker rounded-lg border-2 border-neon-cyan hover:bg-neon-cyan hover:text-cyber-dark transition-all duration-300 box-glow-cyan"
        >
          <ArrowLeft className="w-5 h-5 text-neon-cyan group-hover:text-cyber-dark group-hover:-translate-x-1 transition-all duration-300" />
          <span className="font-orbitron font-bold text-neon-cyan group-hover:text-cyber-dark">
            Back to Arenas
          </span>
        </button>

        {activeTab === 'matches' && (
          <div className="space-y-8">
            {liveMatches.length > 0 && (
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-neon-pink rounded-full animate-pulse"></div>
                  <h2 className="text-2xl font-orbitron font-bold text-neon-pink glow-neon-pink">
                    LIVE NOW
                  </h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {liveMatches.map(match => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-2xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-green mb-4">
                Upcoming Matches - Week {currentSeason.currentWeek}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {upcomingMatches.map(match => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </div>

            {completedMatches.length > 0 && (
              <div>
                <h2 className="text-2xl font-orbitron font-bold text-neon-green mb-4">
                  Recent Results
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {completedMatches.map(match => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'leaderboard' && <Leaderboard users={users} />}
        {activeTab === 'punishments' && <Punishments punishments={punishments} />}
        {activeTab === 'league' && <League season={currentSeason} users={users} />}
      </main>

      <footer className="bg-cyber-darker border-t-2 border-neon-cyan mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-cyber-text-dim font-exo text-sm">
            PicksArena © 2024 - Where Predictions Meet Glory
          </p>
          <p className="text-cyber-text-dim font-exo text-xs mt-2">
            Built with <span className="text-neon-pink">♥</span> in the Cyberpunk Future
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
