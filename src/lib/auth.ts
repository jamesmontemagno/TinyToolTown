import { createClient, type Session, type SupabaseClient } from '@supabase/supabase-js';

const POST_AUTH_REDIRECT_KEY = 'ttt-post-auth-redirect';

let supabaseClient: SupabaseClient | null | undefined;

function getPublicEnv(name: string): string {
  const value = (import.meta.env[name] as string | undefined) || '';
  return value.trim();
}

export function isSupabaseConfigured(): boolean {
  return !!(getPublicEnv('PUBLIC_SUPABASE_URL') && getPublicEnv('PUBLIC_SUPABASE_ANON_KEY'));
}

export function getSupabaseClient(): SupabaseClient | null {
  if (supabaseClient !== undefined) {
    return supabaseClient;
  }

  const url = getPublicEnv('PUBLIC_SUPABASE_URL');
  const anonKey = getPublicEnv('PUBLIC_SUPABASE_ANON_KEY');

  if (!url || !anonKey) {
    supabaseClient = null;
    return supabaseClient;
  }

  supabaseClient = createClient(url, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  return supabaseClient;
}

export async function getCurrentSession(): Promise<Session | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export function onAuthStateChange(handler: (event: string, session: Session | null) => void): () => void {
  const supabase = getSupabaseClient();
  if (!supabase) return () => {};

  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    handler(event, session);
  });

  return () => {
    data.subscription.unsubscribe();
  };
}

export async function signInWithGitHub(returnTo?: string): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) return;

  const target = returnTo || `${window.location.pathname}${window.location.search}`;
  try {
    localStorage.setItem(POST_AUTH_REDIRECT_KEY, target);
  } catch {
    // Ignore storage errors; fallback redirect will still work.
  }

  const callbackUrl = new URL('/auth/callback/', window.location.origin).toString();
  await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: callbackUrl,
      scopes: 'read:user user:email',
    },
  });
}

export async function signOut(): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) return;
  await supabase.auth.signOut();
}

export function consumePostAuthRedirect(fallback = '/favorites/'): string {
  try {
    const stored = localStorage.getItem(POST_AUTH_REDIRECT_KEY);
    if (stored) {
      localStorage.removeItem(POST_AUTH_REDIRECT_KEY);
      return stored;
    }
  } catch {
    // Ignore storage errors and use fallback.
  }
  return fallback;
}
