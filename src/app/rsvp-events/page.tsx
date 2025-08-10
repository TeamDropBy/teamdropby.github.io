'use client';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import UserMenu from '@/app/components/UserMenu';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

type Event = {
  id: number;
  title: string;
  details: string;
  contact: string;
  createdAt?: string;
};

export default function RSVPEventsPage() {
  const [rsvpedEvents, setRsvpedEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the user's RSVPed events from Supabase
    const fetchRSVPEvents = async () => {
      const { data: session, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        console.error('Error fetching session:', sessionError);
        return;
      }

      const userId = session.session?.user?.id;
      if (!userId) {
        console.error('No user found in session');
        return;
      }

      // Query to get RSVPed events for the user
      const { data: rsvpedEvents, error: fetchError } = await supabase
        .from('rsvps')
        .select('event_id, events(id, title, details, contact, created_at)')
        .eq('user_id', userId);

      if (fetchError || !rsvpedEvents) {
        console.error('Error fetching RSVPed events:', fetchError);
        setRsvpedEvents([]);
      } else {
        setRsvpedEvents(
          rsvpedEvents
            .filter((rsvp) => rsvp.events && (Array.isArray(rsvp.events) ? rsvp.events.length > 0 : true))
            .map((rsvp) => {
              const eventObj = Array.isArray(rsvp.events) ? rsvp.events[0] : rsvp.events;
              return {
                id: eventObj.id,
                title: eventObj.title,
                details: eventObj.details,
                contact: eventObj.contact,
                createdAt: eventObj.created_at,
              };
            })
        );
      }

      setLoading(false);
    };

    fetchRSVPEvents();
  }, []);

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
          {loading ? (
            <p style={{ fontSize: 18 }}>Loading your RSVP'd events...</p>
          ) : rsvpedEvents.length === 0 ? (
            <p style={{ fontSize: 18 }}>You haven’t RSVP'd to any events yet!</p>
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
