'use client';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import UserMenu from '@/app/components/UserMenu';


export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Sign In
const handleSignIn = async (e: React.FormEvent) => {
  e.preventDefault();
  const res = await fetch('/api/auth/sign-in', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();

  if (!res.ok) return alert(data.error || 'Sign-in failed.');

  if (data?.user?.id) localStorage.setItem('user_id', data.user.id);
  if (data?.user?.email) localStorage.setItem('user_email', data.user.email); // ← add this
  if (data?.session?.access_token) localStorage.setItem('access_token', data.session.access_token);

  alert(data.message || 'Signed in successfully.');
  window.location.href = '/';
};

// Sign Up
const handleSignUp = async (e: React.FormEvent) => {
  e.preventDefault();
  if (signUpPassword !== confirmPassword) return alert('Passwords do not match!');
  const res = await fetch('/api/auth/sign-up', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: signUpEmail, password: signUpPassword }),
  });
  const data = await res.json();

  if (!res.ok) return alert(data.error || 'Account creation failed.');

  if (data?.user?.id) localStorage.setItem('user_id', data.user.id);
  if (data?.user?.email) localStorage.setItem('user_email', data.user.email); // ← add this
  if (data?.session?.access_token) localStorage.setItem('access_token', data.session.access_token);

  alert(data.message || 'Account created.');
  if (!data.needsEmailConfirm) {
    window.location.href = '/';
  } else {
    setSignUpEmail(''); setSignUpPassword(''); setConfirmPassword(''); setShowSignUp(false);
  }
};




  return (
    <>
      <Head>
        <title>Sign In - DropBy</title>
      </Head>
      <div
        style={{
          minHeight: '100vh',
          backgroundImage: "url('/images/DropBy-Background.png')",
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          fontFamily: 'Arial, sans-serif',
          color: 'white',
        }}
      >
        {/* NAVBAR */}
        <nav
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '10px 20px',
          }}
        >
          <Image src="/images/DropBy-Logo.png" alt="DropBy Logo" width={100} height={100} />
          <div style={{ display: 'flex' }}>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/browse-events">Browse Events</NavLink>
            <NavLink href="/list-event">List an Event</NavLink>
            <NavLink href="/rsvp-events">Events RSVP'd For</NavLink>
            <UserMenu />
          </div>
        </nav>

        {/* SIGN IN FORM */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '50px' }}>
          <form
            onSubmit={handleSignIn}
            style={formStyle}
          >
            <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Sign In</h2>

            <label style={{ display: 'block', marginBottom: '10px' }}>
              Email:
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
            </label>

            <label style={{ display: 'block', marginBottom: '10px' }}>
              Password:
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
              />
            </label>

            <button type="submit" style={buttonStyle}>Sign In</button>

            <p style={{ marginTop: '20px', textAlign: 'center' }}>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setShowSignUp(!showSignUp)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#f1c40f',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                Create Account
              </button>
            </p>
          </form>

          {/* SIGN UP FORM */}
          {showSignUp && (
            <form onSubmit={handleSignUp} style={formStyle}>
              <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Create Account</h2>

              <label style={{ display: 'block', marginBottom: '10px' }}>
                Email:
                <input
                  type="email"
                  required
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  style={inputStyle}
                />
              </label>

              <label style={{ display: 'block', marginBottom: '10px' }}>
                Password:
                <input
                  type="password"
                  required
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  style={inputStyle}
                />
              </label>

              <label style={{ display: 'block', marginBottom: '10px' }}>
                Confirm Password:
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={inputStyle}
                />
              </label>

              <button type="submit" style={buttonStyle}>Register</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

// Matching NavLink style from BrowseEventsPage
function NavLink({ href, children, active = false }: { href: string; children: React.ReactNode; active?: boolean }) {
  return (
    <Link href={href} legacyBehavior>
      <a
        style={{
          color: 'white',
          textDecoration: 'none',
          marginLeft: 20,
          fontSize: 16,
          padding: '6px 12px',
          borderRadius: 5,
          backgroundColor: active ? '#007bff' : 'transparent',
        }}
      >
        {children}
      </a>
    </Link>
  );
}

const formStyle: React.CSSProperties = {
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  padding: '40px',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0,0,0,0.5)',
  width: '100%',
  maxWidth: '400px',
  marginBottom: '20px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  marginTop: '5px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  boxSizing: 'border-box',
};

const buttonStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#f1c40f',
  color: 'black',
  border: 'none',
  borderRadius: '5px',
  marginTop: '15px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

