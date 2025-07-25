'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Signed in with ${email}`);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (signUpPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert(`Account created for ${signUpEmail}`);
    // Reset fields
    setSignUpEmail('');
    setSignUpPassword('');
    setConfirmPassword('');
    setShowSignUp(false);
  };

  return (
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
        <Image src="/images/DropBy-Logo.png" alt="DropBy Logo" height={50} width={100} />
        <div style={{ display: 'flex', gap: '20px' }}>
          <NavLink href="/browse-events">Browse Events</NavLink>
          <NavLink href="/list-event">List an Event</NavLink>
          <NavLink href="/rsvp-events">Events RSVP'd For</NavLink>
          <NavLink href="/sign-in">Sign In</NavLink>
        </div>
      </nav>

      {/* SIGN IN FORM */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '50px' }}>
        <form
          onSubmit={handleSignIn}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '40px',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            width: '100%',
            maxWidth: '400px',
            marginBottom: '20px',
          }}
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

        {/* CREATE ACCOUNT FORM (conditionally shown) */}
        {showSignUp && (
          <form
            onSubmit={handleSignUp}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              padding: '40px',
              borderRadius: '10px',
              boxShadow: '0 0 10px rgba(0,0,0,0.5)',
              width: '100%',
              maxWidth: '400px',
            }}
          >
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
  );
}

// Reuse from landing page
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} legacyBehavior>
      <a
        style={{
          color: 'white',
          textDecoration: 'none',
          marginLeft: 20,
          fontSize: 16,
        }}
      >
        {children}
      </a>
    </Link>
  );
}

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
