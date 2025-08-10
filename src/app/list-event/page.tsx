'use client';
import Image from 'next/image';
import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
import UserMenu from '@/app/components/UserMenu';


export default function ListEventPage() {
  const [formData, setFormData] = useState({
    title: '',
    details: '',
    contact: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.details || !formData.contact) {
      alert('Please fill in all fields before submitting.');
      return;
    }

    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Event created successfully!');
        setFormData({ title: '', details: '', contact: '' });
      } else {
        const error = await res.json();
        alert('Error: ' + (error.error || error.message));
        console.error('Error details:', error);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong.');
    }
  };

  return (
    <>
      <Head>
        <title>List an Event - DropBy</title>
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
            <NavLink href="/list-event" active>List an Event</NavLink>
            <NavLink href="/rsvp-events">Events RSVP'd For</NavLink>
            <UserMenu />
          </div>
        </nav>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '60px 20px' }}>
          <div
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              padding: 40,
              borderRadius: 10,
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
              width: 400,
            }}
          >
            <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Create an Event</h2>
            <form onSubmit={handleSubmit}>
              <FormInput
                label="Event Title"
                id="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
              />
              <FormTextArea
                label="Event Details (Time, Location, Description)"
                id="details"
                rows={5}
                required
                value={formData.details}
                onChange={handleChange}
              />
              <FormInput
                label="Contact Information"
                id="contact"
                type="text"
                required
                value={formData.contact}
                onChange={handleChange}
              />
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: 10,
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: 5,
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Create Event
              </button>
            </form>
          </div>
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

function FormInput({ label, id, type, required = false, value, onChange }: {
  label: string;
  id: string;
  type: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label htmlFor={id} style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        required={required}
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          padding: 10,
          marginBottom: 20,
          border: 'none',
          borderRadius: 5,
        }}
      />
    </div>
  );
}

function FormTextArea({ label, id, rows = 5, required = false, value, onChange }: {
  label: string;
  id: string;
  rows?: number;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      <label htmlFor={id} style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        rows={rows}
        required={required}
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          padding: 10,
          marginBottom: 20,
          border: 'none',
          borderRadius: 5,
        }}
      />
    </div>
  );
}
