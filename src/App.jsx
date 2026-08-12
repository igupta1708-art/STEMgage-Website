import { useState, useEffect, useRef, useCallback } from "react";
import {
  Building2, Egg, Orbit, Ship, Waypoints, Sparkles, ArrowRight, MapPin,
  Clock, CalendarDays, Mail, Phone, Instagram, Facebook, Menu, X, Search,
  Heart, Users, GraduationCap, Hammer, Lightbulb, Rocket, Star,
  CheckCircle2, ChevronLeft, ChevronRight, BookOpen, HandHeart, Images,
  ArrowLeft, Maximize2, Play
} from "lucide-react";
import spaghettiTowerImg from "./images/IMG_2659.jpeg";
import eggDropImg from "./images/IMG_6457.jpg";
import marbleRunImg from "./images/IMG_6459.jpg";
import foilBoatImg from "./images/IMG_6468.jpg";
import paperBridgeImg from "./images/IMG_6470.jpg";

import missionImg from "./images/IMG_6475.jpg";

import ishaanPhoto from "./images/IMG_9386.jpg";
import nealPhoto from "./images/neal.jpg";
import neelPhoto from "./images/neel.jpg";
import reyhaanPhoto from "./images/rey.jpg";
import abhiPhoto from "./images/abhi.jpg";
import mayaPhoto from "./images/maya.jpg";
import panavPhoto from "./images/panav.jpg";
import nikhilPhoto from "./images/nikhil.jpg";
import micahPhoto from "./images/micah.jpg";

import logo from "./images/drawing.svg"

import emailjs from "@emailjs/browser";

/* ----------------------------------------------------------------------------
   STEMgage — hands-on STEM for elementary kids, at the library, free.
   Single-file React site. Brand color via CSS vars + inline style; Tailwind
   handles layout/spacing/responsive. No external images (placeholders are
   designed "build-spec" tiles so nothing ever shows up broken).
---------------------------------------------------------------------------- */

const C = {
  ink: "#112250", blueprint: "#0B1F4D", cobalt: "#2B6BEF", cobaltDeep: "#1A4FD0",
  sky: "#E8F0FF", sunny: "#FFC233", sunnyDeep: "#F4A800", sprout: "#2FBF71",
  coral: "#FF7A59", cloud: "#FFFFFF", paper: "#F6F9FF",
};

// Vite imports every event photo from the matching folder, keeping galleries easy to update.
// Videos are intentionally curated: several uploaded originals are hundreds of MB to 1 GB.
const eventPhotoModules = import.meta.glob(
  "./images/{spaghetti tower,marshmallow launcher,paper bridge,tinfoil boat,paper marble track,egg drop challenge,paper marble track 2,codebusting,cantilever}/*.{jpg,jpeg,JPG,JPEG}",
  { eager: true, import: "default", query: "?url" }
);
const paperBridgeVideo = new URL("./images/paper bridge/IMG_0130.mp4", import.meta.url).href;
const marshmallowVideos = [
  new URL("./images/marshmallow launcher/IMG_0006.mp4", import.meta.url).href,
  new URL("./images/marshmallow launcher/IMG_9998.mp4", import.meta.url).href,
  new URL("./images/marshmallow launcher/IMG_0008.mp4", import.meta.url).href,
];
const tinfoilBoatVideo = new URL("./images/tinfoil boat/IMG_0171.mp4", import.meta.url).href;

function eventPhotos(folder) {
  return Object.entries(eventPhotoModules)
    .filter(([path]) => path.includes(`/images/${folder}/`))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([path, src]) => ({
      src,
      type: "image",
      filename: path.split("/").pop(),
    }));
}

const eventPhoto = (folder, filename) =>
  eventPhotos(folder).find((media) => media.filename === filename);

// Home-page highlight reel: one landscape-friendly, representative moment from every past event.
const pastEventHighlights = [
  { key: "spaghetti", name: "Spaghetti Tower", date: "February 1, 2026", location: "Wellington Library", tagline: "Build tall with spaghetti, tape, and a lot of imagination.", media: eventPhoto("spaghetti tower", "IMG_9748.jpg"), g1: C.cobalt, g2: C.sprout },
  { key: "marshmallow", name: "Marshmallow Launcher", date: "February 15, 2026", location: "Wellington Library", tagline: "Design it, launch it, then adjust your aim.", media: eventPhoto("marshmallow launcher", "IMG_9981.jpg"), g1: C.coral, g2: C.sunny },
  { key: "bridge", name: "Paper Bridge", date: "March 1, 2026", location: "Wellington Library", tagline: "Fold, reinforce, and see how much your bridge can hold.", media: { src: paperBridgeVideo, type: "video" }, g1: C.sunny, g2: C.sprout },
  { key: "tinfoil", name: "Tinfoil Boat", date: "March 15, 2026", location: "Wellington Library", tagline: "Shape foil into a boat that stays afloat under pressure.", media: eventPhoto("tinfoil boat", "IMG_0170.jpg"), g1: C.sprout, g2: C.cobalt },
  { key: "marble-one", name: "Paper Marble Track", date: "May 24, 2026", location: "Wellington Library", tagline: "Make a paper path that keeps the marble rolling.", media: eventPhoto("paper marble track", "IMG_1125.jpg"), g1: C.cobalt, g2: C.coral },
  { key: "egg", name: "Egg Drop Landing Pad Challenge", date: "June 7, 2027", location: "Wellington Library", tagline: "Create a landing pad that gives your egg a fighting chance.", media: eventPhoto("egg drop challenge", "IMG_9183.jpg"), g1: C.sunny, g2: C.coral },
  { key: "marble-two", name: "Paper Marble Track", date: "June 21, 2026", location: "Wellington Library", tagline: "New ramps, sharper turns, and more marble momentum.", media: eventPhoto("paper marble track 2", "IMG_9423.jpg"), g1: C.cobalt, g2: C.sprout },
  { key: "codebusting", name: "Codes and Codebusting", date: "July 12, 2026", location: "Wellington Library", tagline: "Spot patterns, crack clues, and unlock the message.", media: eventPhoto("codebusting", "IMG_2622.jpg"), g1: C.sunny, g2: C.cobalt },
  { key: "cantilever", name: "Cantilever", date: "July 26, 2026", location: "Wellington Library", tagline: "Balance, build, and test a structure that reaches out.", media: eventPhoto("cantilever", "IMG_0970.JPG"), g1: C.sprout, g2: C.cobalt },
];

const challenges = [
  { key: "tower",  name: "Spaghetti Tower", image: spaghettiTowerImg, g1: C.cobalt, g2: C.sprout,
    tagline: "Build a tower out of spaghetti. Yes, really.",
    blurb: "Tallest free-standing tower from dry pasta and a little tape wins. Easy to start, surprisingly hard to top." },
  { key: "egg",    name: "Egg Drop", image: eggDropImg, g1: C.sunny, g2: C.coral,
    tagline: "Drop an egg. Keep it whole. Win.",
    blurb: "Design a landing pad that protects a raw egg from a serious fall. One crack and it's back to the drawing board." },
  { key: "marble", name: "Marble Run", image: marbleRunImg, g1: C.cobalt, g2: C.coral,
    tagline: "Send a marble on the ride of its life.",
    blurb: "Cut, fold, and angle paper tracks to keep a marble rolling the longest without flying off." },
  { key: "boat",   name: "Foil Boat", image: foilBoatImg, g1: C.sprout, g2: C.cobalt,
    tagline: "Float a boat made of foil.",
    blurb: "Shape a sheet of aluminum foil into a boat that holds the most weight before it sinks." },
  { key: "bridge", name: "Paper Bridge", image: paperBridgeImg, g1: C.sunny, g2: C.sprout,
    tagline: "Build a bridge from paper that actually holds.",
    blurb: "Span a gap with nothing but paper and creativity, then load it up and see what it can carry." },
];

