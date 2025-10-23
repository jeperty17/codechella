import React, { useState } from 'react';
import { X, Trophy, Users, Flame } from 'lucide-react';

export interface ArenaFormData {
  name: string;
  leagueType: string;
  description: string;
  punishment: string;
}

interface CreateArenaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ArenaFormData) => void;
}

const CreateArenaModal: React.FC<CreateArenaModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<ArenaFormData>({
    name: '',
    leagueType: 'nfl',
    description: '',
    punishment: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ArenaFormData, string>>>({});

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ArenaFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Arena name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Arena name must be at least 3 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      setFormData({ name: '', leagueType: 'nfl', description: '', punishment: '' });
      setErrors({});
    }
  };

  const handleChange = (field: keyof ArenaFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-cyber-darker rounded-2xl border-2 border-neon-cyan box-glow-cyan overflow-hidden">
        <div className="absolute inset-0 circuit-pattern opacity-10"></div>
        
        <div className="relative p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-cyber-text-dim hover:text-neon-pink transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="mb-6">
            <h2 className="text-3xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-green mb-2">
              Create New Arena
            </h2>
            <p className="text-cyber-text-dim font-exo">
              Set up your prediction battleground
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-cyber-text font-orbitron font-semibold mb-2">
                Arena Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g., Office Warriors, College Crew"
                className={`w-full px-4 py-3 bg-cyber-dark border-2 rounded-lg font-exo text-cyber-text placeholder-cyber-text-dim focus:outline-none focus:border-neon-cyan transition-colors duration-200 ${
                  errors.name ? 'border-red-500' : 'border-cyber-text-dim'
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500 font-exo">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-cyber-text font-orbitron font-semibold mb-2">
                League Type *
              </label>
              <select
                value={formData.leagueType}
                onChange={(e) => handleChange('leagueType', e.target.value)}
                className="w-full px-4 py-3 bg-cyber-dark border-2 border-cyber-text-dim rounded-lg font-exo text-cyber-text focus:outline-none focus:border-neon-cyan transition-colors duration-200"
              >
                <option value="nfl">NFL</option>
                <option value="nba">NBA</option>
                <option value="mlb">MLB</option>
                <option value="nhl">NHL</option>
                <option value="soccer">Soccer</option>
                <option value="mixed">Mixed Sports</option>
              </select>
            </div>

            <div>
              <label className="block text-cyber-text font-orbitron font-semibold mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Describe your arena and what makes it special..."
                rows={3}
                className={`w-full px-4 py-3 bg-cyber-dark border-2 rounded-lg font-exo text-cyber-text placeholder-cyber-text-dim focus:outline-none focus:border-neon-cyan transition-colors duration-200 resize-none ${
                  errors.description ? 'border-red-500' : 'border-cyber-text-dim'
                }`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500 font-exo">{errors.description}</p>
              )}
            </div>

            <div>
              <label className="block text-cyber-text font-orbitron font-semibold mb-2">
                Season Punishment (Optional)
              </label>
              <input
                type="text"
                value={formData.punishment}
                onChange={(e) => handleChange('punishment', e.target.value)}
                placeholder="e.g., Loser buys lunch, Karaoke challenge"
                className="w-full px-4 py-3 bg-cyber-dark border-2 border-cyber-text-dim rounded-lg font-exo text-cyber-text placeholder-cyber-text-dim focus:outline-none focus:border-neon-cyan transition-colors duration-200"
              />
              <p className="mt-1 text-xs text-cyber-text-dim font-exo">
                What happens to the last place finisher?
              </p>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-cyber-dark border-2 border-cyber-text-dim rounded-lg font-orbitron font-bold text-cyber-text hover:border-neon-pink hover:text-neon-pink transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-neon-cyan to-neon-green rounded-lg font-orbitron font-bold text-cyber-dark hover:scale-105 transition-all duration-300 box-glow-cyan"
              >
                Create Arena
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateArenaModal;
