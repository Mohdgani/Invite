import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import {
  Calendar,
  MapPin,
  Heart,
  MessageSquare,
  Users,
  Send,
  Moon,
  Star,
  Flower,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

// --- Components ---

const SwingingLanterns = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-50 flex justify-around px-10 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="flex flex-col items-center origin-top"
          initial={{ rotate: -5 }}
          animate={{ rotate: 5 }}
          transition={{
            duration: 1.8 + i * 0.2,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: Math.random() * 1.5,
          }}
          style={{
            height: 100 + (i % 3) * 40,
            marginLeft: i === 0 ? 0 : -20,
          }}
        >
          <div className="w-[1px] h-full bg-gold/40" />
          <div className="relative">
            <div className="absolute inset-0 bg-gold/20 blur-md rounded-full" />
            <Moon className="text-gold w-8 h-8 fill-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const FallingElements = () => {
  const [viewport, setViewport] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  if (viewport.width === 0) return null;

  const elements = [...Array(130)].map((_, i) => {
    const type = Math.random() > 0.7 ? "flower" : "particle";
    return {
      id: i,
      x: Math.random() * viewport.width,
      size: Math.random() * (type === "flower" ? 15 : 4) + 2,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 10,
      type,
    };
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute"
          initial={{ x: el.x, y: -50, opacity: 0, rotate: 0 }}
          animate={{
            y: viewport.height + 100, // fall through full screen
            x: [el.x, el.x + (Math.random() * 40 - 20)], // gentle horizontal drift
            opacity: [0, 0.6, 0.6, 0],
            rotate: el.type === "flower" ? 360 : 0,
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: "linear",
          }}
        >
          {el.type === "flower" ? (
            <Flower
              className="text-gold/20"
              style={{ width: el.size, height: el.size }}
            />
          ) : (
            <div
              className="bg-gold/30 rounded-full"
              style={{ width: el.size, height: el.size }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

const FloatingParticles = () => {
  const [viewport, setViewport] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  if (viewport.width === 0) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(400)].map((_, i) => {
        const startX = Math.random() * viewport.width;
        const startY = Math.random() * viewport.height;

        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold rounded-full opacity-30"
            initial={{
              x: startX,
              y: startY,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [startY, viewport.width + 100],
              x: [startX, startX - 10],
              opacity: [0, 0.4, 0.4, 0],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 3,
            }}
          />
        );
      })}
    </div>
  );
};

const SectionDivider = () => (
  <div className="flex items-center justify-center my-12 opacity-50">
    <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-gold" />
    <Star className="mx-4 text-gold w-4 h-4 fill-gold" />
    <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-gold" />
  </div>
);

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-emerald-950">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/islamic/1920/1080?blur=10')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-transparent to-emerald-950" />
      </motion.div>

      <FloatingParticles />

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-6"
        >
          <span className="font-display text-gold tracking-[0.3em] text-sm uppercase">
            The Wedding of
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="font-serif text-5xl md:text-7xl lg:text-7xl mb-8 gold-gradient-text drop-shadow-2xl"
        >
          Mohammed Gani <br />
          <span className="text-3xl md:text-5xl lg:text-6xl font-display italic">
            &
          </span>{" "}
          <br />
          Jafreen Samitha
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="font-sans text-gold-light/80 text-lg md:text-xl max-w-2xl mx-auto italic"
        >
          “With the blessings of Allah, we invite you to celebrate our Nikah”
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-12"
        >
          <div className="animate-bounce text-gold/50">
            <div className="w-[1px] h-12 bg-gold mx-auto" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const WaxSeal = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
      whileInView={{ opacity: 1, scale: 1, rotate: -5 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay: 0.5, type: "spring", stiffness: 60 }}
      className="relative w-48 h-48 mx-auto my-16 flex items-center justify-center group"
    >
      {/* Subtle shadow underneath for physical presence */}

      {/* The Wax Seal Image with "Melted" effects */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <img
          src="/src/wax.png"
          alt="M & J Wax Seal"
          className="w-full h-full object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
        />
        {/* Extra "melted" overlays to blend it into the ivory page */}
      </div>

      {/* Realistic Wax Drips (Visual only, to enhance the image) */}
    </motion.div>
  );
};

const Bismillah = () => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden bg-ivory islamic-pattern text-center px-4 border-b border-gold/10">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-8 opacity-40 flex justify-center gap-4">
        <Star className="w-3 h-3 text-gold fill-gold" />
        <Star className="w-3 h-3 text-gold fill-gold" />
        <Star className="w-3 h-3 text-gold fill-gold" />
      </div>
      <h2 className="font-arabic text-5xl md:text-7xl text-emerald-950 mb-6 drop-shadow-sm">
        بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
      </h2>
      <p className="font-serif italic text-emerald-950/70 text-xl md:text-2xl">
        In the name of Allah, the Most Gracious, the Most Merciful
      </p>
      <div className="mt-10 opacity-40 flex justify-center gap-4">
        <Star className="w-3 h-3 text-gold fill-gold" />
        <Star className="w-3 h-3 text-gold fill-gold" />
        <Star className="w-3 h-3 text-gold fill-gold" />
      </div>
    </motion.div>
  </section>
);

