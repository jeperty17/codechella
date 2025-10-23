import React from 'react';
import { Trophy, Zap, Target, ArrowRight } from 'lucide-react';

interface LandingProps {
  onEnter: () => void;
}

const Landing: React.FC<LandingProps> = ({ onEnter }) => {
  return (
    <div className="min-h-screen bg-cyber-dark circuit-pattern flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-pink/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-neon-green/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating icons */}
      <div className="absolute top-20 left-20 animate-float">
        <Trophy className="w-12 h-12 text-neon-pink/30" />
      </div>
      <div className="absolute top-40 right-32 animate-float" style={{ animationDelay: '1s' }}>
        <Zap className="w-10 h-10 text-neon-cyan/30" />
      </div>
      <div className="absolute bottom-32 left-40 animate-float" style={{ animationDelay: '2s' }}>
        <Target className="w-14 h-14 text-neon-green/30" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-neon-pink via-neon-cyan to-neon-green rounded-2xl flex items-center justify-center box-glow-pink animate-pulse-glow">
              <Trophy className="w-14 h-14 text-cyber-dark" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-neon-green rounded-full animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-neon-cyan rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>

        {/* Title */}
        <h1 
          className="text-6xl md:text-8xl font-orbitron font-black mb-6 glitch"
          data-text="PicksArena"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-green glow-neon-cyan">
            PicksArena
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-2xl md:text-4xl font-exo font-light text-cyber-text mb-4">
          <span className="text-neon-pink glow-neon-pink">Predict.</span>{' '}
          <span className="text-neon-cyan glow-neon-cyan">Compete.</span>{' '}
          <span className="text-neon-green glow-neon-green">Dominate.</span>
        </p>

        <p className="text-cyber-text-dim font-exo text-lg mb-12 max-w-2xl mx-auto">
          Join the ultimate sports prediction arena where friends compete, climb leaderboards, 
          and face epic punishments. Your predictions, your glory.
        </p>

        {/* Enter button */}
        <button
          onClick={onEnter}
          className="group relative px-12 py-6 bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-green rounded-xl font-orbitron font-bold text-2xl text-cyber-dark hover:scale-110 transition-all duration-300 box-glow-pink overflow-hidden"
        >
          <span className="relative z-10 flex items-center space-x-3">
            <span>ENTER ARENA</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
          </span>
          
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan via-neon-green to-neon-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        {/* Stats preview */}
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="bg-cyber-darker/50 backdrop-blur-sm rounded-lg p-4 border border-neon-pink/30 hover:border-neon-pink transition-all duration-300">
            <div className="text-3xl font-orbitron font-bold text-neon-pink mb-1">1000+</div>
            <div className="text-cyber-text-dim text-sm font-exo">Active Players</div>
          </div>
          <div className="bg-cyber-darker/50 backdrop-blur-sm rounded-lg p-4 border border-neon-cyan/30 hover:border-neon-cyan transition-all duration-300">
            <div className="text-3xl font-orbitron font-bold text-neon-cyan mb-1">50K+</div>
            <div className="text-cyber-text-dim text-sm font-exo">Predictions Made</div>
          </div>
          <div className="bg-cyber-darker/50 backdrop-blur-sm rounded-lg p-4 border border-neon-green/30 hover:border-neon-green transition-all duration-300">
            <div className="text-3xl font-orbitron font-bold text-neon-green mb-1">24/7</div>
            <div className="text-cyber-text-dim text-sm font-exo">Live Matches</div>
          </div>
        </div>
      </div>

      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="scan-line h-full"></div>
      </div>
    </div>
  );
};

export default Landing;
