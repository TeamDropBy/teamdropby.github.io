'use client';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

type Event = {
  id: number;
  title: string;
  details: string;
  contact: string;
  createdAt?: string;
};

export default function BrowseEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/events')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.error('Unexpected response:', data);
          setEvents([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setEvents([]);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Browse Events - DropBy</title>
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
          <Image src="/images/DropBy-Logo.png" alt="DropBy Logo" width={100} height={100} />
          <div style={{ display: 'flex' }}>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/browse-events" active>Browse Events</NavLink>
            <NavLink href="/list-event">List an Event</NavLink>
            <NavLink href="/rsvp-events">Events RSVP'd For</NavLink>
            <NavLink href="/sign-in">Sign In</NavLink>
          </div>
        </nav>

        <div style={{ padding: '60px 20px' }}>
          <h2 style={{ fontSize: 36, marginBottom: 20, textAlign: 'center' }}>Browse Events</h2>

          {loading ? (
            <p style={{ fontSize: 18, textAlign: 'center' }}>Loading events...</p>
          ) : events.length === 0 ? (
            <p style={{ fontSize: 18, textAlign: 'center' }}>No events found. Be the first to list one!</p>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  borderRadius: 10,
                  padding: 20,
                  marginBottom: 20,
                  maxWidth: 600,
                  marginInline: 'auto',
                  boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                }}
              >
                <h3 style={{ marginBottom: 10 }}>{event.title}</h3>
                <p>{event.details}</p>
                <p><strong>Contact:</strong> {event.contact}</p>
                {event.createdAt && (
                  <p style={{ fontStyle: 'italic', fontSize: 12 }}>
                    Listed on: {new Date(event.createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))
          )}
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
