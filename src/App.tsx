import React, { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowDown,
  CalendarDays,
  Clock3,
  Flower2,
  Heart,
  MapPin,
  Moon,
  Send,
  Star,
} from "lucide-react";

const event = {
  date: "Sunday, 20th December 2026",
  time: "11:30 AM onwards",
  location: "Bride's Residence, Kilakarai, Ramanathapuram Dist, Tamil Nadu",
  mapUrl: "https://maps.app.goo.gl/uMWTWFfjFGML4yw8A",
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function PaperDivider() {
  return (
    <div className="paper-divider" aria-hidden="true">
      <span />
      <Heart size={16} fill="currentColor" />
      <span />
    </div>
  );
}

function InvitationHero() {
  return (
    <section className="invitation-hero" aria-labelledby="invitation-title">
      <div className="paper-sheet">
        <Flower2
          className="paper-flower paper-flower-left"
          aria-hidden="true"
        />
        <Flower2
          className="paper-flower paper-flower-right"
          aria-hidden="true"
        />

        <div className="paper-topline">
          <div className="monogram" aria-label="Fazil and Faleeha">
            <span>F</span>
            <Heart size={14} fill="currentColor" aria-hidden="true" />
            <span>F</span>
          </div>
          <div className="date-stamp" aria-label="20 December 2026">
            <span>DEC</span>
            <strong>20</strong>
            <span>2026</span>
          </div>
        </div>

        <motion.div
          className="hero-copy"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="eyebrow">With joyful hearts and grateful prayers</p>
          <h1 id="invitation-title">
            You are cordially invited
            <span>to celebrate the wedding of</span>
          </h1>
          <p className="couple-names">
            Mohamed Fazil <span>&amp;</span> Seyed Faleeha Teezan
          </p>
          <PaperDivider />
          <p className="hero-date">{event.date}</p>
          <p className="hero-note">Join us as we begin our blessed Nikkah</p>
          <a className="text-link" href="#details">
            Read our invitation <ArrowDown size={16} aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function InvitationStory() {
  return (
    <section id="story" className="story-section paper-section">
      <motion.div
        className="section-inner story-inner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        transition={{ duration: 0.7 }}
      >
        <p className="arabic-script" lang="ar" dir="rtl">
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </p>
        <p className="translation">
          In the name of Allah, the Most Gracious, the Most Merciful
        </p>
        <PaperDivider />
        <p className="story-kicker">A little note from our hearts</p>
        <h2>
          Two paths, brought together by grace, now begin one beautiful journey.
        </h2>
        <p className="story-copy">
          With the blessings of our families, we would be honoured to have you
          with us as we begin this beautiful new chapter together.
        </p>
      </motion.div>
    </section>
  );
}

function EventDetails() {
  return (
    <section id="details" className="details-section">
      <motion.div
        className="section-inner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        transition={{ duration: 0.7 }}
      >
        <div className="section-heading">
          <p className="eyebrow">Please save the date</p>
          <h2>The Nikkah</h2>
          <PaperDivider />
        </div>

        <div className="event-card">
          <div className="event-card-flower" aria-hidden="true">
            <Flower2 size={86} strokeWidth={0.8} />
          </div>
          <div className="event-date-block">
            <span>DECEMBER</span>
            <strong>20</strong>
            <span>2026</span>
          </div>
          <div className="event-copy">
            <p className="event-label">A day made more special with you</p>
            <h3>Nikkah Ceremony</h3>
            <div className="event-fact">
              <CalendarDays size={18} aria-hidden="true" />
              <span>{event.date}</span>
            </div>
            <div className="event-fact">
              <Clock3 size={18} aria-hidden="true" />
              <span>{event.time}</span>
            </div>
            <div className="event-fact">
              <MapPin size={18} aria-hidden="true" />
              <span>{event.location}</span>
            </div>
            <a
              className="outline-link"
              href={event.mapUrl}
              target="_blank"
              rel="noreferrer"
            >
              <MapPin size={16} aria-hidden="true" />
              View location
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Blessings() {
  const duas = [
    "O Allah, surround our marriage with mercy and blessing. Give us a home of peace, tenderness, and goodness.",
    "O Allah, let us grow together in faith and love. Bless every season of our life and make our later years gentle and joyful.",
    "O Allah, keep our affection sincere and our compassion strong. Fill the years we share with lasting love and Your blessings.",
  ];

  return (
    <section className="blessings-section paper-section">
      <div className="section-inner">
        <div className="section-heading">
          <p className="eyebrow">A prayer for our new beginning</p>
          <h2>With love &amp; duas</h2>
          <PaperDivider />
        </div>
        <div className="dua-grid">
          {duas.map((dua, index) => (
            <motion.blockquote
              className="dua-card"
              key={dua}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ duration: 0.6, delay: index * 0.12 }}
            >
              <Moon size={18} aria-hidden="true" />
              <p>“{dua}”</p>
            </motion.blockquote>
          ))}
        </div>
        <p className="ameen">Ameen</p>
      </div>
    </section>
  );
}

function RSVP() {
  const [submitted, setSubmitted] = useState(
    () => sessionStorage.getItem("rsvp_submitted") === "true",
  );
  const [loading, setLoading] = useState(false);

  const normalizeName = (value: string) =>
    value.trim().replace(/\s+/g, " ").toLowerCase();

  const hashString = (value: string) => {
    let hash = 0;
    for (let index = 0; index < value.length; index++) {
      hash = (hash * 31 + value.charCodeAt(index)) | 0;
    }
    return Math.abs(hash).toString(16);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const guests = Number(formData.get("guests"));

    if (!name) {
      alert("Please enter your name.");
      return;
    }
    if (!Number.isFinite(guests) || guests < 1) {
      alert("Please enter a valid number of guests.");
      return;
    }

    setLoading(true);
    try {
      if (sessionStorage.getItem("rsvp_submitted") === "true") {
        alert("You have already submitted your RSVP.");
        setSubmitted(true);
        return;
      }

      const normalized = normalizeName(name);
      const checkCandidates = Array.from(new Set([name, normalized]));
      let alreadySubmitted = false;

      for (const candidate of checkCandidates) {
        const checkRes = await fetch(
          `https://sheetdb.io/api/v1/2efldqzjq4jb4/search?name=${encodeURIComponent(candidate)}`,
        );
        if (!checkRes.ok) {
          throw new Error(`RSVP lookup failed with status ${checkRes.status}`);
        }
        const existing: unknown = await checkRes.json();
        if (Array.isArray(existing) && existing.length > 0) {
          alreadySubmitted = true;
          break;
        }
      }

      if (alreadySubmitted) {
        alert("You have already submitted your RSVP.");
        return;
      }

      const fingerprint = {
        screen: `${window.screen.width}x${window.screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        ua: navigator.userAgent,
        lang: navigator.language,
      };
      const response = await fetch("https://sheetdb.io/api/v1/2efldqzjq4jb4", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [
            {
              name,
              guests,
              timestamp: new Date().toISOString(),
              userAgent: fingerprint.ua,
              language: fingerprint.lang,
              screen: fingerprint.screen,
              timezone: fingerprint.timezone,
              fingerprintHash: hashString(JSON.stringify(fingerprint)),
            },
          ],
        }),
      });
      if (!response.ok) {
        throw new Error(
          `RSVP submission failed with status ${response.status}`,
        );
      }

      sessionStorage.setItem("rsvp_submitted", "true");
      setSubmitted(true);
    } catch (error) {
      console.error("RSVP error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rsvp" className="rsvp-section">
      <motion.div
        className="rsvp-card"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        transition={{ duration: 0.7 }}
      >
        {submitted ? (
          <div className="rsvp-success" role="status">
            <Heart size={30} fill="currentColor" aria-hidden="true" />
            <h2>Thank you</h2>
            <p>
              Thank you for your response. We look forward to celebrating with
              you!
            </p>
          </div>
        ) : (
          <>
            <p className="eyebrow">Kindly reply</p>
            <h2>Will you join us?</h2>
            <p className="rsvp-intro">
              We would love to celebrate this blessed day with you.
            </p>
            <form className="rsvp-form" onSubmit={handleSubmit}>
              <label htmlFor="name">Your name</label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                placeholder="Enter your name"
                required
              />
              <label htmlFor="guests">Number of guests</label>
              <input
                id="guests"
                name="guests"
                type="number"
                min={1}
                step={1}
                placeholder="How many are attending?"
                required
              />
              <button type="submit" disabled={loading}>
                <Send size={16} aria-hidden="true" />
                {loading ? "Sending your reply..." : "Confirm attendance"}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </section>
  );
}

export default function App() {
  return (
    <main className="invite-page">
      <InvitationHero />
      <InvitationStory />
      <EventDetails />
      <Blessings />
      <RSVP />
      <footer className="invite-footer">
        <div className="footer-monogram" aria-hidden="true">
          M <Heart size={13} fill="currentColor" /> S
        </div>
        <p>With love, Mohamed Fazil &amp; Seyed Faleeha Teezan</p>
        <p className="footer-note">We can’t wait to celebrate with you.</p>
        <div className="footer-stars" aria-hidden="true">
          <Star size={12} fill="currentColor" />
          <Star size={16} fill="currentColor" />
          <Star size={12} fill="currentColor" />
        </div>
      </footer>
    </main>
  );
}
