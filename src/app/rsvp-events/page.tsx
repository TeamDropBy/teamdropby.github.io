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

type RSVPData = {
  id: number;
  event_id: number;
  Event: Event;
};

export default function RSVPEventsPage() {
  const [rsvpedEvents, setRsvpedEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRSVPEvents = async () => {
      try {
        const userId = localStorage.getItem('user_id');
        
        if (!userId) {
          setError('Please sign in to view your RSVPs');
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/rsvp?userId=${userId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch RSVPs');
        }

        const rsvpData: RSVPData[] = await response.json();
        
        // Extract events from RSVP data
        const events = rsvpData.map(rsvp => ({
          id: rsvp.Event.id,
          title: rsvp.Event.title,
          details: rsvp.Event.details,
          contact: rsvp.Event.contact,
          createdAt: rsvp.Event.createdAt,
        }));

        setRsvpedEvents(events);
      } catch (error) {
        console.error('Error fetching RSVPs:', error);
        setError('Failed to load your RSVPs');
      } finally {
        setLoading(false);
      }
    };

    fetchRSVPEvents();
  }, []);

  const handleCancelRSVP = async (eventId: number) => {
    const userId = localStorage.getItem('user_id');
    if (!userId) return;

    try {
      const response = await fetch(`/api/rsvp?userId=${userId}&eventId=${eventId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the event from the list
        setRsvpedEvents(rsvpedEvents.filter(event => event.id !== eventId));
        alert('RSVP cancelled successfully');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to cancel RSVP');
      }
    } catch (error) {
      console.error('Error cancelling RSVP:', error);
      alert('Failed to cancel RSVP');
    }
  };

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
          <Image src="/images/DropBy-Logo.png" alt="DropBy Logo" width={100} height={100} />
          <div style={{ display: 'flex' }}>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/browse-events">Browse Events</NavLink>
            <NavLink href="/list-event">List an Event</NavLink>
            <NavLink href="/rsvp-events" active>
              Events RSVP'd For
            </NavLink>
            <UserMenu />
          </div>
        </nav>

        <div style={{ padding: '60px 20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 36, marginBottom: 20 }}>Your RSVP'd Events</h2>
          
          {error && (
            <div style={{ 
              backgroundColor: 'rgba(255, 0, 0, 0.2)', 
              border: '1px solid red', 
              borderRadius: '5px', 
              padding: '10px', 
              marginBottom: '20px',
              maxWidth: '600px',
              marginInline: 'auto'
            }}>
              <p style={{ color: '#ff6b6b' }}>{error}</p>
              {error.includes('sign in') && (
                <Link href="/sign-in">
                  <button style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '10px'
                  }}>
                    Sign In
                  </button>
                </Link>
              )}
            </div>
          )}

          {loading ? (
            <p style={{ fontSize: 18 }}>Loading your RSVP'd events...</p>
          ) : rsvpedEvents.length === 0 && !error ? (
            <div>
              <p style={{ fontSize: 18, marginBottom: 20 }}>You haven't RSVP'd to any events yet!</p>
              <Link href="/browse-events">
                <button style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}>
                  Browse Events
                </button>
              </Link>
            </div>
          ) : (
            rsvpedEvents.map((event) => (
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
                  onClick={() => handleCancelRSVP(event.id)}
                  style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '10px',
                  }}
                >
                  Cancel RSVP
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
