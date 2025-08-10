'use client';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import UserMenu from '@/app/components/UserMenu';
import { createClient } from '@supabase/supabase-js';

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
  const [rsvpStatus, setRsvpStatus] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch events from your API endpoint
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error(`Failed to fetch events: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to load events');
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleRSVP = async (eventId: number) => {
    // Check if user is signed in
    const userEmail = localStorage.getItem('user_email');
    if (!userEmail) {
      alert('Please sign in to RSVP for events');
      return;
    }

    // Check if already RSVP'd
    if (rsvpStatus.includes(eventId)) {
      return;
    }

    // For now, just track RSVPs locally
    // You can implement server-side RSVP tracking later
    setRsvpStatus([...rsvpStatus, eventId]);
    alert('RSVP successful!');
  };

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
        <h2>Error: {error}</h2>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

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
            <UserMenu />
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
                <button
                  onClick={() => handleRSVP(event.id)}
                  disabled={rsvpStatus.includes(event.id)}
                  style={{
                    backgroundColor: rsvpStatus.includes(event.id) ? '#28a745' : '#007bff',
                    color: 'white',
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: rsvpStatus.includes(event.id) ? 'default' : 'pointer',
                    marginTop: '10px',
                    opacity: rsvpStatus.includes(event.id) ? 0.7 : 1,
                  }}
                >
                  {rsvpStatus.includes(event.id) ? "RSVP'd ✓" : 'RSVP'}
                </button>
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