const events = [
  {
    branch: "Wellington Library",
    date: "Sat, Aug 30, 2026",
    time: "2:00 – 3:30 PM",
    icon: Building2,
    g1: C.cobalt,
    g2: C.sprout,
    link: "https://pbclibrary.bibliocommons.com/v2/events?_gl=11shc2x_gaMTI0MzM4NTk2Mi4xNzg1MjY2Mjgw_ga_G99DMMNG39*czE3ODUyNjYyNzkkbzEkZzAkdDE3ODUyNjYyODAkajU5JGwwJGgw&startDate=2026-08-30&endDate=2026-08-30&locations=WELLINGTON"
  },

  {
    branch: "Palm Beach Gardens Branch Library",
    date: "Sat, Sep 12, 2026",
    time: "2:00 – 3:30 PM",
    icon: Egg,
    g1: C.sunny,
    g2: C.coral,
    link: "https://pbclibrary.bibliocommons.com/v2/events?_gl=1*1rwxdlk*_ga*OTA4NTIyMjQ3LjE3ODYwNTkyMDM.*_ga_G99DMMNG39*czE3ODYwNTkyMDMkbzEkZzEkdDE3ODYwNTk1NzQkajYwJGwwJGgw&types=66faee1b93c6a32800d41494&locations=GARDENS&startDate=2026-09-12&endDate=2026-09-12"
  },

  {
    branch: "Wellington Library",
    date: "Sun, Sep 13, 2026",
    time: "2:00 – 3:30 PM",
    icon: Orbit,
    g1: C.cobalt,
    g2: C.coral,
    link: "https://pbclibrary.bibliocommons.com/v2/events?_gl=1*1rwxdlk*_ga*OTA4NTIyMjQ3LjE3ODYwNTkyMDM.*_ga_G99DMMNG39*czE3ODYwNTkyMDMkbzEkZzEkdDE3ODYwNTk1NzQkajYwJGwwJGgw&types=66faee1b93c6a32800d41494&startDate=2026-09-13&endDate=2026-09-13&locations=WELLINGTON"
  },

  {
    branch: "Wellington Library",
    date: "Sun, Sep 27, 2026",
    time: "2:00 – 3:30 PM",
    icon: Ship,
    g1: C.sprout,
    g2: C.cobalt,
    link: "https://pbclibrary.bibliocommons.com/v2/events?_gl=1*1rwxdlk*_ga*OTA4NTIyMjQ3LjE3ODYwNTkyMDM.*_ga_G99DMMNG39*czE3ODYwNTkyMDMkbzEkZzEkdDE3ODYwNTk1NzQkajYwJGwwJGgw&types=66faee1b93c6a32800d41494&startDate=2026-09-27&locations=WELLINGTON&endDate=2026-09-27"
  },

  {
    branch: "Wellington Library",
    date: "Sun, Oct 4, 2026",
    time: "2:00 – 3:30 PM",
    icon: Waypoints,
    g1: C.sunny,
    g2: C.sprout,
  },

  {
    branch: "West Boca Branch Library",
    date: "Sat, Oct 17, 2026",
    time: "2:00 – 3:30 PM",
    icon: Sparkles,
    g1: C.coral,
    g2: C.cobalt,
  },

  {
    branch: "Palm Beach Gardens Branch Library",
    date: "Sat, Oct 24, 2026",
    time: "2:00 – 3:30 PM",
    icon: Egg,
    g1: C.sunny,
    g2: C.coral,
  },

  {
  branch: "Wellington Library",
  date: "Sun, Nov 15, 2026",
  time: "2:00 – 3:30 PM",
  icon: Waypoints,
  g1: C.sunny,
  g2: C.sprout,
},
{
  branch: "Palm Beach Gardens Branch Library",
  date: "Sat, Nov 21, 2026",
  time: "2:00 – 3:30 PM",
  icon: Ship,
  g1: C.sprout,
  g2: C.cobalt,
},
{
  branch: "Wellington Library",
  date: "Sun, Nov 29, 2026",
  time: "2:00 – 3:30 PM",
  icon: Building2,
  g1: C.cobalt,
  g2: C.sprout,
},
{
    branch: "Wellington Library",
    date: "Sun, Dec 6, 2026",
    time: "2:00 – 3:30 PM",
    icon: Hammer,
    g1: C.cobalt,
    g2: C.sprout,
  },
  {
    branch: "Wellington Library",
    date: "Sun, Dec 13, 2026",
    time: "2:00 – 3:30 PM",
    icon: Lightbulb,
    g1: C.sunny,
    g2: C.coral,
  },
];

const team = {
  founders: [
    {
      name: "Ishaan Gupta",
      role: "Co-Founder",
      photo: ishaanPhoto,
      bio: "Ishaan is really into math, engineering, and speech and debate. He enjoys solving challenging problems, and in his free time you can usually find him playing chess or table tennis. Ishaan likes learning new things and brings a lot of energy to whatever he’s working on."
    },
    {
      name: "Nikhil Venigalla",
      role: "Co-Founder",
      photo: nikhilPhoto,
      bio: "Nikhil is a fan of all things science and math. He enjoys spending time working on problems and puzzles as well as spending time with his friends. His hobbies are playing video games and reading."
    },
    {
      name: "Neal Nayak",
      role: "Co-Founder",
      photo: nealPhoto,
      bio: "My name is Neal! I am a sophomore at Suncoast Community High School. In my free time I enjoy playing soccer, listening to music, and hanging out with friends. I am always ready to learn and grow!"
    },
  ],

  volunteers: [
    {
      name: "Neel Bharambe",
      role: "Volunteer",
      photo: neelPhoto,
      bio: "Neel is a pre-engineering student who loves building things that help people, from 3D-printed assistive devices to hands-on STEM lessons for kids. He plays varsity soccer and is involved in math competitions, robotics, and CAD design, and believes the best way to learn engineering is to make something real."
    },
    {
      name: "Reyhaan Thummadi",
      role: "Volunteer",
      photo: reyhaanPhoto,
      bio: "Reyhaan is a math competition and engineering student who wants his creativity to be seen in producing fun activities for children inspired by activities he has done in the past. He also plays the drums, swims, does taekwondo, and plays video games."
    },
    {
      name: "Abhi Yalamanchili",
      role: "Volunteer",
      photo: abhiPhoto,
      bio: "Abhinav is a Pre-Med student with a passion for science, math, and spreading a love for STEM across today’s youth. He has been tutoring kids of all ages for 4+ years and has a genuine interest in teaching as well as connecting with others. His biggest hobbies are playing the piano, tennis, basketball, and video games."
    },
    {
      name: "Maya Iyer",
      role: "Volunteer",
      photo: mayaPhoto,
      bio: "Maya is a driven student with a strong interest in healthcare. She is deeply involved in both medicine and music, from assisting in hospital settings to performing on the piano. With a passion for learning and teaching, she aims to apply her knowledge to foster engaging and meaningful educational experiences for children."
    },
    {
      name: "Panav Patel",
      role: "Volunteer",
      photo: panavPhoto,
      bio: "Panav is an avid engineer and part of his school’s robotics team, wishing to share his technical expertise with students of all ages and serve his community. Along with robotics, he is experienced in speech and debate and loves to play golf."
    },
    {
      name: "Micah Wang",
      role: "Volunteer",
      photo: micahPhoto,
      bio: "Micah is super into math, debate, and coding. In his free time, you'll usually find him playing the piano, playing chess, or hopping on video games with his friends. He loves figuring out how stuff works and brings a lot of fun energy to the team."
    },
  ],
};

const initials = (n) => n.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();

/* ---------- tiny building blocks ---------- */

