'use client';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href || (href === '/' && pathname === '/');
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
          backgroundColor: isActive ? '#007bff' : 'transparent',
        }}
      >
        {children}
      </a>
    </Link>
  );
}

export default function HowItWorksPage() {
  return (
    <>
      <Head><title>How Does DropBy Work? - DropBy</title></Head>
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
          <Image src="/images/DropBy-Logo.png" alt="DropBy Logo" height={100} width={100} />
          <div style={{ display: 'flex' }}>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/browse-events">Browse Events</NavLink>
            <NavLink href="/list-event">List an Event</NavLink>
            <NavLink href="/rsvp-events">Events RSVP'd For</NavLink>
            <NavLink href="/sign-in">Sign In</NavLink>
          </div>
        </nav>

        <main
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'calc(100vh - 70px)',
            textAlign: 'center',
            padding: '0 20px',
          }}
        >
          <h1 style={{ fontSize: 48, marginBottom: 20 }}>How Does DropBy Work?</h1>
          <p style={{ maxWidth: 800, lineHeight: 1.6, fontSize: 18 }}>
            Hosts create events with a title, details, and contact. Visitors browse the list, open an event to
            see info, and signed-in users can RSVP in a click. Your RSVP list helps you track what you’ve joined.
          </p>
        </main>
      </div>
    </>
  );
}