const Events = () => {
  const events = [
    {
      title: "Nikah Ceremony",
      date: "Sun 26th July 2026",
      time: "11:30 AM onwards",
      location: "Tamil Nadu Haj Service Society Chennai",
      description: "The sacred union under the grace of Allah.",
    },
  ];

  return (
    <section className="py-24 bg-emerald-950 text-white px-4 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-gold text-3xl mb-2">
            Wedding Events
          </h2>
          <div className="h-[1px] w-20 bg-gold mx-auto" />
        </motion.div>

        <div className="space-y-12">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-emerald-900/60 border-gold/30 royal-border overflow-hidden">
                <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0 w-24 h-24 rounded-full border border-gold/50 flex items-center justify-center bg-emerald-950">
                    <Calendar className="text-gold w-10 h-10" />
                  </div>
                  <div className="text-center md:text-left flex-grow">
                    <h3 className="font-serif text-3xl text-gold mb-2 drop-shadow-md">
                      {event.title}
                    </h3>
                    <p className="text-black font-sans mb-10 drop-shadow-sm">
                      {event.description}
                    </p>
                    <div className="grid grid-cols-1  md:grid-cols-1 gap-3 text-base text-ivory/95 drop-shadow-sm">
                      <div className="flex items-center justify-center text-black md:justify-start gap-2">
                        <Calendar className="w-4 h-4 text-gold" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-black justify-center md:justify-start gap-2">
                        <Moon className="w-4 h-4 text-gold" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center justify-center text-black md:justify-start gap-2 ">
                        <MapPin className="w-4 h-4 text-gold" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Venue = () => (
  <section className="py-24 bg-ivory px-4">
    <div className="max-w-6xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="font-display text-emerald-950 text-3xl mb-2">
          The Venue
        </h2>
        <p className="font-serif italic text-emerald-950/60">
          Join us at this beautiful location
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-gold/20 aspect-video md:aspect-[21/9]"
      >
        <img
          src="https://picsum.photos/seed/palace/1200/600"
          alt="Venue"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-emerald-950/20 flex items-center justify-center">
          <Button
            className="bg-gold hover:bg-gold/90 text-emerald-950 font-display px-8 py-6 text-lg rounded-full shadow-xl transition-all hover:scale-105"
            onClick={() =>
              window.open("https://maps.app.goo.gl/xfEt8MSRovFAzVjk7", "_blank")
            }
          >
            <MapPin className="mr-2 h-5 w-5" /> View Location
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

const RSVP = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      name: (document.getElementById("name") as HTMLInputElement).value,
      guests: (document.getElementById("guests") as HTMLInputElement).value,
      timestamp: new Date().toISOString(),
    };

    await fetch("https://sheetdb.io/api/v1/2efldqzjq4jb4", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [formData] }),
    });
    setSubmitted(true);
  };

  return (
    <section className="py-24 bg-emerald-950 text-white px-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -ml-32 -mb-32" />

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Heart className="w-12 h-12 text-gold mx-auto mb-4 animate-pulse" />
          <h2 className="font-display text-gold text-3xl mb-2">
            Will You Join Us?
          </h2>
          <p className="font-serif italic text-ivory/60">
            Please RSVP by 1st July 2026
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-emerald-900/50 p-12 rounded-3xl border border-gold/30 text-center"
          >
            <h3 className="font-serif text-3xl text-gold mb-4">Shukran!</h3>
            <p className="text-ivory/80">
              Thank you for your response. We look forward to seeing you!
            </p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 bg-ivory/5 p-8 md:p-12 rounded-3xl border border-gold/20 backdrop-blur-sm"
          >
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gold-light">
                Full Name
              </Label>
              <Input
                id="name"
                required
                className="bg-emerald-950/50 border-gold/30 text-ivory focus:ring-gold"
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="guests" className="text-gold-light">
                Number of Guests
              </Label>
              <Input
                id="guests"
                type="number"
                min="1"
                required
                className="bg-emerald-950/50 border-gold/30 text-ivory focus:ring-gold"
                placeholder="How many are coming?"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gold hover:bg-gold/90 text-emerald-950 font-display py-6 text-lg rounded-xl transition-all group"
            >
              <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />{" "}
              Confirm Attendance
            </Button>
          </motion.form>
        )}
      </div>
    </section>
  );
};

