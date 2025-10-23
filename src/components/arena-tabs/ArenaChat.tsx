import React, { useState } from 'react';
import { MessageSquare, Send, Smile } from 'lucide-react';
import { Arena } from '../../types';
import { users } from '../../data/mockData';

interface ArenaChatProps {
  arena: Arena;
}

interface Message {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  message: string;
  timestamp: string;
}

const ArenaChat: React.FC<ArenaChatProps> = ({ arena }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      userId: 'u1',
      userName: 'NeonMaster',
      userAvatar: users[0].avatar,
      message: 'Who else thinks the Cyber Warriors are taking it this week? 🔥',
      timestamp: '2 hours ago',
    },
    {
      id: 'm2',
      userId: 'u2',
      userName: 'CyberProphet',
      userAvatar: users[1].avatar,
      message: 'Nah, Neon Knights all the way! They\'ve been on fire lately 💪',
      timestamp: '1 hour ago',
    },
    {
      id: 'm3',
      userId: 'u3',
      userName: 'GlitchGuru',
      userAvatar: users[2].avatar,
      message: 'I\'m going with the underdog this time. Digital Dragons FTW!',
      timestamp: '45 minutes ago',
    },
    {
      id: 'm4',
      userId: 'u4',
      userName: 'PixelPredictor',
      userAvatar: users[3].avatar,
      message: 'Anyone else nervous about their picks? 😅',
      timestamp: '30 minutes ago',
    },
    {
      id: 'm5',
      userId: 'u1',
      userName: 'NeonMaster',
      userAvatar: users[0].avatar,
      message: 'Confident in my streak! Let\'s see who comes out on top 🏆',
      timestamp: '15 minutes ago',
    },
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: `m${messages.length + 1}`,
      userId: 'current-user',
      userName: 'You',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
      message: message.trim(),
      timestamp: 'Just now',
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-cyber-darker rounded-xl p-6 border-2 border-neon-green box-glow-green">
        <div className="flex items-center space-x-3">
          <MessageSquare className="w-6 h-6 text-neon-green" />
          <h2 className="text-2xl font-orbitron font-bold text-neon-green">
            Arena Chat
          </h2>
        </div>
        <p className="text-cyber-text-dim font-exo mt-2">
          Talk trash, share predictions, and celebrate victories with {arena.memberCount} members
        </p>
      </div>

      <div className="bg-cyber-darker rounded-xl border-2 border-cyber-text-dim overflow-hidden">
        <div className="h-[500px] overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => {
            const isCurrentUser = msg.userId === 'current-user';
            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <img
                  src={msg.userAvatar}
                  alt={msg.userName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-neon-cyan flex-shrink-0"
                />
                <div className={`flex-1 ${isCurrentUser ? 'text-right' : ''}`}>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`font-orbitron font-bold text-sm text-neon-cyan ${isCurrentUser ? 'order-2' : ''}`}>
                      {msg.userName}
                    </span>
                    <span className={`text-xs text-cyber-text-dim font-exo ${isCurrentUser ? 'order-1' : ''}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                  <div
                    className={`
                      inline-block p-3 rounded-lg font-exo
                      ${isCurrentUser 
                        ? 'bg-gradient-to-r from-neon-cyan to-neon-green text-cyber-dark' 
                        : 'bg-cyber-darkest text-cyber-text'
                      }
                    `}
                  >
                    {msg.message}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 bg-cyber-darkest border-t-2 border-cyber-text-dim">
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-cyber-darker rounded-lg transition-colors duration-300">
              <Smile className="w-5 h-5 text-neon-yellow" />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 bg-cyber-darker border-2 border-cyber-text-dim rounded-lg px-4 py-3 text-cyber-text font-exo focus:outline-none focus:border-neon-cyan transition-colors duration-300"
            />
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className={`
                p-3 rounded-lg transition-all duration-300
                ${message.trim()
                  ? 'bg-gradient-to-r from-neon-cyan to-neon-green text-cyber-dark hover:scale-105 box-glow-cyan'
                  : 'bg-cyber-darker text-cyber-text-dim cursor-not-allowed'
                }
              `}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArenaChat;
