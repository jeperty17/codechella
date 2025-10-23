import React, { useState } from 'react';
import { Settings, Users, Bell, Lock, Trash2, LogOut } from 'lucide-react';
import { Arena } from '../../types';

interface ArenaSettingsProps {
  arena: Arena;
}

const ArenaSettings: React.FC<ArenaSettingsProps> = ({ arena }) => {
  const [notifications, setNotifications] = useState(true);
  const [showConfirmLeave, setShowConfirmLeave] = useState(false);

  const isCreator = arena.createdBy === 'You';

  return (
    <div className="space-y-6">
      <div className="bg-cyber-darker rounded-xl p-6 border-2 border-neon-cyan box-glow-cyan">
        <div className="flex items-center space-x-3">
          <Settings className="w-6 h-6 text-neon-cyan" />
          <h2 className="text-2xl font-orbitron font-bold text-neon-cyan">
            Arena Settings
          </h2>
        </div>
      </div>

      <div className="bg-cyber-darker rounded-xl p-6 border-2 border-cyber-text-dim">
        <div className="flex items-center space-x-3 mb-4">
          <Users className="w-5 h-5 text-neon-green" />
          <h3 className="text-lg font-orbitron font-bold text-neon-green">
            Arena Information
          </h3>
        </div>
        <div className="space-y-3 text-cyber-text font-exo">
          <div className="flex items-center justify-between p-3 bg-cyber-darkest rounded-lg">
            <span className="text-cyber-text-dim">Arena Name:</span>
            <span className="text-neon-cyan font-bold">{arena.name}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-cyber-darkest rounded-lg">
            <span className="text-cyber-text-dim">League:</span>
            <span className="text-neon-green font-bold">{arena.league}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-cyber-darkest rounded-lg">
            <span className="text-cyber-text-dim">Created By:</span>
            <span className="text-neon-pink font-bold">{arena.createdBy}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-cyber-darkest rounded-lg">
            <span className="text-cyber-text-dim">Members:</span>
            <span className="text-neon-yellow font-bold">{arena.memberCount}</span>
          </div>
        </div>
      </div>

      <div className="bg-cyber-darker rounded-xl p-6 border-2 border-cyber-text-dim">
        <div className="flex items-center space-x-3 mb-4">
          <Bell className="w-5 h-5 text-neon-cyan" />
          <h3 className="text-lg font-orbitron font-bold text-neon-cyan">
            Notifications
          </h3>
        </div>
        <div className="flex items-center justify-between p-4 bg-cyber-darkest rounded-lg">
          <div>
            <div className="text-cyber-text font-exo font-bold">Match Reminders</div>
            <div className="text-cyber-text-dim font-exo text-sm">
              Get notified before matches start
            </div>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`
              relative w-14 h-8 rounded-full transition-all duration-300
              ${notifications ? 'bg-neon-green' : 'bg-cyber-text-dim'}
            `}
          >
            <div
              className={`
                absolute top-1 w-6 h-6 bg-cyber-dark rounded-full transition-all duration-300
                ${notifications ? 'left-7' : 'left-1'}
              `}
            />
          </button>
        </div>
      </div>

      {isCreator && (
        <div className="bg-cyber-darker rounded-xl p-6 border-2 border-neon-pink">
          <div className="flex items-center space-x-3 mb-4">
            <Lock className="w-5 h-5 text-neon-pink" />
            <h3 className="text-lg font-orbitron font-bold text-neon-pink">
              Creator Controls
            </h3>
          </div>
          <div className="space-y-3">
            <button className="w-full p-4 bg-cyber-darkest rounded-lg text-left hover:bg-neon-cyan/10 transition-colors duration-300 border-2 border-transparent hover:border-neon-cyan">
              <div className="text-neon-cyan font-exo font-bold">Edit Arena Details</div>
              <div className="text-cyber-text-dim font-exo text-sm">
                Update name, description, and rules
              </div>
            </button>
            <button className="w-full p-4 bg-cyber-darkest rounded-lg text-left hover:bg-neon-green/10 transition-colors duration-300 border-2 border-transparent hover:border-neon-green">
              <div className="text-neon-green font-exo font-bold">Manage Members</div>
              <div className="text-cyber-text-dim font-exo text-sm">
                View and remove members
              </div>
            </button>
          </div>
        </div>
      )}

      <div className="bg-cyber-darker rounded-xl p-6 border-2 border-neon-pink">
        <div className="flex items-center space-x-3 mb-4">
          <LogOut className="w-5 h-5 text-neon-pink" />
          <h3 className="text-lg font-orbitron font-bold text-neon-pink">
            Danger Zone
          </h3>
        </div>
        {!showConfirmLeave ? (
          <button
            onClick={() => setShowConfirmLeave(true)}
            className="w-full p-4 bg-neon-pink/10 rounded-lg text-neon-pink font-orbitron font-bold hover:bg-neon-pink hover:text-cyber-dark transition-all duration-300 border-2 border-neon-pink"
          >
            Leave Arena
          </button>
        ) : (
          <div className="space-y-3">
            <p className="text-cyber-text font-exo text-sm">
              Are you sure you want to leave this arena? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirmLeave(false)}
                className="flex-1 p-3 bg-cyber-darkest rounded-lg text-cyber-text font-orbitron font-bold hover:bg-cyber-text-dim transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={() => console.log('Leave arena')}
                className="flex-1 p-3 bg-neon-pink rounded-lg text-cyber-dark font-orbitron font-bold hover:scale-105 transition-all duration-300 box-glow-pink"
              >
                Confirm Leave
              </button>
            </div>
          </div>
        )}
      </div>

      {isCreator && (
        <div className="bg-gradient-to-r from-neon-pink/20 to-red-500/20 rounded-xl p-6 border-2 border-red-500">
          <div className="flex items-center space-x-3 mb-4">
            <Trash2 className="w-5 h-5 text-red-500" />
            <h3 className="text-lg font-orbitron font-bold text-red-500">
              Delete Arena
            </h3>
          </div>
          <p className="text-cyber-text-dim font-exo text-sm mb-4">
            Permanently delete this arena and all associated data. This action cannot be undone.
          </p>
          <button className="w-full p-4 bg-red-500/10 rounded-lg text-red-500 font-orbitron font-bold hover:bg-red-500 hover:text-white transition-all duration-300 border-2 border-red-500">
            Delete Arena Permanently
          </button>
        </div>
      )}
    </div>
  );
};

export default ArenaSettings;