const Duas = () => (
  <section className="py-24 bg-ivory text-center px-4 islamic-pattern">
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="p-12 rounded-[3rem] border-2 border-gold/20 relative"
      >
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-ivory px-4">
          <Heart className="text-gold w-12 h-12 fill-gold/10" />
        </div>

        <h2 className="font-arabic text-3xl md:text-5xl text-emerald-950 mb-8 leading-relaxed">
          بَارَكَ اللهُ لَكَ، وَبَارَكَ عَلَيْكَ، وَجَمَعَ بَيْنَكُمَا فِي
          خَيْرٍ
        </h2>

        <p className="font-serif text-xl text-emerald-950/80 italic mb-4">
          "Barakallahu laka, wa baraka 'alaika, wa jama'a bainakuma fii khair."
        </p>

        <p className="font-sans text-emerald-950/60 uppercase tracking-widest text-sm">
          May Allah bless you and shower His blessings upon you and unite you
          both in goodness.
        </p>
      </motion.div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-16 bg-emerald-950 text-center px-4 border-t border-gold/20">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <h2 className="font-display text-gold text-2xl mb-6 tracking-widest">
        M & J
      </h2>
      <p className="font-serif italic text-gold-light/70 text-lg mb-8 max-w-md mx-auto">
        “We look forward to celebrating this blessed union with you”
      </p>
      <div className="flex justify-center gap-6 mb-8 text-gold/40">
        <Moon className="w-5 h-5" />
        <Star className="w-5 h-5" />
        <Moon className="w-5 h-5" />
      </div>
      <p className="text-ivory/30 text-xs font-sans tracking-tighter">
        © 2026 🌙 Dream Pages. All Rights Reserved. <br />
        Contact us: dreampages@gmail.com
      </p>
    </motion.div>
  </footer>
);

// --- Main App ---

export default function App() {
  return (
    <main className="min-h-screen bg-ivory selection:bg-gold/30 selection:text-emerald-950 relative">
      <SwingingLanterns />
      <FallingElements />
      <Bismillah />
      <Hero />
      <Events />
      <Venue />
      <SectionDivider />
      <Duas />
      <RSVP />
      <Footer />
    </main>
  );
}
