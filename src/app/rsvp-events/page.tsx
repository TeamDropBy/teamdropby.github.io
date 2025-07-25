'use client';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

export default function RSVPEventsPage() {
  return (
    <>
      <Head>
        <title>Events RSVP'd For - DropBy</title>
      </Head>
      <div
        style={{
          margin: 0,
          fontFamily: 'Arial, sans-serif',
          backgroundImage: "url('/images/DropBy-Background.png')",
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          minHeight: '100vh',
          color: 'white',
        }}
      >
        <nav
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '10px 20px',
          }}
        >
          <Image src="/images/DropBy-Logo.png" alt="DropBy Logo" width={100} height={50} />
          <div style={{ display: 'flex' }}>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/browse-events">Browse Events</NavLink>
            <NavLink href="/list-event">List an Event</NavLink>
            <NavLink href="/rsvp-events" active>
              Events RSVP'd For
            </NavLink>
            <NavLink href="/sign-in">Sign In</NavLink>
          </div>
        </nav>

        <div style={{ padding: '60px 20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 36, marginBottom: 20 }}>Your RSVP'd Events</h2>
          <p style={{ fontSize: 18 }}>
            This page will show events you have RSVP'd for. Feature under development.
          </p>
        </div>
      </div>
    </>
  );
}

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
