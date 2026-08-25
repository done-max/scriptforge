import React, { useState, useEffect } from 'react';
import {
  Database,
  X,
  Play,
  Download,
  Mail,
  Zap,
  CheckCircle2,
  AlertCircle,
  Settings,
  Table as TableIcon,
  Copy,
  Check,
} from 'lucide-react';
import {
  getSupabaseConfig,
  saveSupabaseConfig,
  testSupabaseConnection,
  isSupabaseConfigured,
} from '../../services/supabaseClient';

interface AdminDatabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDatabaseModal: React.FC<AdminDatabaseModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'supabase' | 'tables' | 'sql' | 'smtp' | 'backup'>('supabase');
  const [stats, setStats] = useState<any>(null);
  const [selectedTable, setSelectedTable] = useState<string>('users');
  const [tableData, setTableData] = useState<{ rows: any[]; count: number } | null>(null);

  // Supabase State
  const [supabaseUrl, setSupabaseUrl] = useState<string>('');
  const [supabaseKey, setSupabaseKey] = useState<string>('');
  const [supabaseTesting, setSupabaseTesting] = useState<boolean>(false);
  const [supabaseFeedback, setSupabaseFeedback] = useState<any>(null);
  const [isCopiedSql, setIsCopiedSql] = useState<boolean>(false);

  // SQL Terminal State
  const [sqlQuery, setSqlQuery] = useState<string>('SELECT id, username, email, role, created_at FROM users LIMIT 10;');
  const [sqlResult, setSqlResult] = useState<any>(null);
  const [sqlRunning, setSqlRunning] = useState<boolean>(false);

  // SMTP Tester State
  const [targetEmail, setTargetEmail] = useState<string>('');
  const [smtpHost, setSmtpHost] = useState<string>('smtp.gmail.com');
  const [smtpPort, setSmtpPort] = useState<number>(465);
  const [smtpSecure, setSmtpSecure] = useState<boolean>(true);
  const [smtpUser, setSmtpUser] = useState<string>('');
  const [smtpPass, setSmtpPass] = useState<string>('');
  const [smtpTesting, setSmtpTesting] = useState<boolean>(false);
  const [smtpFeedback, setSmtpFeedback] = useState<any>(null);
  const [vacuumFeedback, setVacuumFeedback] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/stats');
      const data = await res.json();
      setStats(data);
    } catch {
      // ignore
    }
  };

  const fetchTable = async (tableName: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/table/${tableName}`);
      const data = await res.json();
      setTableData(data);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchStats();
      fetchTable(selectedTable);
      const conf = getSupabaseConfig();
      setSupabaseUrl(conf.url);
      setSupabaseKey(conf.anonKey);
    }
  }, [isOpen, selectedTable]);

  if (!isOpen) return null;

  const handleTestSupabase = async () => {
    if (!supabaseUrl.trim() || !supabaseKey.trim()) {
      setSupabaseFeedback({ success: false, message: 'Please enter your Supabase Project URL and Anon API Key.' });
      return;
    }
    setSupabaseTesting(true);
    setSupabaseFeedback(null);

    const result = await testSupabaseConnection(supabaseUrl, supabaseKey);
    setSupabaseFeedback(result);
    setSupabaseTesting(false);
  };

  const handleSaveSupabase = () => {
    saveSupabaseConfig(supabaseUrl, supabaseKey);
    setSupabaseFeedback({ success: true, message: 'Supabase credentials saved and active in ScriptForge!' });
  };

  const handleCopySqlSchema = () => {
    const sqlSchema = `-- SCRIPTFORGE SUPABASE POSTGRESQL SCHEMA
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'Screenwriter',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.screenplays (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  genre TEXT DEFAULT 'Drama',
  page_count INT DEFAULT 1,
  story_intelligence_score INT DEFAULT 85,
  logline TEXT,
  full_raw_text TEXT NOT NULL,
  category_scores JSONB DEFAULT '{}'::jsonb,
  scenes JSONB DEFAULT '[]'::jsonb,
  characters JSONB DEFAULT '[]'::jsonb,
  story_beats JSONB DEFAULT '[]'::jsonb,
  theme_motifs JSONB DEFAULT '[]'::jsonb,
  continuity_issues JSONB DEFAULT '[]'::jsonb,
  coverage JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.screenplays ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Own screenplays select" ON public.screenplays FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Own screenplays insert" ON public.screenplays FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own screenplays update" ON public.screenplays FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Own screenplays delete" ON public.screenplays FOR DELETE USING (auth.uid() = user_id);
`;
    navigator.clipboard.writeText(sqlSchema);
    setIsCopiedSql(true);
    setTimeout(() => setIsCopiedSql(false), 3000);
  };

  const handleExecuteSql = async () => {
    if (!sqlQuery.trim()) return;
    setSqlRunning(true);
    setSqlResult(null);

    try {
      const res = await fetch('http://localhost:5000/api/admin/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sql: sqlQuery }),
      });
      const data = await res.json();
      setSqlResult(data);
      fetchStats();
    } catch (err: any) {
      setSqlResult({ success: false, error: err.message });
    } finally {
      setSqlRunning(false);
    }
  };

  const handleTestSmtp = async () => {
    if (!targetEmail.trim()) {
      setSmtpFeedback({ success: false, error: 'Please enter a target email address.' });
      return;
    }
    setSmtpTesting(true);
    setSmtpFeedback(null);

    try {
      const res = await fetch('http://localhost:5000/api/admin/test-smtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetEmail: targetEmail.trim(),
          smtpHost: smtpHost.trim() || undefined,
          smtpPort: Number(smtpPort) || 587,
          smtpSecure,
          smtpUser: smtpUser.trim() || undefined,
          smtpPass: smtpPass.trim() || undefined,
        }),
      });
      const data = await res.json();
      setSmtpFeedback(data);
    } catch (err: any) {
      setSmtpFeedback({ success: false, error: err.message });
    } finally {
      setSmtpTesting(false);
    }
  };

  const handleSaveSmtp = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/configure-smtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          smtpHost,
          smtpPort,
          smtpSecure,
          smtpUser,
          smtpPass,
        }),
      });
      const data = await res.json();
      setSmtpFeedback(data);
      fetchStats();
    } catch (err: any) {
      setSmtpFeedback({ success: false, error: err.message });
    }
  };

  const handleVacuumDb = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/vacuum', { method: 'POST' });
      const data = await res.json();
      setVacuumFeedback(data.message);
      fetchStats();
      setTimeout(() => setVacuumFeedback(null), 4000);
    } catch (err: any) {
      setVacuumFeedback(`Vacuum failed: ${err.message}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-odyssey-void/90 backdrop-blur-md animate-fadeIn text-paper-100">
      <div className="relative w-full max-w-5xl h-[88vh] bg-odyssey-depth/95 border border-forge-cyan/30 rounded-3xl shadow-glass-card flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-forge-cyan/20 flex items-center justify-between bg-odyssey-abyss/90">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-forge-navy border border-bronze/40 flex items-center justify-center shadow-inner-glow">
              <Database className="w-4 h-4 text-bronze-light" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-cinzel font-bold text-base text-paper-50 tracking-wider">
                  ScriptForge Master Database & Backend Controller
                </h3>
                {isSupabaseConfigured() ? (
                  <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold">
                    ⚡ SUPABASE ACTIVE
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 text-amber-300 text-[10px] font-mono font-bold">
                    SQLITE WAL ACTIVE
                  </span>
                )}
              </div>
              <p className="text-xs text-paper-400">
                Direct root control over Supabase Postgres, SQLite tables, custom SQL execution, SMTP email dispatcher, and backups.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-paper-400 hover:text-paper-100 hover:bg-odyssey-trench rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2.5 bg-odyssey-void/80 border-b border-forge-cyan/15 flex items-center justify-between gap-4">
          <div className="flex gap-2 overflow-x-auto">
            {[
              { id: 'supabase', label: '⚡ Supabase Postgres', icon: Zap },
              { id: 'tables', label: 'Table Browser', icon: TableIcon },
              { id: 'sql', label: 'Raw SQL Terminal', icon: Play },
              { id: 'smtp', label: 'Real SMTP Email Tester', icon: Mail },
              { id: 'backup', label: 'Backup & Maintenance', icon: Download },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-forge-navy text-paper-50 border border-forge-cyan/40 shadow-inner-glow'
                      : 'text-paper-400 hover:text-paper-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-forge-cyan' : 'text-paper-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {stats && (
            <div className="hidden sm:flex items-center gap-3 text-[11px] font-mono text-paper-400">
              <span>Users: <strong className="text-bronze-light">{stats.stats?.users}</strong></span>
              <span>•</span>
              <span>Scripts: <strong className="text-emerald-400">{stats.stats?.scripts}</strong></span>
            </div>
          )}
        </div>

        {/* Main Content Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-odyssey-abyss/60">
          {/* ================= TAB 0: SUPABASE POSTGRESQL INTEGRATION ================= */}
          {activeTab === 'supabase' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-odyssey-depth/80 border border-forge-cyan/25 space-y-3 shadow-inner-glow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-cinzel text-base font-bold text-paper-50">
                      Supabase Cloud Database & Auth Setup
                    </h3>
                  </div>
                  <button
                    onClick={handleCopySqlSchema}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-odyssey-trench hover:bg-odyssey-navy text-bronze-light text-xs font-mono font-bold border border-bronze/30 transition-all"
                  >
                    {isCopiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopiedSql ? 'SQL Copied!' : 'Copy Supabase SQL Schema'}</span>
                  </button>
                </div>

                <p className="text-xs text-paper-300 leading-relaxed">
                  Supabase gives you a <strong>hosted PostgreSQL database</strong>, visual Table Editor, built-in user authentication with automated verification emails, and real-time synchronization.
                </p>
              </div>

              {/* Supabase Step-by-Step Guide */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-4 rounded-xl bg-odyssey-depth/50 border border-forge-cyan/15 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-forge-sky font-bold">Step 1: Create Project</span>
                  <p className="text-paper-300">
                    Sign up at <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-bronze-light underline font-bold">Supabase.com</a> and click <strong>New Project</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-odyssey-depth/50 border border-forge-cyan/15 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-forge-sky font-bold">Step 2: Run SQL Schema</span>
                  <p className="text-paper-300">
                    Click <strong>SQL Editor</strong> in Supabase, click <strong>"Copy Supabase SQL Schema"</strong> above, paste and click <strong>Run</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-odyssey-depth/50 border border-forge-cyan/15 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-forge-sky font-bold">Step 3: Connect API Keys</span>
                  <p className="text-paper-300">
                    Go to <strong>Project Settings $\rightarrow$ API</strong> in Supabase, copy your Project URL & Anon Key, and paste below.
                  </p>
                </div>
              </div>

              {/* Supabase Credentials Form */}
              <div className="p-5 rounded-2xl bg-odyssey-void/70 border border-forge-cyan/20 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-forge-sky font-semibold">
                    Supabase Project URL
                  </label>
                  <input
                    type="text"
                    value={supabaseUrl}
                    onChange={(e) => setSupabaseUrl(e.target.value)}
                    placeholder="https://xyzabcdefghijklm.supabase.co"
                    className="w-full p-3 rounded-xl bg-odyssey-abyss border border-forge-cyan/25 text-xs text-paper-100 font-mono focus:outline-none focus:border-forge-cyan"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-forge-sky font-semibold">
                    Supabase Anon Public API Key
                  </label>
                  <input
                    type="password"
                    value={supabaseKey}
                    onChange={(e) => setSupabaseKey(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    className="w-full p-3 rounded-xl bg-odyssey-abyss border border-forge-cyan/25 text-xs text-paper-100 font-mono focus:outline-none focus:border-forge-cyan"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleTestSupabase}
                    disabled={supabaseTesting || !supabaseUrl.trim() || !supabaseKey.trim()}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-forge-navy to-forge-ocean hover:from-forge-ocean hover:to-forge-azure text-paper-50 text-xs font-bold border border-forge-cyan/40 shadow-glow-cyan disabled:opacity-50 transition-all"
                  >
                    <Zap className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{supabaseTesting ? 'Testing Handshake...' : 'Test Supabase Connection'}</span>
                  </button>

                  <button
                    onClick={handleSaveSupabase}
                    className="px-5 py-2.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 text-xs font-bold border border-emerald-500/40 transition-all"
                  >
                    Save & Activate Supabase
                  </button>
                </div>

                {supabaseFeedback && (
                  <div
                    className={`p-4 rounded-xl border text-xs font-mono ${
                      supabaseFeedback.success
                        ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300'
                        : 'bg-red-950/50 border-red-500/40 text-red-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold">
                      {supabaseFeedback.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                      <span>{supabaseFeedback.message}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= TAB 1: TABLE BROWSER ================= */}
          {activeTab === 'tables' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {['users', 'scripts', 'emails', 'auth_sessions'].map((tbl) => (
                    <button
                      key={tbl}
                      onClick={() => {
                        setSelectedTable(tbl);
                        fetchTable(tbl);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all border ${
                        selectedTable === tbl
                          ? 'bg-forge-navy text-bronze-light border-bronze/40 shadow-inner-glow'
                          : 'bg-odyssey-depth/50 text-paper-400 border-paper-500/15 hover:text-paper-200'
                      }`}
                    >
                      {tbl} ({stats?.tables?.find((t: any) => t.name === tbl)?.rows || 0})
                    </button>
                  ))}
                </div>

                <span className="text-xs font-mono text-paper-400">
                  Showing {tableData?.count || 0} rows from <code className="text-forge-sky">{selectedTable}</code>
                </span>
              </div>

              {tableData && tableData.rows.length > 0 ? (
                <div className="overflow-x-auto rounded-2xl border border-forge-cyan/20 bg-odyssey-depth/70 shadow-inner-glow">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-odyssey-void/80 text-forge-sky uppercase text-[10px] tracking-wider border-b border-forge-cyan/20">
                      <tr>
                        {Object.keys(tableData.rows[0]).map((col) => (
                          <th key={col} className="p-3 font-semibold whitespace-nowrap">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-paper-500/10">
                      {tableData.rows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-odyssey-trench/60 transition-colors">
                          {Object.values(row).map((val: any, cIdx) => (
                            <td key={cIdx} className="p-3 text-paper-300 max-w-xs truncate">
                              {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-12 text-center text-paper-400 text-xs">
                  No records found in table <code className="text-forge-sky">{selectedTable}</code>.
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 2: RAW SQL TERMINAL ================= */}
          {activeTab === 'sql' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-forge-sky font-semibold flex items-center gap-1.5">
                    <Play className="w-3.5 h-3.5 text-bronze-light" />
                    <span>Execute Raw SQLite Query</span>
                  </span>
                  <div className="flex gap-2 text-[11px] font-mono text-paper-400">
                    <button
                      onClick={() => setSqlQuery('SELECT id, username, email, role, created_at FROM users;')}
                      className="hover:underline text-bronze-light"
                    >
                      SELECT users
                    </button>
                    <span>•</span>
                    <button
                      onClick={() => setSqlQuery('SELECT id, title, author, genre, page_count, story_intelligence_score FROM scripts;')}
                      className="hover:underline text-bronze-light"
                    >
                      SELECT scripts
                    </button>
                    <span>•</span>
                    <button
                      onClick={() => setSqlQuery('SELECT id, recipient_email, subject, sent_at FROM emails ORDER BY sent_at DESC;')}
                      className="hover:underline text-bronze-light"
                    >
                      SELECT emails
                    </button>
                  </div>
                </div>

                <textarea
                  rows={4}
                  value={sqlQuery}
                  onChange={(e) => setSqlQuery(e.target.value)}
                  placeholder="e.g. SELECT * FROM users WHERE role = 'Screenwriter';"
                  className="w-full p-3.5 rounded-2xl bg-odyssey-void border border-forge-cyan/30 text-xs font-mono text-emerald-300 focus:outline-none focus:border-forge-cyan shadow-inner-glow resize-none leading-relaxed"
                />

                <div className="flex justify-end">
                  <button
                    onClick={handleExecuteSql}
                    disabled={sqlRunning || !sqlQuery.trim()}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-forge-navy to-forge-ocean hover:from-forge-ocean hover:to-forge-azure text-paper-50 text-xs font-bold border border-forge-cyan/40 shadow-glow-cyan disabled:opacity-50 transition-all"
                  >
                    <Play className="w-3.5 h-3.5 text-bronze-light" />
                    <span>{sqlRunning ? 'Executing Query...' : 'Run SQL Query'}</span>
                  </button>
                </div>
              </div>

              {/* SQL Result Output */}
              {sqlResult && (
                <div className="space-y-2 pt-2 border-t border-forge-cyan/15">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className={sqlResult.success ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                      {sqlResult.success ? `✓ ${sqlResult.message}` : `✕ Error: ${sqlResult.error}`}
                    </span>
                    {sqlResult.elapsedMs !== undefined && (
                      <span className="text-paper-400">{sqlResult.elapsedMs} ms</span>
                    )}
                  </div>

                  {sqlResult.rows && sqlResult.rows.length > 0 && (
                    <div className="overflow-x-auto rounded-2xl border border-forge-cyan/20 bg-odyssey-depth/70 shadow-inner-glow max-h-72">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-odyssey-void text-forge-sky text-[10px] uppercase tracking-wider border-b border-forge-cyan/20">
                          <tr>
                            {Object.keys(sqlResult.rows[0]).map((c) => (
                              <th key={c} className="p-2.5 font-semibold whitespace-nowrap">
                                {c}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-paper-500/10">
                          {sqlResult.rows.map((r: any, rIdx: number) => (
                            <tr key={rIdx} className="hover:bg-odyssey-trench/60">
                              {Object.values(r).map((v: any, vIdx: number) => (
                                <td key={vIdx} className="p-2.5 text-paper-300 max-w-xs truncate">
                                  {typeof v === 'object' ? JSON.stringify(v) : String(v)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 3: REAL SMTP TESTER & LIVE SENDER ================= */}
          {activeTab === 'smtp' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-odyssey-depth/70 border border-forge-cyan/20 space-y-2">
                <div className="flex items-center gap-2 font-cinzel font-bold text-sm text-paper-50">
                  <Mail className="w-4 h-4 text-bronze-light" />
                  <span>Real SMTP Email Delivery Diagnostic & Dispatcher</span>
                </div>
                <p className="text-xs text-paper-300 leading-relaxed">
                  By default, ScriptForge dispatches real test emails via Ethereal SMTP with live web preview links. To send directly to your personal <strong>Gmail</strong> or <strong>Outlook</strong> inbox, enter your SMTP credentials below or set them in your <code className="text-forge-sky font-mono">.env</code> file.
                </p>
              </div>

              {/* SMTP Credentials Form */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-forge-sky font-semibold">SMTP Host</label>
                  <input
                    type="text"
                    value={smtpHost}
                    onChange={(e) => setSmtpHost(e.target.value)}
                    placeholder="e.g. smtp.gmail.com or smtp.sendgrid.net"
                    className="w-full p-2.5 rounded-xl bg-odyssey-abyss border border-forge-cyan/25 text-xs text-paper-100 font-mono focus:outline-none focus:border-forge-cyan"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-forge-sky font-semibold">SMTP Port</label>
                  <input
                    type="number"
                    value={smtpPort}
                    onChange={(e) => setSmtpPort(Number(e.target.value))}
                    placeholder="465 (SSL) or 587 (TLS)"
                    className="w-full p-2.5 rounded-xl bg-odyssey-abyss border border-forge-cyan/25 text-xs text-paper-100 font-mono focus:outline-none focus:border-forge-cyan"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-forge-sky font-semibold">SMTP User (Email)</label>
                  <input
                    type="text"
                    value={smtpUser}
                    onChange={(e) => setSmtpUser(e.target.value)}
                    placeholder="your_email@gmail.com"
                    className="w-full p-2.5 rounded-xl bg-odyssey-abyss border border-forge-cyan/25 text-xs text-paper-100 font-mono focus:outline-none focus:border-forge-cyan"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-forge-sky font-semibold">SMTP Password / App Password</label>
                  <input
                    type="password"
                    value={smtpPass}
                    onChange={(e) => setSmtpPass(e.target.value)}
                    placeholder="Gmail 16-character App Password"
                    className="w-full p-2.5 rounded-xl bg-odyssey-abyss border border-forge-cyan/25 text-xs text-paper-100 font-mono focus:outline-none focus:border-forge-cyan"
                  />
                </div>
              </div>

              {/* Target Test Email */}
              <div className="space-y-2 p-4 rounded-2xl bg-odyssey-void/70 border border-forge-cyan/20">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono uppercase text-bronze-light font-bold">
                    Send Live Test Email To:
                  </label>
                  <label className="flex items-center gap-1.5 text-[11px] font-mono text-paper-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={smtpSecure}
                      onChange={(e) => setSmtpSecure(e.target.checked)}
                      className="rounded border-forge-cyan bg-odyssey-depth text-forge-cyan"
                    />
                    <span>SSL (Port 465)</span>
                  </label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={targetEmail}
                    onChange={(e) => setTargetEmail(e.target.value)}
                    placeholder="Enter your personal email (e.g. writer@gmail.com)"
                    className="flex-1 p-2.5 rounded-xl bg-odyssey-abyss border border-forge-cyan/30 text-xs text-paper-100 placeholder:text-paper-500 focus:outline-none focus:border-forge-cyan font-mono"
                  />
                  <button
                    onClick={handleTestSmtp}
                    disabled={smtpTesting || !targetEmail.trim()}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-forge-navy to-forge-ocean hover:from-forge-ocean hover:to-forge-azure text-paper-50 text-xs font-bold border border-forge-cyan/40 shadow-glow-cyan disabled:opacity-50 transition-all"
                  >
                    <Zap className="w-3.5 h-3.5 text-bronze-light" />
                    <span>{smtpTesting ? 'Testing Handshake...' : 'Send Live Test Email'}</span>
                  </button>
                  <button
                    onClick={handleSaveSmtp}
                    className="px-4 py-2.5 rounded-xl bg-odyssey-depth hover:bg-odyssey-trench text-paper-200 text-xs font-semibold border border-paper-500/20 transition-all"
                  >
                    Save to .env
                  </button>
                </div>
              </div>

              {/* SMTP Feedback Result */}
              {smtpFeedback && (
                <div
                  className={`p-4 rounded-2xl border text-xs leading-relaxed font-mono ${
                    smtpFeedback.success
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                      : 'bg-red-950/40 border-red-500/40 text-red-300'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold mb-1">
                    {smtpFeedback.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    <span>{smtpFeedback.success ? 'SMTP Handshake Successful!' : 'SMTP Connection Error'}</span>
                  </div>
                  <p>{smtpFeedback.message || smtpFeedback.error}</p>
                  {smtpFeedback.previewUrl && (
                    <div className="mt-2 pt-2 border-t border-emerald-500/20">
                      <a
                        href={smtpFeedback.previewUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-forge-sky underline hover:text-paper-100 font-bold"
                      >
                        Click to view Live Dispatched Email Preview on Web →
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 4: BACKUP & DATABASE MAINTENANCE ================= */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1-Click Backup */}
                <div className="p-6 rounded-2xl bg-odyssey-depth/70 border border-forge-cyan/20 space-y-3 shadow-inner-glow">
                  <div className="flex items-center gap-2 font-cinzel font-bold text-sm text-paper-50">
                    <Download className="w-4 h-4 text-forge-sky" />
                    <span>Download Raw Database Backup (.db)</span>
                  </div>
                  <p className="text-xs text-paper-300 leading-relaxed">
                    Downloads the exact binary SQLite <code className="text-forge-sky">scriptforge.db</code> file with all your users, screenplays, scenes, and email records.
                  </p>
                  <a
                    href="http://localhost:5000/api/admin/backup"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-forge-navy hover:bg-forge-ocean text-paper-50 text-xs font-bold border border-forge-cyan/40 shadow-inner-glow transition-all"
                  >
                    <Download className="w-3.5 h-3.5 text-bronze-light" />
                    <span>Download scriptforge.db File</span>
                  </a>
                </div>

                {/* Optimize & Vacuum */}
                <div className="p-6 rounded-2xl bg-odyssey-depth/70 border border-forge-cyan/20 space-y-3 shadow-inner-glow">
                  <div className="flex items-center gap-2 font-cinzel font-bold text-sm text-paper-50">
                    <Settings className="w-4 h-4 text-bronze-light" />
                    <span>VACUUM & Optimize Storage</span>
                  </div>
                  <p className="text-xs text-paper-300 leading-relaxed">
                    Rebuilds the SQLite database file, repacking it into minimal disk space and optimizing B-tree indices for fast querying.
                  </p>
                  <button
                    onClick={handleVacuumDb}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-odyssey-trench hover:bg-odyssey-navy text-paper-100 text-xs font-bold border border-paper-500/20 transition-all"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Run Database VACUUM</span>
                  </button>
                  {vacuumFeedback && (
                    <div className="text-[11px] font-mono text-emerald-400">{vacuumFeedback}</div>
                  )}
                </div>
              </div>

              {/* Database File Location Info */}
              <div className="p-4 rounded-2xl bg-odyssey-void/80 border border-forge-cyan/15 space-y-1.5 text-xs font-mono">
                <div className="text-forge-sky uppercase font-bold">Physical SQLite Database File Location:</div>
                <code className="text-paper-100 bg-odyssey-abyss p-2 rounded-lg block border border-paper-500/10">
                  {stats?.dbPath || 'C:\\Users\\Aakaash\\.gemini\antigravity\\scratch\\scriptforge\\data\\scriptforge.db'}
                </code>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
