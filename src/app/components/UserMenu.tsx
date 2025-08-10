'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function UserMenu() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // read once on mount
    const e = localStorage.getItem('user_email');
    setEmail(e);
    // optional: watch for changes from other tabs
    const onStorage = (ev: StorageEvent) => {
      if (ev.key === 'user_email') setEmail(ev.newValue);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const signOut = () => {
    // clear what we stored on sign-in
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_email');
    localStorage.removeItem('access_token');
    // simple visual reset
    window.location.reload();
  };

  if (!email) {
    // not signed in → show Sign In link styled like your NavLink
    return (
      <Link href="/sign-in" legacyBehavior>
        <a
          style={{
            color: 'white',
            textDecoration: 'none',
            marginLeft: 20,
            fontSize: 16,
            padding: '6px 12px',
            borderRadius: 5,
            backgroundColor: 'transparent',
          }}
        >
          Sign In
        </a>
      </Link>
    );
  }

  // signed in → show email + sign out button
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 20 }}>
      <span
        title={email}
        style={{
          backgroundColor: '#007bff',
          padding: '6px 12px',
          borderRadius: 5,
          fontSize: 14,
          color: 'white',
          maxWidth: 220,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {email}
      </span>
      <button
        onClick={signOut}
        style={{
          background: 'transparent',
          border: '1px solid #fff',
          color: 'white',
          padding: '6px 10px',
          borderRadius: 5,
          cursor: 'pointer',
          fontSize: 14,
        }}
      >
        Sign Out
      </button>
    </div>
  );
}