function Eyebrow({ children, color = C.cobalt }) {
  return <div className="sg-eyebrow" style={{ color }}>{children}</div>;
}

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`sg-reveal ${seen ? "is-visible" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Button({ children, variant = "solid", onClick, full, as = "button", href }) {
  const base = "sg-btn " + (variant === "solid" ? "sg-btn-solid" : variant === "ghost" ? "sg-btn-ghost" : "sg-btn-yellow");
  const cls = `${base} ${full ? "w-full" : ""}`;
  if (as === "a") return <a href={href} className={cls} onClick={onClick}>{children}</a>;
  return <button type="button" className={cls} onClick={onClick}>{children}</button>;
}

/* A designed photo placeholder shaped like a build-spec sheet */
function BuildTile({ icon: Icon, image, label, g1, g2, tall }) {
  return (
    <div className="sg-tile" style={{ minHeight: tall ? 280 : 200 }}>
      <div
  className="sg-tile-art"
  style={{
    background: image
      ? "none"
      : `linear-gradient(135deg, ${g1}, ${g2})`,
    position: "relative",
    overflow: "hidden"
  }}
>
  {image ? (
    <img
      src={image}
      alt={label}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }}
    />
  ) : (
    <Icon
      size={tall ? 72 : 56}
      color="#ffffff"
      strokeWidth={1.6}
      aria-hidden="true"
    />
  )}

  <div
    className="sg-grid-overlay"
    aria-hidden="true"
    style={{ zIndex: 1 }}
  />
</div>
      <div className="sg-tile-meta">
        <span className="sg-mono-label" style={{ color: C.cobalt }}>
  PHOTO
</span>
        <span style={{ color: C.ink, fontWeight: 700 }}>{label}</span>
      </div>
    </div>
  );
}

function StatBadge({ value, label, color }) {
  return (
    <div className="sg-stat">
      <div className="sg-stat-value" style={{ color }}>{value}</div>
      <div className="sg-stat-label">{label}</div>
    </div>
  );
}

/* ---------- hero carousel ---------- */

function Hero({ go }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = pastEventHighlights.length;
  const next = useCallback(() => setI((v) => (v + 1) % n), [n]);
  const prev = () => setI((v) => (v - 1 + n) % n);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <section className="sg-hero" aria-label="Welcome to STEMgage">
      <span className="sg-blob sg-blob-1" aria-hidden="true" />
      <span className="sg-blob sg-blob-2" aria-hidden="true" />
      <div className="sg-grid-overlay sg-hero-grid" aria-hidden="true" />

      <div className="sg-container sg-hero-inner">
        <div className="sg-hero-copy">
          <div className="sg-badge">
            <CheckCircle2 size={16} aria-hidden="true" />
            No registration. Just show up.
          </div>
          <h1 className="sg-h1">
            Building tomorrow's problem solvers{" "}
            <span className="text-4xl text-blue-500 font-bold sg-underline">one step at a time.</span>
          </h1>
          <p className="sg-lead">
            Free engineering challenges at your local library where elementary students build, test, and create through exciting hands-on STEM experiences. Every event starts with a short lesson followed by a fun engineering challenge that brings science and math to life.
          </p>
          <div className="sg-hero-ctas">
            <Button onClick={() => go("events")}>Find an event near you <ArrowRight size={18} /></Button>
            <Button variant="yellow" onClick={() => go("contact")}>Bring STEMgage to your community</Button>
          </div>
          <div
            className="sg-rotator"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            aria-live="polite"
          >
            <Sparkles size={18} color={C.sunnyDeep} aria-hidden="true" />
            <span key={i} className="sg-rotator-text">{pastEventHighlights[i].tagline}</span>
          </div>
        </div>

        <div
          className="sg-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="sg-carousel-frame">
            {pastEventHighlights.map((event, idx) => {
              return (
                <div
                  key={event.key}
                  className={`sg-slide ${idx === i ? "is-active" : ""}`}
                  style={{ background: `linear-gradient(140deg, ${event.g1}, ${event.g2})` }}
                  aria-hidden={idx !== i}
                >
                  <div
  className="sg-grid-overlay"
  aria-hidden="true"
  style={{ zIndex: 1 }}
/>
                  {event.media?.type === "video" ? (
                    <video src={event.media.src} muted loop autoPlay playsInline preload="metadata" aria-label={`${event.name} at STEMgage`} className="sg-slide-media" />
                  ) : (
                    <img src={event.media?.src} alt={`${event.name} at STEMgage`} className="sg-slide-media" />
                  )}
                  <div
  className="sg-slide-cap"
  style={{ zIndex: 2 }}
>
                    <span className="sg-mono-label" style={{ color: "rgba(255,255,255,.85)" }}>PAST EVENT</span>
                    <strong>{event.name}</strong>
                    <span className="sg-slide-meta"><CalendarDays size={14} /> {event.date} <span aria-hidden="true">·</span> <MapPin size={14} /> {event.location}</span>
                    <span className="sg-slide-summary">{event.tagline}</span>
                  </div>
                </div>
              );
            })}

            <button className="sg-arrow sg-arrow-l" onClick={prev} aria-label="Previous challenge">
              <ChevronLeft size={20} />
            </button>
            <button className="sg-arrow sg-arrow-r" onClick={next} aria-label="Next challenge">
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="sg-dots" role="tablist" aria-label="Choose a past event">
            {pastEventHighlights.map((event, idx) => (
              <button
                key={event.key}
                className={`sg-dot ${idx === i ? "is-active" : ""}`}
                onClick={() => setI(idx)}
                aria-label={`Show ${event.name} from ${event.date}`}
                aria-selected={idx === i}
                role="tab"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- event card ---------- */

function EventCard({ ev, compact }) {
  const Icon = ev.icon;

  return (
    <article className={`sg-event ${compact ? "sg-event-compact" : ""}`}>
      <div
        className="sg-event-art"
        style={{ background: `linear-gradient(135deg, ${ev.g1}, ${ev.g2})` }}
      >
        <div className="sg-grid-overlay" aria-hidden="true" />
        <Icon size={40} color="#fff" strokeWidth={1.6} aria-hidden="true" />
      </div>

      <div className="sg-event-body">
        <span className="sg-pill">Free • No registration</span>

        <h3>{ev.branch}</h3>


        <ul className="sg-event-meta">
          <li>
            <CalendarDays size={15} aria-hidden="true" />
            {ev.date}
          </li>

          <li>
            <Clock size={15} aria-hidden="true" />
            {ev.time}
          </li>
        </ul>

        {ev.link && (
          <a
            href={ev.link}
            target="_blank"
            rel="noopener noreferrer"
            className="sg-event-link"
          >
            View official library event →
          </a>
        )}
      </div>
    </article>
  );
}

/* ---------- pages ---------- */

function Home({ go }) {
  const steps = [
    { icon: HandHeart, t: "Walk in", d: "Show up at the library. No registration, no fee, no special supplies needed." },
    { icon: BookOpen, t: "Quick lesson", d: "A short, friendly intro to the science behind today's challenge." },
    { icon: Hammer, t: "Timed build", d: "Race the clock to design, build, and test your creation." },
    { icon: Rocket, t: "Take the win home", d: "Kids leave with a finished build, new skills, and a reason to love STEM." },
  ];
  return (
    <>
      <Hero go={go} />

      {/* stats */}
      <section className="sg-section sg-stats-band">
        <div className="sg-container sg-stats">
          <StatBadge value="100+" label="kids served so far" color={C.cobalt} />
          <StatBadge value="$0" label="cost to every family" color={C.sprout} />
          <StatBadge value="8" label="signature build challenges" color={C.sunnyDeep} />
          <StatBadge value="2025" label="founded, and just getting started" color={C.coral} />
        </div>
      </section>

      {/* mission */}
      <section className="sg-section">
        <div className="sg-container sg-mission">
          <Reveal>
            <Eyebrow>OUR MISSION</Eyebrow>
            <h2 className="sg-h2">We close the gap between the classroom and the real world.</h2>
            <p className="sg-body">
              In 2025, we founded STEMgage after noticing that many students were learning STEM by memorizing formulas and facts instead of exploring ideas. We created free, hands-on engineering challenges that let kids build, test, and experiment, helping them discover that science and engineering are meant to be experienced, not just studied.
            </p>
            <div className="sg-hero-ctas">
              <Button onClick={() => go("about")} variant="ghost">Read our story <ArrowRight size={18} /></Button>
              <Button onClick={() => go("impact")} variant="ghost">See the impact <ArrowRight size={18} /></Button>
            </div>
          </Reveal>
          <Reveal delay={120} className="sg-mission-art">
            <div className="sg-mission-photo">
              <img
                src={eventPhoto("codebusting", "IMG_2626.jpg")?.src}
                alt="Kids working together at a STEMgage build table"
              />
              <div className="sg-mission-photo-caption">
                <span className="sg-mono-label">HANDS-ON LEARNING</span>
                <strong>Brainstorming at the build table</strong>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* how it works */}
      <section className="sg-section sg-paper">
        <div className="sg-container">
          <Reveal><Eyebrow>HOW A STEMGAGE EVENT WORKS</Eyebrow>
            <h2 className="sg-h2">Four steps, about ninety minutes, a whole lot of fun.</h2>
          </Reveal>
          <div className="sg-steps">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.t} delay={idx * 90}>
                  <div className="sg-step">
                    <span className="sg-step-num">{`0${idx + 1}`}</span>
                    <span className="sg-step-icon"><Icon size={24} color={C.cobalt} aria-hidden="true" /></span>
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* upcoming events preview */}
      <section className="sg-section">
        <div className="sg-container">
          <Reveal>
            <div className="sg-row-between">
              <div>
                <Eyebrow color={C.sprout}>UPCOMING EVENTS</Eyebrow>
                <h2 className="sg-h2">Bring your kid to the next one.</h2>
              </div>
              <Button variant="ghost" onClick={() => go("events")}>All events <ArrowRight size={18} /></Button>
            </div>
          </Reveal>
          <div className="sg-hscroll" role="list">
            {events.slice(0, 4).map((ev) => (
              <div role="listitem" key={ev.title} className="sg-hscroll-item"><EventCard ev={ev} compact /></div>
            ))}
          </div>
          <p className="sg-note"><CheckCircle2 size={16} color={C.sprout} aria-hidden="true" /> Library events do not require registration. Just show up.</p>
        </div>
      </section>

      {/* host band */}
      <section className="sg-section">
        <div className="sg-container">
          <Reveal>
            <div className="sg-cta-band">
              <div className="sg-grid-overlay" aria-hidden="true" />
              <div className="sg-cta-band-inner">
                <Building2 size={40} color="#fff" aria-hidden="true" />
                <div>
                  <h2 className="sg-cta-title">Run STEMgage in your community</h2>
                  <p>Whether you're a student looking to volunteer, a parent who wants to help, or a library interested in hosting an event, we'd love to work together. Join us in bringing hands-on STEM experiences to more kids across our community.</p>
                </div>
                <Button variant="yellow" onClick={() => go("contact")}>Contact Us</Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function About() {
  return (
    <div className="sg-section sg-pagetop">
      <div className="sg-container sg-prose">
        <Reveal>
          <Eyebrow>ABOUT US</Eyebrow>
          <h1 className="sg-h2 sg-h2-lg">Where STEM comes to life!</h1>
          <p className="sg-body">
            STEMgage hosts free engineering events that help elementary students learn by building, testing, and creating. Each session begins with a short lesson before students tackle a hands-on engineering challenge, giving families an easy, free way to experience STEM together at their local library.
          </p>
        </Reveal>

        <Reveal delay={80} className="sg-card-soft">
          <h2 className="sg-h3">Why we started</h2>
          <p className="sg-body">
            We founded STEMgage in August 2025 after noticing a common pattern. Too often, STEM education focused on memorizing facts and completing worksheets rather than encouraging students to experiment, explore, and apply what they were learning. Too often, classroom concepts never made it into the real world.
          </p>
          <p className="sg-body">
            That gap affects some students more than others. Kinesthetic learners, who learn best by doing, can struggle in environments centered on pen-and-paper instruction. Students in underserved communities often have even fewer opportunities to experience hands-on STEM learning. We started STEMgage to help change that by making engaging, hands-on engineering experiences free and accessible to every child.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="sg-h3">Where we are headed</h2>
          <p className="sg-body">
            We have already served more than 100 elementary students at the Wellington Library branch. Now we
            are expanding across Palm Beach County, with events coming to Boca Raton libraries, Parkland
            libraries, Palm Beach Gardens Libraries, and the Boys &amp; Girls Clubs of Palm Beach County. Our goal is to reach the
            communities that need hands-on STEM the most.
          </p>
          <div className="sg-chip-row">
            {["Wellington", "Boca Raton", "Parkland", "Palm Beach Gardens", "Boys & Girls Clubs"].map((p) => (
              <span key={p} className="sg-chip"><MapPin size={14} aria-hidden="true" /> {p}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function Impact() {
  const [q, setQ] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Add future past-event galleries here. Photos are read directly from each event folder above.
  const pastEvents = [
    {
      id: "spaghetti-tower",
      challenge: "Spaghetti Tower",
      date: "February 1, 2026",
      location: "Wellington Library",
      summary: "Teams turned spaghetti and tape into their tallest free-standing structures.",
      accent: C.sprout,
      media: eventPhotos("spaghetti tower"),
    },
    {
      id: "marshmallow-launcher",
      challenge: "Marshmallow Launcher",
      date: "February 15, 2026",
      location: "Wellington Library",
      summary: "Builders explored force, aim, and iteration with their own marshmallow launchers.",
      accent: C.coral,
      media: [
        ...eventPhotos("marshmallow launcher"),
        ...marshmallowVideos.map((src, index) => ({ src, type: "video", filename: `launcher-clip-${index + 1}.mp4` })),
      ],
    },
    {
      id: "paper-bridge",
      challenge: "Paper Bridge",
      date: "March 1, 2026",
      location: "Wellington Library",
      summary: "Students designed paper bridges, tested their strength, and kept improving the build.",
      accent: C.sunnyDeep,
      media: [{ src: paperBridgeVideo, type: "video", filename: "IMG_0130.mp4" }],
    },
    {
      id: "tinfoil-boat",
      challenge: "Tinfoil Boat",
      date: "March 15, 2026",
      location: "Wellington Library",
      summary: "A single sheet of foil became a boat as teams competed to hold the most weight.",
      accent: C.cobalt,
      media: [
        ...eventPhotos("tinfoil boat"),
        { src: tinfoilBoatVideo, type: "video", filename: "foil-boat-test.mp4" },
      ],
    },
    {
      id: "paper-marble-track",
      challenge: "Paper Marble Track",
      date: "May 24, 2026",
      location: "Wellington Library",
      summary: "Kids built, tested, and tuned paper tracks to keep their marbles moving.",
      accent: C.sprout,
      media: eventPhotos("paper marble track"),
    },
    {
      id: "egg-drop-landing-pad",
      challenge: "Egg Drop Landing Pad Challenge",
      date: "June 7, 2027",
      location: "Wellington Library",
      summary: "Young engineers sketched, padded, tested, and refined their egg-protection designs.",
      accent: C.coral,
      media: eventPhotos("egg drop challenge"),
    },
    {
      id: "paper-marble-track-2",
      challenge: "Paper Marble Track",
      date: "June 21, 2026",
      location: "Wellington Library",
      summary: "A second marble-track day full of new ramps, sharp turns, and creative solutions.",
      accent: C.cobalt,
      media: eventPhotos("paper marble track 2"),
    },
    {
      id: "codes-and-codebusting",
      challenge: "Codes and Codebusting",
      date: "July 12, 2026",
      location: "Wellington Library",
      summary: "Codebreakers worked together to spot patterns, solve clues, and unlock messages.",
      accent: C.sunnyDeep,
      media: eventPhotos("codebusting"),
    },
    {
      id: "cantilever",
      challenge: "Cantilever",
      date: "July 26, 2026",
      location: "Wellington Library",
      summary: "Students experimented with balance and structure to make their cantilevers hold strong.",
      accent: C.sprout,
      media: eventPhotos("cantilever"),
    },
  ];
  const filtered = pastEvents.filter((event) =>
    `${event.challenge} ${event.location}`.toLowerCase().includes(q.toLowerCase())
  );

  if (selectedEvent) {
    return (
      <ImpactGallery
        event={selectedEvent}
        selectedPhoto={selectedPhoto}
        onBack={() => { setSelectedEvent(null); setSelectedPhoto(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        onPhotoSelect={setSelectedPhoto}
        onClosePhoto={() => setSelectedPhoto(null)}
      />
    );
  }

  return (
    <div className="sg-section sg-pagetop">
      <div className="sg-container">
        <Reveal>
          <Eyebrow color={C.coral}>IMPACT</Eyebrow>
          <h1 className="sg-h2 sg-h2-lg">What 100+ kids have already built.</h1>
          <p className="sg-body sg-measure">
            Every event ends with finished projects, big grins, and a few parents asking when the next one
            is. Pick a challenge to step inside that day&apos;s photo gallery.
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div className="sg-search">
            <Search size={18} color={C.cobalt} aria-hidden="true" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Find a challenge or library"
              aria-label="Filter the gallery by challenge"
            />
          </div>
        </Reveal>

        <Reveal>
          <div className="sg-impact-heading">
            <div>
              <h2 className="sg-h3 sg-mt">Featured moments</h2>
              <p>Explore the projects, people, and little breakthroughs from each event.</p>
            </div>
            <span className="sg-impact-count"><Images size={17} aria-hidden="true" /> {pastEvents.length} galleries</span>
          </div>
          <div className="sg-event-gallery-grid">
            {filtered.map((event) => (
              <button
                type="button"
                className="sg-event-gallery-card"
                key={event.id}
                onClick={() => { setSelectedEvent(event); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                aria-label={`Open the ${event.challenge} photo gallery`}
              >
                <div className="sg-event-gallery-photo">
                  {event.media[0]?.type === "video" ? (
                    <video src={event.media[0].src} muted playsInline preload="metadata" aria-hidden="true" />
                  ) : (
                    <img src={event.media[0]?.src} alt="" />
                  )}
                  <span className="sg-event-gallery-open">View gallery <ArrowRight size={16} /></span>
                </div>
                <div className="sg-event-gallery-body">
                  <span className="sg-mono-label" style={{ color: event.accent }}>PAST EVENT</span>
                  <h3>{event.challenge}</h3>
                  <span className="sg-event-gallery-meta"><CalendarDays size={15} /> {event.date}</span>
                  <span className="sg-event-gallery-meta"><MapPin size={15} /> {event.location}</span>
                </div>
              </button>
            ))}
            {filtered.length === 0 && <p className="sg-empty">No past event matches that search yet.</p>}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function ImpactGallery({ event, selectedPhoto, onBack, onPhotoSelect, onClosePhoto }) {
  const cover = event.media[0];
  const videoCount = event.media.filter((media) => media.type === "video").length;
  const photoCount = event.media.length - videoCount;
  return (
    <div className="sg-section sg-pagetop sg-gallery-screen">
      <div className="sg-container">
        <button type="button" className="sg-gallery-back" onClick={onBack}><ArrowLeft size={18} /> All event galleries</button>
        <div className="sg-gallery-hero">
          <div>
            <Eyebrow color={event.accent}>PAST EVENT GALLERY</Eyebrow>
            <h1 className="sg-h2 sg-h2-lg">{event.challenge}</h1>
            <p className="sg-body sg-measure">{event.summary}</p>
            <div className="sg-gallery-details">
              <span><CalendarDays size={17} /> {event.date}</span>
              <span><MapPin size={17} /> {event.location}</span>
            </div>
          </div>
          <div className="sg-gallery-hero-image">
            {cover?.type === "video" ? (
              <video src={cover.src} controls playsInline preload="metadata" aria-label={`${event.challenge} event video`} />
            ) : (
              <img src={cover?.src} alt={`${event.challenge} at STEMgage`} />
            )}
          </div>
        </div>

        <div className="sg-gallery-photo-header">
          <h2 className="sg-h3">Moments from the day</h2>
          <span>
            {photoCount ? `${photoCount} ${photoCount === 1 ? "photo" : "photos"}` : ""}
            {photoCount && videoCount ? " · " : ""}
            {videoCount ? `${videoCount} ${videoCount === 1 ? "video" : "videos"}` : ""}
          </span>
        </div>
        <div className={`sg-photo-masonry ${event.media.length === 1 ? "is-single" : ""}`}>
          {event.media.map((media, index) => (
            <button type="button" className={`sg-gallery-photo sg-gallery-photo-${index + 1}`} key={`${event.id}-${index}`} onClick={() => onPhotoSelect(media)}>
              {media.type === "video" ? (
                <video src={media.src} muted playsInline preload="metadata" />
              ) : (
                <img src={media.src} alt={`${event.challenge}, moment ${index + 1}`} loading="lazy" />
              )}
              {media.type === "video" && <em className="sg-gallery-video-label"><Play size={12} fill="currentColor" /> Video</em>}
              <span>{media.type === "video" ? <Play size={20} fill="currentColor" /> : <Maximize2 size={20} />}</span>
            </button>
          ))}
        </div>
      </div>

      {selectedPhoto && (
        <div className="sg-lightbox" role="dialog" aria-modal="true" aria-label="Expanded event photo" onClick={onClosePhoto}>
          <button type="button" className="sg-lightbox-close" onClick={onClosePhoto} aria-label="Close media"><X size={22} /></button>
          {selectedPhoto.type === "video" ? (
            <video src={selectedPhoto.src} controls autoPlay playsInline onClick={(e) => e.stopPropagation()} />
          ) : (
            <img src={selectedPhoto.src} alt={`${event.challenge} event`} onClick={(e) => e.stopPropagation()} />
          )}
        </div>
      )}
    </div>
  );
}

function Events() {
  const [q, setQ] = useState("");
  const filtered = events.filter(
    (e) => (e.title + " " + e.branch).toLowerCase().includes(q.toLowerCase())
  );
  return (
    <div className="sg-section sg-pagetop">
      <div className="sg-container">
        <Reveal>
          <Eyebrow color={C.sprout}>EVENTS</Eyebrow>
          <h1 className="sg-h2 sg-h2-lg">The next few months of building.</h1>
          <div className="sg-bigpill">
            <CheckCircle2 size={18} aria-hidden="true" />
            Library events do not require registration. Just show up.
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="sg-search">
            <Search size={18} color={C.cobalt} aria-hidden="true" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by challenge or library branch"
              aria-label="Search events"
            />
          </div>
        </Reveal>

        <p className="sg-mono-label sg-timeline-hint" style={{ color: C.cobalt }}>
          ← SCROLL THE TIMELINE →
        </p>
        <div className="sg-timeline" role="list">
          {filtered.map((ev) => (
            <div role="listitem" key={ev.title} className="sg-timeline-item">
              <span className="sg-timeline-dot" aria-hidden="true" />
              <EventCard ev={ev} />
            </div>
          ))}
          {filtered.length === 0 && <p className="sg-empty">No events match that search.</p>}
        </div>

      </div>
    </div>
  );
}

function TeamCard({ person, accent }) {
  return (
    <div className="sg-person">

      <div
        className="sg-avatar"
        style={{
          background: `linear-gradient(135deg, ${accent}, ${C.cobalt})`
        }}
      >
        {person.photo ? (
          <img
            src={person.photo}
            alt={person.name}
          />
        ) : (
          <span>{initials(person.name)}</span>
        )}
      </div>

      <h3>{person.name}</h3>

      <span
        className="sg-role"
        style={{ color: accent }}
      >
        {person.role}
      </span>

      <p className="sg-person-bio">
        {person.bio}
      </p>

    </div>
  );
}

function Team() {
  return (
    <div className="sg-section sg-pagetop">
      <div className="sg-container">
        <Reveal>
          <Eyebrow>THE TEAM</Eyebrow>
          <h1 className="sg-h2 sg-h2-lg">The people behind the builds.</h1>
          <p className="sg-body sg-measure">
            STEMgage is run by students who believe the best way to learn STEM is to make something with
            your hands. Photos and personal stories are placeholders for now.
          </p>
        </Reveal>

        <Reveal><h2 className="sg-h3 sg-mt">Co-founders</h2></Reveal>
        <div className="sg-people">
          {team.founders.map((p, i) => (
            <Reveal key={p.name} delay={i * 70}><TeamCard person={p} accent={C.sunnyDeep} /></Reveal>
          ))}
        </div>

        <Reveal><h2 className="sg-h3 sg-mt">Volunteers</h2></Reveal>
        <div className="sg-people">
          {team.volunteers.map((p, i) => (
            <Reveal key={p.name} delay={i * 60}><TeamCard person={p} accent={C.sprout} /></Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "Parent", message: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = async () => {
  try {
    await emailjs.send(
      "service_lech7tl",
      "template_xrkilrl",
      {
        name: form.name,
        email: form.email,
        role: form.role,
        message: form.message,
      },
      "A6St6BLkKs1SyZO6m"
    );

    setSent(true);

    setForm({
      name: "",
      email: "",
      role: "Parent",
      message: "",
    });

  } catch (error) {
    console.log(error);

    alert(
        JSON.stringify(error, null, 2)
    );
}
};

  return (
    <div className="sg-section sg-pagetop">
      <div className="sg-container sg-contact">
        <div>
          <Reveal>
            <Eyebrow color={C.coral}>CONTACT</Eyebrow>
            <h1 className="sg-h2 sg-h2-lg">Let's build something together.</h1>
            <p className="sg-body">
              Parents, librarians, educators, and volunteers, we want to hear from you. Reach out to bring
              STEMgage to your community or just to say hello.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <ul className="sg-contact-list">
              <li><a href="mailto:stemgage25@gmail.com"><Mail size={18} aria-hidden="true" /> stemgage25@gmail.com</a></li>
              <li><a href="tel:5618460346"><Phone size={18} aria-hidden="true" /> 561-846-0346</a></li>
            </ul>
            <div className="sg-socials">
  <a
    href="https://instagram.com/stemgage/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="STEMgage on Instagram"
    className="sg-social"
  >
    <Instagram size={20} />
  </a>

  <a
  href="https://www.facebook.com/profile.php?id=61580664672920&sk=about"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="STEMgage on Facebook"
  className="sg-social"
>
  <Facebook size={20} />
</a>
</div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="sg-form-card">
            {sent ? (
              <div className="sg-form-success" role="status" aria-live="polite">
                <CheckCircle2 size={44} color={C.sprout} aria-hidden="true" />
                <h3>Message ready to send</h3>
                <p>Thanks {form.name || "friend"}. We will get back to you soon.</p>
              </div>
            ) : (
              <div className="sg-form">
                <h3 className="sg-h3">Send us a note</h3>
                <label>Your name
                  <input value={form.name} onChange={set("name")} placeholder="Jordan Smith" />
                </label>
                <label>Email
                  <input type="email" value={form.email} onChange={set("email")} placeholder="you@email.com" />
                </label>
                <label>I am a
                  <select value={form.role} onChange={set("role")}>
                    <option>Parent</option>
                    <option>Library or community center</option>
                    <option>Educator</option>
                    <option>Volunteer</option>
                    <option>Donor or sponsor</option>
                  </select>
                </label>
                <label>Message
                  <textarea rows={4} value={form.message} onChange={set("message")} placeholder="Tell us how we can help." />
                </label>
                <Button
  full
  onClick={submit}
  disabled={
  !form.name.trim() ||
  !form.email.includes("@") ||
  !form.message.trim()
}
>
  Send message <ArrowRight size={18} />
</Button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

/* ---------- shell ---------- */

const NAV = [
  ["home", "Home"], ["about", "About"], ["impact", "Impact"],
  ["events", "Events"], ["team", "Team"], ["contact", "Contact"],
];

function Logo({ go }) {
  return (
    <button className="sg-logo" onClick={() => go("home")} aria-label="STEMgage home">
      <img
        src={logo}
        alt="STEMgage logo"
        className="sg-logo-img"
      />
      <span className="sg-logo-text">
        STEM<span style={{ color: C.sunnyDeep }}>gage</span>
      </span>
    </button>
  );
}

function Footer({ go }) {
  const [sub, setSub] = useState(false);
  const [email, setEmail] = useState("");
  const [subError, setSubError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function subscribe() {
  const trimmedEmail = email.trim();
  setSubError("");

  if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
    setSubError("Enter a valid email address.");
    return;
  }

  setSubmitting(true);

  try {
    await emailjs.send(
      "service_lech7tl",
      "template_ua5drwe",
      {
        email: trimmedEmail,
        time: new Date().toLocaleString(),
      },
      "A6St6BLkKs1SyZO6m"
    );

    setSub(true);
    setEmail("");
  } catch (error) {
    console.error(error);
    setSubError("Something went wrong. Please try again.");
  } finally {
    setSubmitting(false);
  }
}
  return (
    <footer className="sg-footer">
      <div className="sg-grid-overlay" aria-hidden="true" />
      <div className="sg-container sg-footer-grid">
        <div>
          <Logo go={go} />
          <p className="sg-footer-blurb">
            Free, hands-on STEM for elementary kids across Palm Beach County. Built by students,
            for the next generation of builders.
          </p>
          <div className="sg-socials">
  <a
    href="https://instagram.com/stemgage/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="STEMgage on Instagram"
    className="sg-social sg-social-dark"
  >
    <Instagram size={18} />
  </a>

  <a
  href="https://www.facebook.com/profile.php?id=61580664672920&sk=about"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="STEMgage on Facebook"
  className="sg-social sg-social-dark"
>
  <Facebook size={18} />
</a>
</div>
        </div>

        <nav aria-label="Footer">
          <h4>Explore</h4>
          {NAV.map(([id, label]) => (
            <button key={id} className="sg-footer-link" onClick={() => go(id)}>{label}</button>
          ))}
        </nav>

        <div>
          <h4>Get in touch</h4>
          <a className="sg-footer-link" href="mailto:stemgage25@gmail.com">stemgage25@gmail.com</a>
          <a className="sg-footer-link" href="tel:5618460346">561-846-0346</a>
        </div>

        <div className="sg-news">
          <h4>Stay in the loop</h4>
          <p className="sg-footer-blurb">Get a heads up before the next event.</p>
          {sub ? (
            <p className="sg-news-thanks" role="status"><CheckCircle2 size={16} color={C.sprout} aria-hidden="true" /> Thanks for signing up! We'll let you know about upcoming STEMgage events.</p>
          ) : (
            <div className="sg-news-form">
              <input
                value={email}
                onChange={(e) => { setEmail(e.target.value); setSubError(""); }}
                placeholder="Your email"
                aria-label="Email for newsletter"
                aria-describedby={subError ? "newsletter-error" : undefined}
              />
              <button onClick={subscribe} aria-label="Sign up for the newsletter" disabled={submitting}>
                {submitting ? "…" : <ArrowRight size={18} />}
              </button>
            </div>
          )}
          {subError && <p id="newsletter-error" className="sg-news-error" role="status">{subError}</p>}
        </div>
      </div>
      <div className="sg-container sg-footer-base">
        <span>© {new Date().getFullYear()} STEMgage. A student-run nonprofit.</span>
        <span className="sg-mono-label" style={{ color: "rgba(255,255,255,.5)" }}>HANDS-ON STEM · PALM BEACH COUNTY</span>
      </div>
    </footer>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [open, setOpen] = useState(false);
  const topRef = useRef(null);

  const go = (p) => { setPage(p); setOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <div className="sg-root" ref={topRef}>
      <style>{styles}</style>

      <header className="sg-nav">
        <div className="sg-container sg-nav-inner">
          <Logo go={go} />
          <nav className="sg-nav-links" aria-label="Primary">
            {NAV.map(([id, label]) => (
              <button
                key={id}
                className={`sg-nav-link ${page === id ? "is-active" : ""}`}
                onClick={() => go(id)}
                aria-current={page === id ? "page" : undefined}
              >
                {label}
              </button>
            ))}
          </nav>
          <div className="sg-nav-cta"><Button onClick={() => go("events")}>Find an event</Button></div>
          <button className="sg-burger" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {open && (
          <div className="sg-mobile-menu">
            {NAV.map(([id, label]) => (
              <button key={id} className={`sg-mobile-link ${page === id ? "is-active" : ""}`} onClick={() => go(id)}>{label}</button>
            ))}
            <Button full onClick={() => go("events")}>Find an event</Button>
          </div>
        )}
      </header>

      <main>
        {page === "home" && <Home go={go} />}
        {page === "about" && <About />}
        {page === "impact" && <Impact />}
        {page === "events" && <Events />}
        {page === "team" && <Team />}
        {page === "contact" && <Contact />}
      </main>

      <Footer go={go} />
    </div>
  );
}

/* ---------- styles ---------- */

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@400;600;700;800&family=Space+Mono:wght@700&display=swap');

:root{
  --ink:${C.ink}; --blueprint:${C.blueprint}; --cobalt:${C.cobalt}; --cobaltDeep:${C.cobaltDeep};
  --sky:${C.sky}; --sunny:${C.sunny}; --sunnyDeep:${C.sunnyDeep}; --sprout:${C.sprout};
  --coral:${C.coral}; --paper:${C.paper};
}
.sg-root{ font-family:'Nunito',system-ui,sans-serif; color:var(--ink); background:#fff; line-height:1.6; }
.sg-root *{ box-sizing:border-box; }
.sg-container{ max-width:1140px; margin:0 auto; padding:0 22px; }
button{ font-family:inherit; cursor:pointer; }
a{ color:inherit; text-decoration:none; }

.sg-mono-label{ font-family:'Space Mono',monospace; font-size:11px; letter-spacing:.18em; text-transform:uppercase; }
.sg-eyebrow{ font-family:'Space Mono',monospace; font-size:12px; letter-spacing:.2em; text-transform:uppercase; margin-bottom:14px; }

h1,h2,h3,h4{ font-family:'Fredoka',sans-serif; color:var(--ink); line-height:1.1; margin:0; }
.sg-h1{ font-size:clamp(34px,5.4vw,60px); font-weight:700; letter-spacing:-.01em; }
.sg-h2{ font-size:clamp(26px,3.6vw,40px); font-weight:600; }
.sg-h2-lg{ font-size:clamp(30px,4.4vw,50px); }
.sg-h3{ font-size:clamp(20px,2.4vw,26px); font-weight:600; }
.sg-lead{ font-size:clamp(16px,1.7vw,19px); color:#3a4a78; max-width:34em; margin:18px 0 26px; }
.sg-body{ font-size:16.5px; color:#3a4a78; margin:0 0 14px; }
.sg-measure{ max-width:40em; }
.sg-underline{ position:relative; color:var(--cobalt); white-space:nowrap; }
.sg-underline:after{ content:''; position:absolute; left:0; right:0; bottom:4px; height:10px; background:var(--sunny); opacity:.55; border-radius:6px; z-index:-1; }

/* grid overlay (blueprint signature) */
.sg-grid-overlay{ position:absolute; inset:0; pointer-events:none;
  background-image:linear-gradient(rgba(255,255,255,.18) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.18) 1px,transparent 1px);
  background-size:26px 26px; }

/* buttons */
.sg-btn{ display:inline-flex; align-items:center; justify-content:center; gap:8px; border:none;
  font-weight:800; font-size:15.5px; padding:13px 22px; border-radius:999px; transition:transform .15s ease, box-shadow .15s ease, background .15s ease; }
.sg-btn-solid{ background:var(--cobaltDeep); color:#fff; box-shadow:0 8px 20px rgba(26,79,208,.28); }
.sg-btn-solid:hover{ transform:translateY(-2px); box-shadow:0 12px 26px rgba(26,79,208,.36); }
.sg-btn-yellow{ background:var(--sunny); color:var(--ink); box-shadow:0 8px 20px rgba(244,168,0,.3); }
.sg-btn-yellow:hover{ transform:translateY(-2px); background:var(--sunnyDeep); }
.sg-btn-ghost{ background:transparent; color:var(--cobaltDeep); border:2px solid #cdddff; padding:11px 20px; }
.sg-btn-ghost:hover{ background:var(--sky); transform:translateY(-2px); }

/* nav */
.sg-nav{ position:sticky; top:0; z-index:50; background:rgba(255,255,255,.9); backdrop-filter:blur(10px); border-bottom:1px solid #e6edfb; }
.sg-nav-inner{ display:flex; align-items:center; justify-content:space-between; height:70px; gap:16px; }
.sg-logo{ display:flex; align-items:center; gap:10px; background:none; border:none; padding:0; }
.sg-logo-mark{ width:34px; height:34px; border-radius:10px; display:grid; place-items:center; background:linear-gradient(135deg,var(--cobalt),var(--sprout)); box-shadow:0 4px 10px rgba(43,107,239,.3); }
.sg-logo-text{ font-family:'Fredoka',sans-serif; font-weight:700; font-size:22px; color:var(--ink); }
.sg-logo-img{
    width:48px;
    height:48px;
    object-fit:contain;
    display:block;
    margin-right:10px;
}
.sg-nav-links{ display:flex; gap:4px; }
.sg-nav-link{ background:none; border:none; font-weight:700; font-size:15px; color:#4a597f; padding:8px 14px; border-radius:999px; transition:.15s; }
.sg-nav-link:hover{ color:var(--cobaltDeep); background:var(--sky); }
.sg-nav-link.is-active{ color:var(--cobaltDeep); background:var(--sky); }
.sg-burger{ display:none; background:var(--sky); border:none; color:var(--ink); width:44px; height:44px; border-radius:12px; align-items:center; justify-content:center; }
.sg-mobile-menu{ display:flex; flex-direction:column; gap:6px; padding:14px 22px 22px; border-top:1px solid #e6edfb; background:#fff; }
.sg-mobile-link{ text-align:left; background:none; border:none; font-weight:700; font-size:17px; color:#3a4a78; padding:12px 10px; border-radius:12px; }
.sg-mobile-link.is-active{ background:var(--sky); color:var(--cobaltDeep); }

/* hero */
.sg-hero{ position:relative; overflow:hidden; background:linear-gradient(180deg,#fff 0%, var(--sky) 100%); padding:48px 0 70px; }
.sg-hero-grid{ opacity:.5; background-image:linear-gradient(rgba(43,107,239,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(43,107,239,.06) 1px,transparent 1px); background-size:30px 30px; }
.sg-hero-inner{ position:relative; display:grid; grid-template-columns:1.05fr .95fr; gap:48px; align-items:center; }
.sg-hero-copy{ position:relative; z-index:2; }
.sg-badge{ display:inline-flex; align-items:center; gap:8px; background:#fff; color:var(--sprout); border:1.5px solid #bfe9d2; font-weight:800; font-size:13.5px; padding:8px 14px; border-radius:999px; margin-bottom:20px; box-shadow:0 4px 12px rgba(47,191,113,.12); }
.sg-hero-ctas{ display:flex; flex-wrap:wrap; gap:12px; }
.sg-rotator{ margin-top:26px; display:flex; align-items:center; gap:10px; background:#fff; border:1.5px dashed #cdddff; border-radius:14px; padding:12px 16px; font-weight:700; color:var(--cobaltDeep); max-width:30em; }
.sg-rotator-text{ animation:sgFade .5s ease; }
.sg-blob{ position:absolute; border-radius:50%; filter:blur(2px); opacity:.5; animation:sgFloat 9s ease-in-out infinite; }
.sg-blob-1{ width:160px; height:160px; background:var(--sunny); top:-30px; right:8%; }
.sg-blob-2{ width:120px; height:120px; background:var(--sprout); bottom:30px; left:-30px; animation-delay:2s; }

/* carousel */
.sg-carousel{ position:relative; z-index:2; }
.sg-carousel-frame{ position:relative; border-radius:24px; overflow:hidden; aspect-ratio:4/3.4; box-shadow:0 24px 50px rgba(17,34,80,.18); border:6px solid #fff; }
.sg-slide{ position:absolute; inset:0; overflow:hidden; display:flex; flex-direction:column; align-items:center; justify-content:center; opacity:0; transform:scale(1.04); transition:opacity .7s ease, transform .7s ease; }
.sg-slide.is-active{ opacity:1; transform:scale(1); }
.sg-slide:after{ content:''; position:absolute; z-index:1; inset:0; pointer-events:none; background:linear-gradient(180deg,rgba(8,20,54,.04) 30%,rgba(8,20,54,.8) 100%); }
.sg-slide-media{ position:absolute; inset:0; z-index:0; width:100%; height:100%; object-fit:cover; }
.sg-slide-cap{ position:absolute; z-index:2; left:18px; right:18px; bottom:18px; display:flex; flex-direction:column; align-items:flex-start; color:#fff; text-shadow:0 2px 8px rgba(0,0,0,.35); }
.sg-slide-cap strong{ font-family:'Fredoka',sans-serif; font-size:clamp(22px,2.4vw,28px); line-height:1.05; margin:3px 0 7px; }
.sg-slide-meta{ display:flex; align-items:center; flex-wrap:wrap; gap:5px; font-size:12px; font-weight:800; color:rgba(255,255,255,.94); }
.sg-slide-summary{ margin-top:6px; font-size:13px; line-height:1.35; font-weight:700; color:rgba(255,255,255,.9); max-width:30em; }
.sg-arrow{ position:absolute; top:50%; transform:translateY(-50%); width:40px; height:40px; border-radius:50%; border:none; background:rgba(255,255,255,.92); color:var(--ink); display:grid; place-items:center; box-shadow:0 4px 12px rgba(0,0,0,.18); }
.sg-arrow:hover{ background:#fff; }
.sg-arrow-l{ left:12px; } .sg-arrow-r{ right:12px; }
.sg-dots{ display:flex; gap:8px; justify-content:center; margin-top:16px; }
.sg-dot{ width:10px; height:10px; border-radius:50%; border:none; background:#c7d6f5; transition:.2s; }
.sg-dot.is-active{ background:var(--cobalt); width:26px; border-radius:999px; }

/* sections */
.sg-section{ padding:64px 0; }
.sg-pagetop{ padding-top:48px; }
.sg-paper{ background:var(--paper); }
.sg-mt{ margin-top:34px; margin-bottom:18px; }
.sg-row-between{ display:flex; align-items:flex-end; justify-content:space-between; gap:16px; flex-wrap:wrap; margin-bottom:26px; }

/* stats */
.sg-stats-band{ padding:0; }
.sg-stats{ display:grid; grid-template-columns:repeat(4,1fr); gap:18px; background:#fff; border:1px solid #e6edfb; border-radius:22px; padding:30px; margin-top:-44px; position:relative; z-index:5; box-shadow:0 18px 40px rgba(17,34,80,.08); }
.sg-stat{ text-align:center; }
.sg-stat-value{ font-family:'Fredoka',sans-serif; font-weight:700; font-size:clamp(30px,4vw,44px); line-height:1; }
.sg-stat-label{ font-size:14px; color:#5a6a92; margin-top:8px; font-weight:600; }

/* mission */
.sg-mission{ display:grid; grid-template-columns:1fr 1fr; gap:42px; align-items:center; }
.sg-mission-art{ width:100%; }
.sg-mission-photo{ position:relative; width:100%; min-height:390px; overflow:hidden; border-radius:26px; background:var(--sky); box-shadow:0 24px 48px rgba(17,34,80,.18); }
.sg-mission-photo:before{ content:''; position:absolute; z-index:1; inset:0; pointer-events:none; border:1px solid rgba(255,255,255,.7); border-radius:inherit; }
.sg-mission-photo:after{ content:''; position:absolute; z-index:1; inset:0; pointer-events:none; background:linear-gradient(180deg,transparent 48%,rgba(8,20,54,.72) 100%); }
.sg-mission-photo img{ width:100%; height:100%; min-height:390px; display:block; object-fit:cover; object-position:center; transition:transform .5s ease; }
.sg-mission-photo:hover img{ transform:scale(1.025); }
.sg-mission-photo-caption{ position:absolute; z-index:2; left:22px; right:22px; bottom:20px; display:flex; flex-direction:column; align-items:flex-start; color:#fff; text-shadow:0 2px 8px rgba(0,0,0,.35); }
.sg-mission-photo-caption .sg-mono-label{ color:rgba(255,255,255,.8); }
.sg-mission-photo-caption strong{ font-family:'Fredoka',sans-serif; font-size:clamp(21px,2.4vw,28px); line-height:1.1; margin-top:4px; }

/* tiles */
.sg-tile{ background:#fff; border:1px solid #e6edfb; border-radius:18px; overflow:hidden; box-shadow:0 10px 26px rgba(17,34,80,.07); }
.sg-tile-art{ position:relative; min-height:160px; display:grid; place-items:center; }
.sg-tile-meta{ display:flex; flex-direction:column; gap:2px; padding:14px 16px; }

/* steps */
.sg-steps{ display:grid; grid-template-columns:repeat(4,1fr); gap:18px; margin-top:30px; }
.sg-step{ position:relative; background:#fff; border:1px solid #e6edfb; border-radius:18px; padding:24px 20px; height:100%; transition:transform .18s ease, box-shadow .18s ease; }
.sg-step:hover{ transform:translateY(-4px); box-shadow:0 14px 30px rgba(17,34,80,.1); }
.sg-step-num{ font-family:'Space Mono',monospace; font-size:13px; color:var(--sunnyDeep); letter-spacing:.1em; }
.sg-step-icon{ display:grid; place-items:center; width:46px; height:46px; border-radius:12px; background:var(--sky); margin:10px 0 12px; }
.sg-step h3{ font-size:19px; margin-bottom:6px; }
.sg-step p{ font-size:14.5px; color:#5a6a92; margin:0; }

/* horizontal scroll */
.sg-hscroll{ display:flex; gap:18px; overflow-x:auto; padding:6px 2px 18px; scroll-snap-type:x mandatory; }
.sg-hscroll-item{ flex:0 0 300px; scroll-snap-align:start; }
.sg-note{ display:inline-flex; align-items:center; gap:8px; color:var(--sprout); font-weight:800; font-size:15px; }

/* event card */
.sg-event{ background:#fff; border:1px solid #e6edfb; border-radius:18px; overflow:hidden; box-shadow:0 10px 26px rgba(17,34,80,.07); height:100%; transition:transform .18s ease, box-shadow .18s ease; }
.sg-event:hover{ transform:translateY(-4px); box-shadow:0 18px 36px rgba(17,34,80,.12); }
.sg-event-art{ position:relative; height:110px; display:grid; place-items:center; }
.sg-event-body{ padding:18px; }
.sg-pill{ display:inline-block; background:#eafaf1; color:var(--sprout); font-weight:800; font-size:12px; padding:5px 11px; border-radius:999px; margin-bottom:10px; }
.sg-event-body h3{ font-size:19px; margin-bottom:8px; }
.sg-event-desc{ font-size:14.5px; color:#5a6a92; margin:0 0 14px; }
.sg-event-meta{ list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:7px; }
.sg-event-meta li{ display:flex; align-items:center; gap:8px; font-size:14px; color:#3a4a78; font-weight:600; }
.sg-event-meta svg{ color:var(--cobalt); flex:0 0 auto; }
.sg-event-link{
  display:inline-flex;
  align-items:center;
  gap:6px;
  margin-top:14px;
  color:var(--cobaltDeep);
  font-weight:800;
  text-decoration:none;
  transition:.2s ease;
}

.sg-event-link:hover{
  transform:translateX(4px);
  color:var(--sprout);
}
  .sg-event-tags{
  display:flex;
  flex-direction:column;
  gap:10px;
  margin:16px 0;
}

.sg-event-tags span{
  display:block;
  background:#F7FAFF;
  border:1px solid #E4EDFF;
  border-radius:999px;
  padding:8px 12px;
  font-size:14px;
  font-weight:700;
  color:#3A4A78;
}

/* cta band */
.sg-cta-band{ position:relative; overflow:hidden; border-radius:26px; background:linear-gradient(130deg,var(--cobaltDeep),var(--cobalt)); color:#fff; }
.sg-cta-band-inner{ position:relative; z-index:2; display:flex; align-items:center; gap:22px; padding:36px 40px; flex-wrap:wrap; }
.sg-cta-band-inner > div{ flex:1; min-width:240px; }
.sg-cta-title{ color:#fff; font-size:clamp(22px,2.6vw,30px); margin-bottom:8px; }
.sg-cta-band-inner p{ color:rgba(255,255,255,.9); margin:0; font-size:15.5px; }

/* prose / cards */
.sg-prose > *{ margin-bottom:26px; }
.sg-card-soft{ background:var(--paper); border:1px solid #e6edfb; border-radius:20px; padding:30px 32px; }
.sg-chip-row{ display:flex; flex-wrap:wrap; gap:10px; margin-top:16px; }
.sg-chip{ display:inline-flex; align-items:center; gap:6px; background:var(--sky); color:var(--cobaltDeep); font-weight:700; font-size:14px; padding:7px 14px; border-radius:999px; }
.sg-chip svg{ color:var(--cobalt); }

/* search */
.sg-search{ display:flex; align-items:center; gap:10px; background:#fff; border:1.5px solid #d7e2fb; border-radius:14px; padding:11px 16px; max-width:440px; margin:22px 0 10px; }
.sg-search input{ border:none; outline:none; font-family:inherit; font-size:15.5px; width:100%; color:var(--ink); background:transparent; }

/* impact galleries */
.sg-impact-heading{ display:flex; align-items:end; justify-content:space-between; gap:18px; margin-top:32px; }
.sg-impact-heading .sg-mt{ margin:0 0 6px; }
.sg-impact-heading p{ color:#5a6a92; font-size:15px; margin:0; }
.sg-impact-count{ display:inline-flex; align-items:center; gap:7px; color:var(--cobaltDeep); background:var(--sky); border-radius:999px; padding:8px 12px; font-size:13px; font-weight:800; white-space:nowrap; }
.sg-event-gallery-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-top:20px; }
.sg-event-gallery-card{ padding:0; overflow:hidden; text-align:left; color:var(--ink); background:#fff; border:1px solid #e1eafb; border-radius:20px; box-shadow:0 10px 26px rgba(17,34,80,.07); transition:transform .2s ease, box-shadow .2s ease; }
.sg-event-gallery-card:hover{ transform:translateY(-6px); box-shadow:0 20px 38px rgba(17,34,80,.14); }
.sg-event-gallery-photo{ position:relative; height:205px; overflow:hidden; background:var(--sky); }
.sg-event-gallery-photo:after{ content:''; position:absolute; inset:0; background:linear-gradient(180deg,transparent 45%,rgba(9,25,66,.56)); }
.sg-event-gallery-photo img,.sg-event-gallery-photo video{ width:100%; height:100%; object-fit:cover; display:block; transition:transform .45s ease; }
.sg-event-gallery-card:hover .sg-event-gallery-photo img,.sg-event-gallery-card:hover .sg-event-gallery-photo video{ transform:scale(1.07); }
.sg-event-gallery-open{ position:absolute; z-index:2; left:15px; bottom:14px; display:inline-flex; align-items:center; gap:6px; color:#fff; font-size:13px; font-weight:800; }
.sg-event-gallery-body{ padding:17px 18px 19px; }
.sg-event-gallery-body h3{ font-size:21px; margin:6px 0 12px; }
.sg-event-gallery-meta{ display:flex; align-items:flex-start; gap:7px; color:#52628a; font-size:13.5px; font-weight:700; margin-top:7px; line-height:1.35; }
.sg-event-gallery-meta svg{ flex:0 0 auto; color:var(--cobalt); margin-top:1px; }
.sg-gallery-screen{ min-height:70vh; background:linear-gradient(180deg,#fff 0%,#f6f9ff 100%); }
.sg-gallery-back{ display:inline-flex; align-items:center; gap:7px; border:none; background:transparent; color:var(--cobaltDeep); font-weight:800; padding:0; margin-bottom:25px; font-size:15px; }
.sg-gallery-back:hover{ transform:translateX(-3px); }
.sg-gallery-hero{ display:grid; grid-template-columns:1.05fr .95fr; gap:42px; align-items:center; padding:34px; border-radius:26px; background:#fff; border:1px solid #e2eafa; box-shadow:0 16px 38px rgba(17,34,80,.07); }
.sg-gallery-details{ display:flex; flex-direction:column; gap:10px; margin-top:22px; }
.sg-gallery-details span{ display:flex; align-items:center; gap:9px; color:#3a4a78; font-size:14.5px; font-weight:800; }
.sg-gallery-details svg{ color:var(--cobalt); }
.sg-gallery-hero-image{ min-height:300px; overflow:hidden; border-radius:18px; }
.sg-gallery-hero-image img,.sg-gallery-hero-image video{ width:100%; height:100%; object-fit:cover; display:block; }
.sg-gallery-photo-header{ display:flex; align-items:center; justify-content:space-between; margin:40px 0 18px; }
.sg-gallery-photo-header span{ font-family:'Space Mono',monospace; color:#62729a; font-size:11px; letter-spacing:.12em; text-transform:uppercase; }
.sg-photo-masonry{ display:grid; grid-template-columns:1.15fr .85fr; grid-template-rows:205px 205px; gap:16px; }
.sg-photo-masonry.is-single{ grid-template-columns:1fr; }
.sg-gallery-photo{ position:relative; padding:0; border:none; overflow:hidden; border-radius:18px; background:var(--sky); }
.sg-gallery-photo-1{ grid-row:span 2; }
.sg-gallery-photo img,.sg-gallery-photo video{ width:100%; height:100%; display:block; object-fit:cover; transition:transform .35s ease; }
.sg-gallery-photo:hover img,.sg-gallery-photo:hover video{ transform:scale(1.04); }
.sg-gallery-photo span{ position:absolute; right:13px; bottom:13px; width:38px; height:38px; display:grid; place-items:center; border-radius:50%; color:var(--ink); background:rgba(255,255,255,.92); opacity:0; transform:translateY(6px); transition:.2s ease; }
.sg-gallery-photo:hover span{ opacity:1; transform:none; }
.sg-gallery-video-label{ position:absolute; top:12px; left:12px; z-index:2; display:inline-flex; align-items:center; gap:5px; margin:0; padding:5px 9px; border-radius:999px; background:rgba(17,34,80,.86); color:#fff; font-family:'Space Mono',monospace; font-size:10px; font-style:normal; letter-spacing:.07em; text-transform:uppercase; }
.sg-lightbox{ position:fixed; inset:0; z-index:80; display:grid; place-items:center; padding:30px; background:rgba(8,18,48,.88); cursor:zoom-out; }
.sg-lightbox img,.sg-lightbox video{ max-width:min(100%,1000px); max-height:85vh; border-radius:14px; box-shadow:0 24px 70px rgba(0,0,0,.35); cursor:default; }
.sg-lightbox-close{ position:absolute; top:18px; right:20px; width:42px; height:42px; display:grid; place-items:center; border:none; border-radius:50%; color:var(--ink); background:#fff; }
.sg-empty{ color:#7585a8; font-weight:600; }

/* press */
.sg-press{ margin-top:46px; background:linear-gradient(135deg,#fff,var(--sky)); border:1px solid #e6edfb; border-radius:22px; padding:34px; }
.sg-press h2{ margin:12px 0 8px; }

/* events timeline */
.sg-bigpill{ display:inline-flex; align-items:center; gap:10px; background:var(--sprout); color:#fff; font-weight:800; font-size:15.5px; padding:12px 20px; border-radius:999px; margin-top:6px; box-shadow:0 10px 22px rgba(47,191,113,.28); }
.sg-timeline-hint{ margin:26px 0 8px; }
.sg-timeline{ display:flex; gap:22px; overflow-x:auto; padding:24px 2px 26px; scroll-snap-type:x mandatory; border-top:2px dashed #d7e2fb; }
.sg-timeline-item{ position:relative; flex:0 0 320px; scroll-snap-align:start; padding-top:14px; }
.sg-timeline-dot{ position:absolute; top:-9px; left:24px; width:16px; height:16px; border-radius:50%; background:var(--sunny); border:3px solid #fff; box-shadow:0 0 0 2px var(--sunny); }
.sg-disclaimer{ font-size:13.5px; color:#8a97b8; margin-top:18px; font-style:italic; }

/* team */
.sg-people{ display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
.sg-person{ background:#fff; border:1px solid #e6edfb; border-radius:20px; padding:26px; text-align:center; transition:transform .18s ease, box-shadow .18s ease; }
.sg-person:hover{ transform:translateY(-4px); box-shadow:0 16px 34px rgba(17,34,80,.1); }
.sg-avatar{
    width:150px;
    height:150px;
    border-radius:50%;
    overflow:hidden;
    margin:0 auto 20px;
    display:grid;
    place-items:center;
    color:#fff;
    font-family:'Fredoka',sans-serif;
    font-weight:700;
    font-size:28px;
    box-shadow:0 10px 25px rgba(43,107,239,.25);
}

.sg-avatar img{
    width:100%;
    height:100%;
    object-fit:cover;
}
.sg-person h3{ font-size:20px; }
.sg-role{ font-family:'Space Mono',monospace; font-size:12px; letter-spacing:.12em; text-transform:uppercase; display:block; margin:6px 0 12px; }
.sg-person-bio{ font-size:14px; color:#6a7aa0; margin:0; }

/* contact */
.sg-contact{ display:grid; grid-template-columns:1fr 1fr; gap:44px; align-items:start; }
.sg-contact-list{ list-style:none; padding:0; margin:22px 0 18px; display:flex; flex-direction:column; gap:12px; }
.sg-contact-list a{ display:inline-flex; align-items:center; gap:10px; font-weight:700; font-size:17px; color:var(--ink); }
.sg-contact-list svg{ color:var(--cobalt); }
.sg-socials{ display:flex; gap:10px; }
.sg-social{ width:42px; height:42px; border-radius:12px; display:grid; place-items:center; background:var(--sky); color:var(--cobaltDeep); transition:.15s; }
.sg-social:hover{ background:var(--cobalt); color:#fff; transform:translateY(-2px); }
.sg-social-dark{ background:rgba(255,255,255,.12); color:#fff; }
.sg-social-dark:hover{ background:var(--sunny); color:var(--ink); }
.sg-form-card{ background:#fff; border:1px solid #e6edfb; border-radius:22px; padding:30px; box-shadow:0 16px 38px rgba(17,34,80,.08); }
.sg-form{ display:flex; flex-direction:column; gap:14px; }
.sg-form label{ display:flex; flex-direction:column; gap:7px; font-weight:700; font-size:14px; color:var(--ink); }
.sg-form input,.sg-form select,.sg-form textarea{ font-family:inherit; font-size:15.5px; padding:12px 14px; border:1.5px solid #d7e2fb; border-radius:12px; outline:none; color:var(--ink); background:#fff; }
.sg-form input:focus,.sg-form select:focus,.sg-form textarea:focus{ border-color:var(--cobalt); box-shadow:0 0 0 3px rgba(43,107,239,.15); }
.sg-form-success{ text-align:center; display:flex; flex-direction:column; align-items:center; gap:10px; padding:18px 6px; }
.sg-form-success p{ color:#5a6a92; margin:0; }

/* footer */
.sg-footer{ position:relative; overflow:hidden; background:var(--blueprint); color:#fff; padding:54px 0 26px; margin-top:20px; }
.sg-footer .sg-grid-overlay{ opacity:.25; }
.sg-footer-grid{ position:relative; z-index:2; display:grid; grid-template-columns:1.4fr .8fr .9fr 1fr; gap:30px; }
.sg-footer .sg-logo-text{ color:#fff; }
.sg-footer-blurb{ color:rgba(255,255,255,.72); font-size:14.5px; margin:14px 0; max-width:30em; }
.sg-footer h4{ color:#fff; font-size:16px; margin-bottom:14px; }
.sg-footer-link{ display:block; background:none; border:none; text-align:left; color:rgba(255,255,255,.78); font-size:14.5px; font-weight:600; padding:5px 0; transition:.15s; }
.sg-footer-link:hover{ color:var(--sunny); }
.sg-news-form{ display:flex; gap:8px; }
.sg-news-form input{ flex:1; min-width:0; border:none; border-radius:12px; padding:11px 14px; font-family:inherit; font-size:14.5px; }
.sg-news-form button{ width:46px; border:none; border-radius:12px; background:var(--sunny); color:var(--ink); display:grid; place-items:center; }
.sg-news-form button:hover{ background:var(--sunnyDeep); }
.sg-news-form button:disabled{ cursor:wait; opacity:.7; }
.sg-news-thanks{ display:inline-flex; align-items:center; gap:8px; color:#9fe9c1; font-weight:700; }
.sg-news-error{ margin:9px 0 0; color:#ffd2c7; font-size:13px; font-weight:700; line-height:1.35; }
.sg-footer-base{ position:relative; z-index:2; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-top:36px; padding-top:20px; border-top:1px solid rgba(255,255,255,.12); color:rgba(255,255,255,.6); font-size:13.5px; }

/* reveal + keyframes */
.sg-reveal{ opacity:0; transform:translateY(22px); transition:opacity .6s ease, transform .6s ease; }
.sg-reveal.is-visible{ opacity:1; transform:none; }
@keyframes sgFloat{ 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(-16px); } }
@keyframes sgFade{ from{ opacity:0; transform:translateY(6px); } to{ opacity:1; transform:none; } }

:focus-visible{ outline:3px solid var(--cobalt); outline-offset:3px; border-radius:6px; }

/* responsive */
@media (max-width:920px){
  .sg-hero-inner{ grid-template-columns:1fr; gap:34px; }
  .sg-mission{ grid-template-columns:1fr; gap:28px; }
  .sg-stats{ grid-template-columns:repeat(2,1fr); }
  .sg-steps{ grid-template-columns:repeat(2,1fr); }
  .sg-event-gallery-grid,.sg-people{ grid-template-columns:repeat(2,1fr); }
  .sg-gallery-hero{ grid-template-columns:1fr; gap:26px; }
  .sg-contact{ grid-template-columns:1fr; gap:30px; }
  .sg-footer-grid{ grid-template-columns:1fr 1fr; }
  .sg-nav-links,.sg-nav-cta{ display:none; }
  .sg-burger{ display:grid; }
}
@media (max-width:560px){
  .sg-stats{ grid-template-columns:1fr 1fr; }
  .sg-steps,.sg-event-gallery-grid,.sg-people,.sg-footer-grid{ grid-template-columns:1fr; }
  .sg-impact-heading{ align-items:flex-start; flex-direction:column; }
  .sg-gallery-hero{ padding:24px; }
  .sg-gallery-hero-image{ min-height:220px; }
  .sg-photo-masonry{ grid-template-columns:1fr; grid-template-rows:260px 190px 190px; }
  .sg-gallery-photo-1{ grid-row:auto; }
  .sg-mission-photo,.sg-mission-photo img{ min-height:290px; }
  .sg-cta-band-inner{ padding:28px 24px; }
  .sg-section{ padding:48px 0; }
}
@media (prefers-reduced-motion:reduce){
  *{ animation:none !important; transition:none !important; }
  .sg-reveal{ opacity:1; transform:none; }
}
`;
