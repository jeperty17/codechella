import React, { useState, useEffect } from 'react';
import { Plus, Users, Calendar, ArrowRight, UserPlus, ArrowLeft, Copy, Check } from 'lucide-react';
import { Arena } from '../types';
import CreateArenaModal, { ArenaFormData } from './CreateArenaModal';
import JoinArenaModal from './JoinArenaModal';
import { generateUniqueArenaCode, formatArenaCode } from '../utils/arenaCode';
import { arenas as mockArenas } from '../data/mockData';

interface ArenaHubProps {
  onSelectArena: (arenaId: string) => void;
  onCreateArena: () => void;
  onJoinArena: () => void;
  onBackToHome: () => void;
}

const STORAGE_KEY = 'picksarena_custom_arenas';

const ArenaHub: React.FC<ArenaHubProps> = ({ 
  onSelectArena, 
  onBackToHome 
}) => {
  const [customArenas, setCustomArenas] = useState<Arena[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [joinError, setJoinError] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Load custom arenas from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCustomArenas(parsed);
      } catch (error) {
        console.error('Error parsing stored arenas:', error);
      }
    }
  }, []);

  // Save custom arenas to localStorage whenever they change
  useEffect(() => {
    if (customArenas.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customArenas));
    }
  }, [customArenas]);

  // Combine custom arenas with mock arenas
  const allArenas = [...customArenas, ...mockArenas];

  const handleCreateArena = async (formData: ArenaFormData) => {
    // Generate unique arena code
    const arenaCode = await generateUniqueArenaCode();

    const newArena: Arena = {
      id: `arena-${Date.now()}`,
      name: formData.name,
      league: formData.leagueType,
      description: formData.description,
      punishment: formData.punishment,
      memberCount: 1,
      createdBy: 'You',
      createdAt: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      season: {
        id: `season-${Date.now()}`,
        name: `${formData.leagueType.toUpperCase()} Season 2024`,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        currentWeek: 1,
        totalWeeks: 12,
        status: 'active',
      },
      image: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      code: arenaCode,
    };

    setCustomArenas(prev => [newArena, ...prev]);
    setIsCreateModalOpen(false);
  };

  const handleJoinArena = async (arenaCode: string) => {
    // Find arena by code in all arenas
    const arena = allArenas.find(a => a.code === arenaCode);

    if (!arena) {
      setJoinError('Arena not found. Please check the code and try again.');
      return;
    }

    // Check if user is the creator
    if (arena.createdBy === 'You') {
      setJoinError('You cannot join your own arena!');
      return;
    }

    // Check if already a member
    const alreadyMember = customArenas.some(a => a.id === arena.id);
    if (alreadyMember) {
      setJoinError('You are already a member of this arena!');
      return;
    }

    // Add to custom arenas with incremented member count
    const joinedArena: Arena = {
      ...arena,
      memberCount: arena.memberCount + 1,
    };

    setCustomArenas(prev => [joinedArena, ...prev]);
    setIsJoinModalOpen(false);
    setJoinError('');
    onSelectArena(arena.id);
  };

  const handleCopyCode = async (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  const handleOpenJoinModal = () => {
    setJoinError('');
    setIsJoinModalOpen(true);
  };

  return (
    <>
      <div className="min-h-screen bg-cyber-dark circuit-pattern py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBackToHome}
            className="group flex items-center space-x-2 mb-6 px-6 py-3 bg-cyber-darker rounded-lg border-2 border-neon-pink hover:bg-neon-pink hover:text-cyber-dark transition-all duration-300 box-glow-pink"
          >
            <ArrowLeft className="w-5 h-5 text-neon-pink group-hover:text-cyber-dark group-hover:-translate-x-1 transition-all duration-300" />
            <span className="font-orbitron font-bold text-neon-pink group-hover:text-cyber-dark">
              Back to Home
            </span>
          </button>

          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-green mb-2">
              Your Arenas
            </h1>
            <p className="text-cyber-text-dim font-exo text-lg">
              Choose your battleground and start making predictions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="group relative px-8 py-6 bg-gradient-to-r from-neon-pink to-neon-cyan rounded-xl font-orbitron font-bold text-lg text-cyber-dark hover:scale-105 transition-all duration-300 box-glow-pink overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center space-x-3">
                <Plus className="w-6 h-6" />
                <span>CREATE ARENA</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button
              onClick={handleOpenJoinModal}
              className="group relative px-8 py-6 bg-cyber-darker rounded-xl font-orbitron font-bold text-lg text-neon-cyan border-2 border-neon-cyan hover:bg-neon-cyan hover:text-cyber-dark hover:scale-105 transition-all duration-300 border-glow-cyan overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center space-x-3">
                <UserPlus className="w-6 h-6" />
                <span>JOIN ARENA</span>
              </span>
            </button>
          </div>

          {allArenas.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-block p-8 bg-cyber-darker rounded-2xl border-2 border-neon-cyan/30">
                <Users className="w-16 h-16 text-neon-cyan mx-auto mb-4" />
                <h3 className="text-2xl font-orbitron font-bold text-neon-cyan mb-2">
                  No Arenas Yet
                </h3>
                <p className="text-cyber-text-dim font-exo">
                  Create your first arena or join an existing one to get started!
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allArenas.map((arena) => (
                <div
                  key={arena.id}
                  onClick={() => onSelectArena(arena.id)}
                  className="group relative bg-cyber-darker rounded-xl overflow-hidden border-2 border-cyber-text-dim hover:border-neon-cyan transition-all duration-300 cursor-pointer hover:scale-105"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={arena.image}
                      alt={arena.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyber-darker via-cyber-darker/50 to-transparent"></div>
                    
                    <div className="absolute top-4 right-4 flex items-center space-x-2 bg-cyber-dark/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-neon-green">
                      <Users className="w-4 h-4 text-neon-green" />
                      <span className="text-neon-green font-orbitron font-bold text-sm">
                        {arena.memberCount}
                      </span>
                    </div>

                    <div className="absolute top-4 left-4 flex items-center space-x-2 bg-neon-cyan/20 backdrop-blur-sm px-3 py-2 rounded-lg border-2 border-neon-cyan">
                      <span className="text-neon-cyan font-orbitron font-bold text-sm tracking-wider">
                        {formatArenaCode(arena.code)}
                      </span>
                      <button
                        onClick={(e) => handleCopyCode(arena.code, e)}
                        className="p-1 hover:bg-neon-cyan/30 rounded transition-colors duration-200"
                        title="Copy arena code"
                      >
                        {copiedCode === arena.code ? (
                          <Check className="w-4 h-4 text-neon-green" />
                        ) : (
                          <Copy className="w-4 h-4 text-neon-cyan" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-green mb-2">
                      {arena.name}
                    </h3>
                    <p className="text-cyber-text-dim font-exo text-sm mb-4">
                      {arena.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-cyber-text-dim font-exo mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>Created {arena.createdAt}</span>
                      </div>
                      <span className="text-neon-cyan">by {arena.createdBy}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-neon-green font-orbitron font-bold">
                        {arena.season.name}
                      </div>
                      <ArrowRight className="w-5 h-5 text-neon-cyan group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>

                  <div className="absolute inset-0 border-2 border-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none box-glow-cyan"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <CreateArenaModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateArena}
      />

      <JoinArenaModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        onSubmit={handleJoinArena}
        error={joinError}
      />
    </>
  );
};

export default ArenaHub;
