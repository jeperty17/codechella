import React, { useState, useEffect } from 'react';
import { Target, Clock, CheckCircle, TrendingUp, TrendingDown, Coins, DollarSign, Check, Edit2, Trophy, AlertCircle } from 'lucide-react';
import { Arena, SubmittedPick } from '../../types';
import { matches } from '../../data/mockData';

interface MakePicksProps {
  arena: Arena;
}

interface PickData {
  winner: 'home' | 'away';
  betAmount: number;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

const MakePicks: React.FC<MakePicksProps> = ({ arena }) => {
  const [picks, setPicks] = useState<Record<string, PickData>>({});
  const [virtualBalance] = useState(1000);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedPicks, setSubmittedPicks] = useState<SubmittedPick[]>([]);
  const [editingMatchId, setEditingMatchId] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 });
  
  // Filter matches by arena's league and current week
  const leagueMatches = matches.filter(
    m => m.status === 'upcoming' && 
    m.week === arena.season.currentWeek && 
    m.league === arena.league
  );

  // Calculate weekly deadline (Sunday 11:59 PM)
  const getWeeklyDeadline = (): Date => {
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sunday, 6 = Saturday
    const daysUntilSunday = currentDay === 0 ? 7 : 7 - currentDay;
    
    const deadline = new Date(now);
    deadline.setDate(now.getDate() + daysUntilSunday);
    deadline.setHours(23, 59, 59, 999);
    
    return deadline;
  };

  // Calculate time remaining
  const calculateTimeRemaining = (): TimeRemaining => {
    const deadline = getWeeklyDeadline();
    const now = new Date();
    const total = deadline.getTime() - now.getTime();

    if (total <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    }

    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds, total };
  };

  // Update countdown timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    // Initial calculation
    setTimeRemaining(calculateTimeRemaining());

    return () => clearInterval(timer);
  }, []);

  const isDeadlinePassed = timeRemaining.total <= 0;

  // Load submitted picks from localStorage on mount
  useEffect(() => {
    const storageKey = `arena-${arena.id}-week-${arena.season.currentWeek}-picks`;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const parsedPicks = JSON.parse(stored) as SubmittedPick[];
        setSubmittedPicks(parsedPicks);
      } catch (error) {
        console.error('Error loading picks:', error);
      }
    }
  }, [arena.id, arena.season.currentWeek]);

  const handleWinnerSelect = (matchId: string, winner: 'home' | 'away') => {
    if (isDeadlinePassed) return;
    
    setPicks(prev => ({
      ...prev,
      [matchId]: {
        winner,
        betAmount: prev[matchId]?.betAmount || 50,
      },
    }));
  };

  const handleBetAmountChange = (matchId: string, amount: number) => {
    if (isDeadlinePassed) return;
    
    setPicks(prev => ({
      ...prev,
      [matchId]: {
        ...prev[matchId],
        betAmount: amount,
      },
    }));
  };

  const calculatePotentialWinnings = (matchId: string): number => {
    const pick = picks[matchId];
    if (!pick) return 0;

    const match = leagueMatches.find(m => m.id === matchId);
    if (!match) return 0;

    const odds = pick.winner === 'home' ? match.homeOdds : match.awayOdds;
    return pick.betAmount * odds;
  };

  const calculateSliderPercentage = (value: number, min: number, max: number): number => {
    return ((value - min) / (max - min)) * 100;
  };

  const handleSubmitPicks = () => {
    if (isDeadlinePassed) return;
    
    const picksToSubmit: SubmittedPick[] = Object.entries(picks).map(([matchId, pickData]) => {
      const match = leagueMatches.find(m => m.id === matchId);
      const odds = pickData.winner === 'home' ? match!.homeOdds : match!.awayOdds;
      const potentialWinnings = calculatePotentialWinnings(matchId);

      return {
        matchId,
        selectedTeam: pickData.winner,
        betAmount: pickData.betAmount,
        odds,
        potentialWinnings,
        timestamp: new Date().toISOString(),
      };
    });

    const storageKey = `arena-${arena.id}-week-${arena.season.currentWeek}-picks`;
    localStorage.setItem(storageKey, JSON.stringify(picksToSubmit));
    setSubmittedPicks(picksToSubmit);
    setPicks({});
    setEditingMatchId(null);

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleEditPick = (matchId: string) => {
    if (isDeadlinePassed) return;
    
    const submittedPick = submittedPicks.find(p => p.matchId === matchId);
    if (submittedPick) {
      setPicks({
        [matchId]: {
          winner: submittedPick.selectedTeam,
          betAmount: submittedPick.betAmount,
        },
      });
      setEditingMatchId(matchId);
    }
  };

  const handleSaveEdit = () => {
    if (!editingMatchId || isDeadlinePassed) return;

    const updatedPicks = submittedPicks.map(pick => {
      if (pick.matchId === editingMatchId) {
        const pickData = picks[editingMatchId];
        const match = leagueMatches.find(m => m.id === editingMatchId);
        const odds = pickData.winner === 'home' ? match!.homeOdds : match!.awayOdds;
        const potentialWinnings = pickData.betAmount * odds;

        return {
          matchId: editingMatchId,
          selectedTeam: pickData.winner,
          betAmount: pickData.betAmount,
          odds,
          potentialWinnings,
          timestamp: new Date().toISOString(),
        };
      }
      return pick;
    });

    const storageKey = `arena-${arena.id}-week-${arena.season.currentWeek}-picks`;
    localStorage.setItem(storageKey, JSON.stringify(updatedPicks));
    setSubmittedPicks(updatedPicks);
    setPicks({});
    setEditingMatchId(null);

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleCancelEdit = () => {
    setPicks({});
    setEditingMatchId(null);
  };

  const totalBetAmount = Object.values(picks).reduce((sum, pick) => sum + pick.betAmount, 0);
  const picksCount = Object.keys(picks).length;

  const getOddsColor = (odds: number) => {
    if (odds < 1.80) return 'text-neon-green';
    if (odds < 2.00) return 'text-neon-cyan';
    return 'text-neon-pink';
  };

  const getMatchById = (matchId: string) => {
    return leagueMatches.find(m => m.id === matchId);
  };

  const totalSubmittedBet = submittedPicks.reduce((sum, pick) => sum + pick.betAmount, 0);
  const totalPotentialWinnings = submittedPicks.reduce((sum, pick) => sum + pick.potentialWinnings, 0);

  // Countdown Timer Component
  const CountdownTimer = () => {
    if (isDeadlinePassed) {
      return (
        <div className="bg-gradient-to-r from-neon-pink to-red-600 rounded-xl p-6 border-2 border-neon-pink box-glow-pink">
          <div className="flex items-center justify-center space-x-3">
            <AlertCircle className="w-8 h-8 text-white animate-pulse" />
            <div className="text-center">
              <h3 className="text-2xl font-orbitron font-bold text-white">
                DEADLINE PASSED
              </h3>
              <p className="text-white font-exo text-sm mt-1">
                Pick submissions are now closed for this week
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-cyber-darker rounded-xl p-6 border-2 border-neon-yellow box-glow-yellow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Clock className="w-6 h-6 text-neon-yellow animate-pulse" />
            <div>
              <h3 className="text-lg font-orbitron font-bold text-neon-yellow">
                Time left to submit this week's picks
              </h3>
              <p className="text-cyber-text-dim font-exo text-xs mt-1">
                Deadline: Sunday 11:59 PM
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {timeRemaining.days > 0 && (
              <div className="text-center">
                <div className="text-3xl font-orbitron font-bold text-neon-cyan">
                  {timeRemaining.days}
                </div>
                <div className="text-xs font-exo text-cyber-text-dim">
                  DAYS
                </div>
              </div>
            )}
            
            <div className="text-center">
              <div className="text-3xl font-orbitron font-bold text-neon-green">
                {String(timeRemaining.hours).padStart(2, '0')}
              </div>
              <div className="text-xs font-exo text-cyber-text-dim">
                HOURS
              </div>
            </div>
            
            <div className="text-2xl font-orbitron font-bold text-cyber-text-dim">:</div>
            
            <div className="text-center">
              <div className="text-3xl font-orbitron font-bold text-neon-pink">
                {String(timeRemaining.minutes).padStart(2, '0')}
              </div>
              <div className="text-xs font-exo text-cyber-text-dim">
                MINUTES
              </div>
            </div>
            
            <div className="text-2xl font-orbitron font-bold text-cyber-text-dim">:</div>
            
            <div className="text-center">
              <div className="text-3xl font-orbitron font-bold text-neon-yellow">
                {String(timeRemaining.seconds).padStart(2, '0')}
              </div>
              <div className="text-xs font-exo text-cyber-text-dim">
                SECONDS
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Show "My Picks This Week" if picks are submitted and not editing
  if (submittedPicks.length > 0 && !editingMatchId) {
    return (
      <div className="space-y-6">
        {/* Countdown Timer */}
        <CountdownTimer />

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
            <div className="bg-gradient-to-r from-neon-green to-neon-cyan rounded-xl p-4 border-2 border-neon-green box-glow-green shadow-2xl">
              <div className="flex items-center space-x-3">
                <div className="bg-cyber-dark rounded-full p-2">
                  <Check className="w-6 h-6 text-neon-green" />
                </div>
                <div>
                  <h3 className="font-orbitron font-bold text-cyber-dark text-lg">
                    Picks Updated Successfully!
                  </h3>
                  <p className="font-exo text-cyber-dark text-sm">
                    Your changes have been saved
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="bg-cyber-darker rounded-xl p-6 border-2 border-neon-cyan box-glow-cyan">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Trophy className="w-6 h-6 text-neon-cyan" />
              <div>
                <h2 className="text-2xl font-orbitron font-bold text-neon-cyan">
                  My Picks This Week
                </h2>
                <p className="text-cyber-text-dim font-exo text-sm mt-1">
                  {arena.league} - Week {arena.season.currentWeek}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-orbitron font-bold text-neon-yellow">
                {submittedPicks.length}
              </div>
              <div className="text-cyber-text-dim font-exo text-xs">
                Picks Submitted
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-cyber-darker rounded-xl p-4 border-2 border-neon-yellow">
            <div className="flex items-center space-x-3">
              <Coins className="w-8 h-8 text-neon-yellow" />
              <div>
                <div className="text-2xl font-orbitron font-bold text-neon-yellow">
                  {totalSubmittedBet}
                </div>
                <div className="text-xs font-exo text-cyber-text-dim">
                  Total Bet Amount
                </div>
              </div>
            </div>
          </div>

          <div className="bg-cyber-darker rounded-xl p-4 border-2 border-neon-green">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8 text-neon-green" />
              <div>
                <div className="text-2xl font-orbitron font-bold text-neon-green">
                  {totalPotentialWinnings.toFixed(2)}
                </div>
                <div className="text-xs font-exo text-cyber-text-dim">
                  Max Potential Winnings
                </div>
              </div>
            </div>
          </div>

          <div className="bg-cyber-darker rounded-xl p-4 border-2 border-neon-pink">
            <div className="flex items-center space-x-3">
              <DollarSign className="w-8 h-8 text-neon-pink" />
              <div>
                <div className="text-2xl font-orbitron font-bold text-neon-pink">
                  +{(totalPotentialWinnings - totalSubmittedBet).toFixed(2)}
                </div>
                <div className="text-xs font-exo text-cyber-text-dim">
                  Potential Profit
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Picks List */}
        <div className="space-y-4">
          {submittedPicks.map((pick) => {
            const match = getMatchById(pick.matchId);
            if (!match) return null;

            const selectedTeamName = pick.selectedTeam === 'home' ? match.homeTeam : match.awayTeam;
            const selectedTeamLogo = pick.selectedTeam === 'home' ? match.homeTeamLogo : match.awayTeamLogo;
            const opposingTeamName = pick.selectedTeam === 'home' ? match.awayTeam : match.homeTeam;

            return (
              <div
                key={pick.matchId}
                className="bg-cyber-darker rounded-xl p-6 border-2 border-neon-cyan hover:border-neon-pink transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-6">
                  {/* Match Info */}
                  <div className="flex-1 space-y-4">
                    {/* Match Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-cyber-darkest rounded-full p-2">
                          <CheckCircle className="w-5 h-5 text-neon-green" />
                        </div>
                        <div>
                          <h3 className="font-orbitron font-bold text-neon-cyan text-lg">
                            {match.homeTeam} vs {match.awayTeam}
                          </h3>
                          <div className="flex items-center space-x-2 text-xs font-exo text-cyber-text-dim mt-1">
                            <Clock className="w-3 h-3" />
                            <span>{match.date} at {match.time}</span>
                            <span>•</span>
                            <span>{match.venue}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pick Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {/* Selected Team */}
                      <div className="bg-cyber-darkest rounded-lg p-4 border-2 border-neon-cyan">
                        <div className="flex items-center space-x-3">
                          <img
                            src={selectedTeamLogo}
                            alt={selectedTeamName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <div className="text-xs font-exo text-cyber-text-dim">
                              Your Pick
                            </div>
                            <div className="font-orbitron font-bold text-neon-cyan text-sm">
                              {selectedTeamName}
                            </div>
                            <div className="text-xs font-exo text-cyber-text-dim">
                              vs {opposingTeamName}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bet Amount */}
                      <div className="bg-cyber-darkest rounded-lg p-4 border-2 border-neon-yellow">
                        <div className="text-xs font-exo text-cyber-text-dim mb-1">
                          Bet Amount
                        </div>
                        <div className="flex items-center space-x-2">
                          <Coins className="w-5 h-5 text-neon-yellow" />
                          <span className="text-2xl font-orbitron font-bold text-neon-yellow">
                            {pick.betAmount}
                          </span>
                        </div>
                      </div>

                      {/* Odds */}
                      <div className="bg-cyber-darkest rounded-lg p-4 border-2 border-neon-pink">
                        <div className="text-xs font-exo text-cyber-text-dim mb-1">
                          Odds
                        </div>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-5 h-5 text-neon-pink" />
                          <span className={`text-2xl font-orbitron font-bold ${getOddsColor(pick.odds)}`}>
                            {pick.odds.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Potential Winnings */}
                      <div className="bg-cyber-darkest rounded-lg p-4 border-2 border-neon-green">
                        <div className="text-xs font-exo text-cyber-text-dim mb-1">
                          Potential Win
                        </div>
                        <div className="flex items-center space-x-2">
                          <Trophy className="w-5 h-5 text-neon-green" />
                          <span className="text-2xl font-orbitron font-bold text-neon-green">
                            {pick.potentialWinnings.toFixed(2)}
                          </span>
                        </div>
                        <div className="text-xs font-exo text-cyber-text-dim mt-1">
                          Profit: +{(pick.potentialWinnings - pick.betAmount).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Edit Button */}
                  <button
                    onClick={() => handleEditPick(pick.matchId)}
                    disabled={isDeadlinePassed}
                    className={`
                      rounded-xl px-6 py-3 font-orbitron font-bold transition-all duration-300 flex items-center space-x-2
                      ${isDeadlinePassed
                        ? 'bg-cyber-darkest border-2 border-cyber-text-dim text-cyber-text-dim cursor-not-allowed opacity-50'
                        : 'bg-cyber-darkest hover:bg-neon-cyan border-2 border-neon-cyan hover:border-neon-cyan text-neon-cyan hover:text-cyber-dark box-glow-cyan hover:scale-105'
                      }
                    `}
                  >
                    <Edit2 className="w-5 h-5" />
                    <span>Edit Pick</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Box */}
        <div className={`rounded-xl p-4 border-2 ${isDeadlinePassed ? 'bg-red-900/20 border-neon-pink' : 'bg-cyber-darker border-cyber-text-dim'}`}>
          <div className="flex items-start space-x-3">
            {isDeadlinePassed ? (
              <AlertCircle className="w-5 h-5 text-neon-pink mt-0.5" />
            ) : (
              <Clock className="w-5 h-5 text-neon-yellow mt-0.5" />
            )}
            <div className="flex-1">
              <h4 className={`font-orbitron font-bold text-sm mb-1 ${isDeadlinePassed ? 'text-neon-pink' : 'text-neon-yellow'}`}>
                {isDeadlinePassed ? 'Picks Are Now Locked' : 'Picks Locked Until Match Start'}
              </h4>
              <p className="text-xs font-exo text-cyber-text-dim">
                {isDeadlinePassed 
                  ? 'The submission deadline has passed. Your picks are locked in for this week. Check back after matches complete to see your results!'
                  : 'You can edit your picks anytime before the deadline. Once the deadline passes, your picks are locked in. Good luck!'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show pick interface (either initial or editing mode)
  return (
    <div className="space-y-6">
      {/* Countdown Timer */}
      <CountdownTimer />

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-neon-green to-neon-cyan rounded-xl p-4 border-2 border-neon-green box-glow-green shadow-2xl">
            <div className="flex items-center space-x-3">
              <div className="bg-cyber-dark rounded-full p-2">
                <Check className="w-6 h-6 text-neon-green" />
              </div>
              <div>
                <h3 className="font-orbitron font-bold text-cyber-dark text-lg">
                  Picks Submitted Successfully!
                </h3>
                <p className="font-exo text-cyber-dark text-sm">
                  {picksCount} pick{picksCount !== 1 ? 's' : ''} saved for Week {arena.season.currentWeek}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header with Balance */}
      <div className="bg-cyber-darker rounded-xl p-6 border-2 border-neon-pink box-glow-pink">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Target className="w-6 h-6 text-neon-pink" />
            <div>
              <h2 className="text-2xl font-orbitron font-bold text-neon-pink">
                {editingMatchId ? 'Edit Your Pick' : 'Make Your Picks'}
              </h2>
              <p className="text-cyber-text-dim font-exo text-sm mt-1">
                {arena.league} - Week {arena.season.currentWeek}
              </p>
            </div>
          </div>
          <div className="text-right space-y-2">
            <div className="flex items-center justify-end space-x-2">
              <Coins className="w-5 h-5 text-neon-yellow" />
              <div>
                <div className="text-2xl font-orbitron font-bold text-neon-yellow">
                  {virtualBalance - totalBetAmount}
                </div>
                <div className="text-cyber-text-dim font-exo text-xs">
                  Available Balance
                </div>
              </div>
            </div>
            <div className="text-sm font-exo text-cyber-text-dim">
              {picksCount} / {editingMatchId ? '1' : leagueMatches.length} Picks Made
            </div>
          </div>
        </div>
      </div>

      {leagueMatches.length === 0 ? (
        <div className="bg-cyber-darker rounded-xl p-12 border-2 border-cyber-text-dim text-center">
          <Clock className="w-16 h-16 text-cyber-text-dim mx-auto mb-4" />
          <h3 className="text-xl font-orbitron font-bold text-cyber-text-dim mb-2">
            No Matches Available
          </h3>
          <p className="text-cyber-text-dim font-exo">
            No {arena.league} matches scheduled for Week {arena.season.currentWeek}. Check back later!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {leagueMatches
            .filter(match => !editingMatchId || match.id === editingMatchId)
            .map((match) => {
              const pick = picks[match.id];
              const homeSelected = pick?.winner === 'home';
              const awaySelected = pick?.winner === 'away';
              const potentialWinnings = calculatePotentialWinnings(match.id);
              
              const minBet = 10;
              const maxBet = Math.min(500, virtualBalance - totalBetAmount + (pick?.betAmount || 0));
              const sliderPercentage = pick ? calculateSliderPercentage(pick.betAmount, minBet, maxBet) : 0;

              return (
                <div
                  key={match.id}
                  className="bg-cyber-darker rounded-xl p-6 border-2 border-cyber-text-dim hover:border-neon-cyan transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 text-sm font-exo text-cyber-text-dim">
                      <Clock className="w-4 h-4" />
                      <span>{match.date} at {match.time}</span>
                    </div>
                    {pick && (
                      <div className="flex items-center space-x-2 text-neon-green">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-orbitron font-bold text-sm">PICKED</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4 items-center mb-6">
                    <button
                      onClick={() => handleWinnerSelect(match.id, 'home')}
                      disabled={isDeadlinePassed}
                      className={`
                        group relative p-6 rounded-xl border-2 transition-all duration-300
                        ${isDeadlinePassed
                          ? 'opacity-50 cursor-not-allowed'
                          : ''
                        }
                        ${homeSelected 
                          ? 'bg-neon-cyan border-neon-cyan text-cyber-dark' 
                          : 'bg-cyber-darkest border-cyber-text-dim hover:border-neon-cyan text-cyber-text'
                        }
                      `}
                    >
                      <div className="flex flex-col items-center space-y-3">
                        <img
                          src={match.homeTeamLogo}
                          alt={match.homeTeam}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <span className={`font-orbitron font-bold text-center text-sm ${homeSelected ? 'text-cyber-dark' : 'text-neon-cyan'}`}>
                          {match.homeTeam}
                        </span>
                        
                        <div className="flex items-center space-x-2">
                          {match.homeOdds < match.awayOdds ? (
                            <TrendingUp className={`w-4 h-4 ${homeSelected ? 'text-cyber-dark' : 'text-neon-green'}`} />
                          ) : (
                            <TrendingDown className={`w-4 h-4 ${homeSelected ? 'text-cyber-dark' : 'text-neon-pink'}`} />
                          )}
                          <span className={`font-orbitron font-bold text-lg ${homeSelected ? 'text-cyber-dark' : getOddsColor(match.homeOdds)}`}>
                            {match.homeOdds.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      {homeSelected && !isDeadlinePassed && (
                        <div className="absolute inset-0 border-2 border-neon-cyan rounded-xl box-glow-cyan pointer-events-none"></div>
                      )}
                    </button>

                    <div className="text-center">
                      <div className="text-2xl font-orbitron font-bold text-cyber-text-dim mb-2">VS</div>
                      <div className="text-xs text-cyber-text-dim font-exo">{match.venue}</div>
                      <div className="mt-2 px-3 py-1 bg-cyber-darkest rounded-full inline-block">
                        <span className="text-xs text-neon-yellow font-orbitron font-bold">{match.league}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleWinnerSelect(match.id, 'away')}
                      disabled={isDeadlinePassed}
                      className={`
                        group relative p-6 rounded-xl border-2 transition-all duration-300
                        ${isDeadlinePassed
                          ? 'opacity-50 cursor-not-allowed'
                          : ''
                        }
                        ${awaySelected 
                          ? 'bg-neon-pink border-neon-pink text-cyber-dark' 
                          : 'bg-cyber-darkest border-cyber-text-dim hover:border-neon-pink text-cyber-text'
                        }
                      `}
                    >
                      <div className="flex flex-col items-center space-y-3">
                        <img
                          src={match.awayTeamLogo}
                          alt={match.awayTeam}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <span className={`font-orbitron font-bold text-center text-sm ${awaySelected ? 'text-cyber-dark' : 'text-neon-pink'}`}>
                          {match.awayTeam}
                        </span>
                        
                        <div className="flex items-center space-x-2">
                          {match.awayOdds < match.homeOdds ? (
                            <TrendingUp className={`w-4 h-4 ${awaySelected ? 'text-cyber-dark' : 'text-neon-green'}`} />
                          ) : (
                            <TrendingDown className={`w-4 h-4 ${awaySelected ? 'text-cyber-dark' : 'text-neon-pink'}`} />
                          )}
                          <span className={`font-orbitron font-bold text-lg ${awaySelected ? 'text-cyber-dark' : getOddsColor(match.awayOdds)}`}>
                            {match.awayOdds.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      {awaySelected && !isDeadlinePassed && (
                        <div className="absolute inset-0 border-2 border-neon-pink rounded-xl box-glow-pink pointer-events-none"></div>
                      )}
                    </button>
                  </div>

                  {pick && (
                    <div className="bg-cyber-darkest rounded-xl p-6 border-2 border-neon-yellow">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <DollarSign className="w-5 h-5 text-neon-yellow" />
                            <span className="font-orbitron font-bold text-neon-yellow">
                              Bet Amount
                            </span>
                          </div>
                          <div className="text-2xl font-orbitron font-bold text-neon-yellow">
                            {pick.betAmount}
                          </div>
                        </div>

                        <div className="relative">
                          <input
                            type="range"
                            min={minBet}
                            max={maxBet}
                            step="10"
                            value={pick.betAmount}
                            onChange={(e) => handleBetAmountChange(match.id, parseInt(e.target.value))}
                            disabled={isDeadlinePassed}
                            className={`w-full h-3 bg-cyber-darker rounded-lg appearance-none cursor-pointer bet-slider ${isDeadlinePassed ? 'opacity-50 cursor-not-allowed' : ''}`}
                            style={{
                              '--slider-progress': `${sliderPercentage}%`
                            } as React.CSSProperties}
                          />
                          <div className="flex justify-between mt-2 text-xs font-exo text-cyber-text-dim">
                            <span>Min: {minBet}</span>
                            <span>Max: {maxBet}</span>
                          </div>
                        </div>

                        <div className="bg-cyber-darker rounded-lg p-4 border-2 border-neon-green">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <TrendingUp className="w-5 h-5 text-neon-green" />
                              <span className="font-exo text-sm text-cyber-text-dim">
                                Potential Winnings
                              </span>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-orbitron font-bold text-neon-green">
                                {potentialWinnings.toFixed(2)}
                              </div>
                              <div className="text-xs font-exo text-cyber-text-dim">
                                Profit: +{(potentialWinnings - pick.betAmount).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      )}

      {leagueMatches.length > 0 && (
        <div className="space-y-4">
          {picksCount > 0 && !editingMatchId && (
            <div className="bg-cyber-darker rounded-xl p-6 border-2 border-neon-cyan box-glow-cyan">
              <h3 className="text-lg font-orbitron font-bold text-neon-cyan mb-4">
                Betting Summary
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-orbitron font-bold text-neon-yellow">
                    {totalBetAmount}
                  </div>
                  <div className="text-xs font-exo text-cyber-text-dim mt-1">
                    Total Bet
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-orbitron font-bold text-neon-green">
                    {Object.keys(picks).reduce((sum, matchId) => sum + calculatePotentialWinnings(matchId), 0).toFixed(2)}
                  </div>
                  <div className="text-xs font-exo text-cyber-text-dim mt-1">
                    Max Winnings
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-orbitron font-bold text-neon-pink">
                    {(Object.keys(picks).reduce((sum, matchId) => sum + calculatePotentialWinnings(matchId), 0) - totalBetAmount).toFixed(2)}
                  </div>
                  <div className="text-xs font-exo text-cyber-text-dim mt-1">
                    Potential Profit
                  </div>
                </div>
              </div>
            </div>
          )}

          {!editingMatchId && (
            <div className="bg-cyber-darker rounded-xl p-4 border-2 border-cyber-text-dim">
              <h3 className="text-sm font-orbitron font-bold text-cyber-text-dim mb-3">
                Understanding Odds & Betting
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-exo">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-neon-green" />
                  <span className="text-cyber-text-dim">Lower odds = Favorite</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingDown className="w-4 h-4 text-neon-pink" />
                  <span className="text-cyber-text-dim">Higher odds = Underdog</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-neon-yellow" />
                  <span className="text-cyber-text-dim">Winnings = Bet × Odds</span>
                </div>
              </div>
            </div>
          )}

          {editingMatchId ? (
            <div className="flex space-x-4">
              <button
                onClick={handleSaveEdit}
                disabled={picksCount === 0 || isDeadlinePassed}
                className={`
                  flex-1 py-4 rounded-xl font-orbitron font-bold text-lg transition-all duration-300
                  ${picksCount > 0 && !isDeadlinePassed
                    ? 'bg-gradient-to-r from-neon-cyan to-neon-green text-cyber-dark hover:scale-105 box-glow-cyan'
                    : 'bg-cyber-darkest text-cyber-text-dim cursor-not-allowed'
                  }
                `}
              >
                {isDeadlinePassed ? 'DEADLINE PASSED' : 'SAVE CHANGES'}
              </button>
              <button
                onClick={handleCancelEdit}
                className="px-8 py-4 rounded-xl font-orbitron font-bold text-lg bg-cyber-darkest text-cyber-text border-2 border-cyber-text-dim hover:border-neon-pink transition-all duration-300"
              >
                CANCEL
              </button>
            </div>
          ) : (
            <button
              onClick={handleSubmitPicks}
              disabled={picksCount === 0 || totalBetAmount > virtualBalance || isDeadlinePassed}
              className={`
                w-full py-4 rounded-xl font-orbitron font-bold text-lg transition-all duration-300
                ${picksCount > 0 && totalBetAmount <= virtualBalance && !isDeadlinePassed
                  ? 'bg-gradient-to-r from-neon-cyan to-neon-green text-cyber-dark hover:scale-105 box-glow-cyan'
                  : 'bg-cyber-darkest text-cyber-text-dim cursor-not-allowed'
                }
              `}
            >
              {isDeadlinePassed
                ? 'DEADLINE PASSED'
                : picksCount === 0 
                ? 'SELECT YOUR PICKS' 
                : totalBetAmount > virtualBalance
                ? 'INSUFFICIENT BALANCE'
                : `SUBMIT ${picksCount} PICK${picksCount !== 1 ? 'S' : ''} (${totalBetAmount} COINS)`
              }
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MakePicks;
