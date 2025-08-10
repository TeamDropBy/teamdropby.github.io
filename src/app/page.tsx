'use client';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UserMenu from '@/app/components/UserMenu';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>DropBy - Landing Page</title>
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
          <Image src="/images/DropBy-Logo.png" alt="DropBy Logo" height={100} width={100} />
          <div style={{ display: 'flex' }}>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/browse-events">Browse Events</NavLink>
            <NavLink href="/list-event">List an Event</NavLink>
            <NavLink href="/rsvp-events">Events RSVP'd For</NavLink>
            <UserMenu />
          </div>
        </nav>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'calc(100vh - 70px)',
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: 48, marginBottom: 30 }}>Welcome to DropBy</h1>
          <div>
            <InfoButton href="/what-is-dropby">What is DropBy?</InfoButton>
            <InfoButton href="/how-it-works">How Does DropBy Work?</InfoButton>
            <InfoButton href="/why-use-dropby">Why is DropBy Useful?</InfoButton>
          </div>
        </div>
      </div>
    </>
  );
}

// ✅ Matches styling from "List an Event" page
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

function InfoButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} legacyBehavior>
      <a
        style={{
          display: 'block',
          margin: 10,
          padding: '15px 30px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          color: 'black',
          textDecoration: 'none',
          fontWeight: 'bold',
          borderRadius: 10,
          border: '2px solid #333',
          boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
          transition: 'background-color 0.3s, transform 0.2s',
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)')}
      >
        {children}
      </a>
    </Link>
  );
}

