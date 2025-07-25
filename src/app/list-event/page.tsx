'use client';
import Image from 'next/image';
import Head from 'next/head';
import background from '../../../public/images/DropBy-Background.png';
import logo from '../../../public/images/DropBy Picture.png';
import { useState } from 'react';
import Link from 'next/link';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.details || !formData.contact) {
      alert('Please fill in all fields before submitting.');
      return;
    }
    alert('Event created successfully (demo)!');
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
          backgroundImage: `url(${background.src})`,
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
          <Image src={logo} alt="DropBy Logo" height={50} />
          <div style={{ display: 'flex' }}>
            <NavLink href="/browse-events">Browse Events</NavLink>
            <NavLink href="/list-event" active>List an Event</NavLink>
            <NavLink href="/rsvp-events">Events RSVP'd For</NavLink>
            <NavLink href="/sign-in">Sign In</NavLink>
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
              <FormInput label="Event Title" id="title" type="text" required onChange={handleChange} />
              <FormTextArea label="Event Details (Time, Location, Description)" id="details" rows={5} required onChange={handleChange} />
              <FormInput label="Contact Information" id="contact" type="text" required onChange={handleChange} />
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

function FormInput({ label, id, type, required = false, onChange }: { label: string; id: string; type: string; required?: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
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

function FormTextArea({ label, id, rows = 5, required = false, onChange }: { label: string; id: string; rows?: number; required?: boolean; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }) {
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
