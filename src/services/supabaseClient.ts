/**
 * Lightweight, zero-dependency Supabase REST Client
 * Connected to live Supabase PostgreSQL & Auth
 */

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

const DEFAULT_SUPABASE_URL = 'https://ypyhhuzslmjhekgmgzia.supabase.co';
const DEFAULT_SUPABASE_KEY = 'sb_publishable_gHuV2p5memZuLN3QFDKXMQ_dAH6o4KR';

const STORAGE_KEY_URL = 'scriptforge_supabase_url';
const STORAGE_KEY_KEY = 'scriptforge_supabase_key';
const STORAGE_KEY_SESSION = 'scriptforge_supabase_session';

export function getSupabaseConfig(): SupabaseConfig {
  const storedUrl = localStorage.getItem(STORAGE_KEY_URL);
  const storedKey = localStorage.getItem(STORAGE_KEY_KEY);

  const envUrl = (import.meta as any).env?.VITE_SUPABASE_URL;
  const envKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY;

  return {
    url: storedUrl || envUrl || DEFAULT_SUPABASE_URL,
    anonKey: storedKey || envKey || DEFAULT_SUPABASE_KEY,
  };
}

export function saveSupabaseConfig(url: string, anonKey: string) {
  localStorage.setItem(STORAGE_KEY_URL, url.trim().replace(/\/$/, ''));
  localStorage.setItem(STORAGE_KEY_KEY, anonKey.trim());
}

export function isSupabaseConfigured(): boolean {
  const { url, anonKey } = getSupabaseConfig();
  return Boolean(url && anonKey && url.includes('supabase.co'));
}

export async function testSupabaseConnection(url: string, anonKey: string): Promise<{ success: boolean; message: string }> {
  try {
    const cleanUrl = url.trim().replace(/\/$/, '');
    const res = await fetch(`${cleanUrl}/rest/v1/screenplays?select=count`, {
      method: 'GET',
      headers: {
        apikey: anonKey.trim(),
        Authorization: `Bearer ${anonKey.trim()}`,
      },
    });

    if (res.ok || res.status === 200 || res.status === 206) {
      return { success: true, message: 'Successfully connected to Supabase PostgreSQL database!' };
    }
    return { success: false, message: `Supabase returned status ${res.status}: ${res.statusText}` };
  } catch (err: any) {
    return { success: false, message: `Connection failed: ${err.message}` };
  }
}

// ---------------- AUTH API ----------------

export async function supabaseSignUp(email: string, password: string, username: string) {
  const { url, anonKey } = getSupabaseConfig();
  if (!url || !anonKey) throw new Error('Supabase is not configured.');

  const res = await fetch(`${url}/auth/v1/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: anonKey,
    },
    body: JSON.stringify({
      email,
      password,
      data: { username },
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error_description || data.msg || data.message || 'Signup failed');

  if (data.access_token) {
    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(data));
  }
  return data;
}

export async function supabaseSignIn(email: string, password: string) {
  const { url, anonKey } = getSupabaseConfig();
  if (!url || !anonKey) throw new Error('Supabase is not configured.');

  const res = await fetch(`${url}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: anonKey,
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error_description || data.msg || data.message || 'Login failed');

  if (data.access_token) {
    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(data));
  }
  return data;
}

export function supabaseGetStoredSession() {
  const stored = localStorage.getItem(STORAGE_KEY_SESSION);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function supabaseSignOut() {
  localStorage.removeItem(STORAGE_KEY_SESSION);
}

// ---------------- POSTGREST SCREENPLAYS API ----------------

export async function supabaseFetchScreenplays(accessToken?: string) {
  const { url, anonKey } = getSupabaseConfig();
  if (!url || !anonKey) return [];

  const token = accessToken || supabaseGetStoredSession()?.access_token || anonKey;

  const res = await fetch(`${url}/rest/v1/screenplays?select=*&order=created_at.desc`, {
    method: 'GET',
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return [];
  return res.json();
}

export async function supabaseInsertScreenplay(screenplay: any, accessToken?: string) {
  const { url, anonKey } = getSupabaseConfig();
  if (!url || !anonKey) return null;

  const token = accessToken || supabaseGetStoredSession()?.access_token || anonKey;
  const user = supabaseGetStoredSession()?.user;

  const payload = {
    user_id: user?.id || '00000000-0000-0000-0000-000000000000',
    title: screenplay.title,
    author: screenplay.author,
    genre: screenplay.genre,
    page_count: screenplay.pageCount,
    story_intelligence_score: screenplay.storyIntelligenceScore,
    logline: screenplay.logline,
    full_raw_text: screenplay.fullRawText,
    category_scores: screenplay.categoryScores,
    scenes: screenplay.scenes,
    characters: screenplay.characters,
    story_beats: screenplay.storyBeats,
    theme_motifs: screenplay.themeMotifs,
    continuity_issues: screenplay.continuityIssues,
    coverage: screenplay.coverage,
  };

  const res = await fetch(`${url}/rest/v1/screenplays`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: anonKey,
      Authorization: `Bearer ${token}`,
      Prefer: 'return=representation',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to save screenplay to Supabase');
  }
  return res.json();
}
