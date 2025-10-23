export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  totalPoints: number;
  points: number;
  rank: number;
  correctPicks: number;
  totalPicks: number;
  currentStreak: number;
  streak: number;
  bestStreak: number;
  joinedAt: string;
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  sport: string;
  date: string;
  time: string;
  venue?: string;
  league: string;
  status: 'upcoming' | 'live' | 'completed';
  homeScore?: number;
  awayScore?: number;
  week: number;
  homeOdds: number;
  awayOdds: number;
}

export interface Prediction {
  id: string;
  userId: string;
  matchId: string;
  predictedWinner: 'home' | 'away';
  confidence: number;
  points?: number;
  isCorrect?: boolean;
  submittedAt: string;
}

export interface Pick {
  id: string;
  userId: string;
  matchId: string;
  arenaId: string;
  predictedWinner: 'home' | 'away';
  confidence: number;
  points?: number;
  isCorrect?: boolean;
  submittedAt: string;
}

export interface SubmittedPick {
  matchId: string;
  selectedTeam: 'home' | 'away';
  betAmount: number;
  odds: number;
  potentialWinnings: number;
  timestamp: string;
}

export interface Season {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  currentWeek: number;
  totalWeeks: number;
  status: 'upcoming' | 'active' | 'completed';
}

export interface Arena {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  createdBy: string;
  createdAt: string;
  season: Season;
  image: string;
  code: string;
  league: string;
  punishment?: string;
  creatorId?: string;
}

export interface ArenaInput {
  name: string;
  league: string;
  description: string;
  punishment?: string;
  creatorId: string;
  code: string;
}

export interface LeaderboardEntry extends User {
  rank: number;
  weeklyPoints: number;
  trend: 'up' | 'down' | 'same';
  rankChange?: number; // Positive = moved up, Negative = moved down, 0 = no change
}

export interface Punishment {
  id: string;
  title: string;
  description: string;
  severity: 'mild' | 'medium' | 'spicy';
  icon: string;
}
