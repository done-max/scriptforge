import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Compass,
  Sparkles,
  Lock,
  Mail,
  User,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Zap,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, signup, login, demoLogin, isLoading } = useAuth();

  const [mode, setMode] = useState<'signup' | 'login'>('signup');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!username.trim() || !email.trim() || !password.trim()) {
      setErrorMessage('Please provide a username, email ID, and password.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    try {
      await signup(username.trim(), email.trim(), password);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#4AA3DF', '#C5A46D', '#70C7F5'],
        });
      } catch {
        // ignore
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Signup failed. Please try again.');
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!loginIdentifier.trim() || !loginPassword.trim()) {
      setErrorMessage('Please provide your username/email and password.');
      return;
    }

    try {
      await login(loginIdentifier.trim(), loginPassword);
    } catch (err: any) {
      setErrorMessage(err.message || 'Login failed. Invalid credentials.');
    }
  };

  const handleDemoClick = async () => {
    setErrorMessage(null);
    try {
      await demoLogin();
    } catch (err: any) {
      setErrorMessage(err.message || 'Demo login failed.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-odyssey-void/90 backdrop-blur-xl animate-fadeIn">
      {/* Background Decorative Glow */}
      <div className="absolute w-[500px] h-[500px] bg-forge-ocean/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative w-full max-w-md bg-odyssey-depth/95 border border-forge-cyan/30 rounded-3xl shadow-2xl p-6 sm:p-8 backdrop-blur-2xl overflow-hidden text-paper-100">
        {/* Close / Skip button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-paper-400 hover:text-paper-100 hover:bg-odyssey-trench rounded-xl transition-colors"
          title="Close / Continue as Guest"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-forge-navy to-odyssey-abyss border border-bronze/40 flex items-center justify-center shadow-inner-glow">
            <Compass className="w-6 h-6 text-bronze-light animate-spin-slow" />
          </div>

          <div className="flex items-center justify-center gap-1.5 pt-1">
            <h2 className="font-cinzel font-black text-xl text-paper-50 tracking-wider">
              SCRIPTFORGE
            </h2>
            <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-bronze/20 border border-bronze/30 text-bronze-light font-bold">
              STUDIO PASS
            </span>
          </div>

          <p className="text-xs text-paper-300">
            {mode === 'signup'
              ? 'Create your screenwriter account to begin your story odyssey.'
              : 'Sign in to access your screenplay studio & AI story intelligence.'}
          </p>
        </div>

        {/* Mode Switch Tabs */}
        <div className="flex rounded-xl bg-odyssey-trench p-1 border border-forge-cyan/20 mb-5">
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMessage(null);
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              mode === 'signup'
                ? 'bg-forge-navy text-paper-50 border border-forge-cyan/30 shadow-inner-glow'
                : 'text-paper-400 hover:text-paper-200'
            }`}
          >
            Create Account (Signup)
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMessage(null);
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-forge-navy text-paper-50 border border-forge-cyan/30 shadow-inner-glow'
                : 'text-paper-400 hover:text-paper-200'
            }`}
          >
            Log In
          </button>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-xs text-red-300 flex items-start gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* SIGNUP FORM */}
        {mode === 'signup' ? (
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase text-forge-sky font-semibold flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>Screenwriter Username</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. arjun_mehta"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-odyssey-abyss border border-forge-cyan/25 text-xs text-paper-100 placeholder:text-paper-500 focus:outline-none focus:border-forge-cyan shadow-inner-glow"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase text-forge-sky font-semibold flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                <span>Email Address (Login info sent here)</span>
              </label>
              <input
                type="email"
                required
                placeholder="writer@cinema-school.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-odyssey-abyss border border-forge-cyan/25 text-xs text-paper-100 placeholder:text-paper-500 focus:outline-none focus:border-forge-cyan shadow-inner-glow"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase text-forge-sky font-semibold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                <span>Create Password</span>
              </label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-odyssey-abyss border border-forge-cyan/25 text-xs text-paper-100 placeholder:text-paper-500 focus:outline-none focus:border-forge-cyan shadow-inner-glow"
              />
            </div>

            <div className="p-3 rounded-xl bg-odyssey-abyss/60 border border-bronze/20 text-[11px] text-paper-300 space-y-1">
              <div className="flex items-center gap-1.5 text-bronze-light font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Email Dispatch Guarantee</span>
              </div>
              <p>Your login confirmation & welcome pass will be recorded and sent to your email.</p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-forge-navy via-forge-ocean to-forge-navy hover:from-forge-ocean hover:to-forge-azure text-paper-50 text-xs font-bold border border-forge-cyan/50 shadow-glow-cyan transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-bronze-light" />
              <span>{isLoading ? 'Creating Account...' : 'Sign Up & Access Studio'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* LOGIN FORM */
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase text-forge-sky font-semibold flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>Username or Email ID</span>
              </label>
              <input
                type="text"
                required
                placeholder="elena_vance or writer@email.com"
                value={loginIdentifier}
                onChange={(e) => setLoginIdentifier(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-odyssey-abyss border border-forge-cyan/25 text-xs text-paper-100 placeholder:text-paper-500 focus:outline-none focus:border-forge-cyan shadow-inner-glow"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase text-forge-sky font-semibold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                <span>Password</span>
              </label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-odyssey-abyss border border-forge-cyan/25 text-xs text-paper-100 placeholder:text-paper-500 focus:outline-none focus:border-forge-cyan shadow-inner-glow"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-forge-navy via-forge-ocean to-forge-navy hover:from-forge-ocean hover:to-forge-azure text-paper-50 text-xs font-bold border border-forge-cyan/50 shadow-glow-cyan transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-bronze-light" />
              <span>{isLoading ? 'Signing In...' : 'Log In to Studio'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Instant Demo Shortcut & Guest Mode */}
        <div className="mt-5 pt-4 border-t border-forge-cyan/15 space-y-2 text-center">
          <button
            type="button"
            onClick={handleDemoClick}
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-xl bg-odyssey-trench hover:bg-odyssey-navy text-bronze-light text-xs font-semibold border border-bronze/30 hover:border-bronze transition-all flex items-center justify-center gap-2"
          >
            <Zap className="w-3.5 h-3.5 text-bronze animate-pulse" />
            <span>Instant 1-Click Demo Login (@elena_vance)</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAuthModalOpen(false)}
            className="text-[11px] text-paper-400 hover:text-paper-100 font-mono underline block mx-auto pt-1"
          >
            Continue Exploring as Guest →
          </button>
        </div>
      </div>
    </div>
  );
};
