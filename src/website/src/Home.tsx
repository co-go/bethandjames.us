import React, { FC, useEffect, useRef, useState } from 'react';
import cx from "classnames";
import { Header, Item } from './components/Header';
import { MoneyShot } from './components/MoneyShot';
import { PlanPicture } from './components/PlanPicture';
import { Timeline } from './components/Timeline';
import styles from './Home.module.sass';
import RSVPSection from './components/RSVPSection';
import TravelSection from './components/TravelSection';
import FAQSection from './components/FAQSection';
import RegistrySection from './components/RegistrySection';

const Home = () => {
  const sections = [
    {
      ref: useRef<HTMLDivElement>(null),
      bgClass: styles.headerBg,
      label: ""
    },
    {
      ref: useRef<HTMLDivElement>(null),
      bgClass: styles.rsvpBg,
      label: "rsvp"
    },
    {
      ref: useRef<HTMLDivElement>(null),
      bgClass: styles.timelineBg,
      label: "timeline"
    },
    {
      ref: useRef<HTMLDivElement>(null),
      bgClass: styles.travelBg,
      label: "travel"
    },
    {
      ref: useRef<HTMLDivElement>(null),
      bgClass: styles.faqBg,
      label: "faq"
    },
    {
      ref: useRef<HTMLDivElement>(null),
      bgClass: styles.registryBg,
      label: "registry"
    }
  ]

  const [bgClass, setBgClass] = useState(sections[0].bgClass)
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      for (let i = sections.length - 1; i >= 0; i--) {
        if (
          sections[i].ref.current!.offsetTop - 100 < window.scrollY) {
          setBgClass(sections[i].bgClass);
          setActiveSection(i);
          return;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setBgClass]);

  return (
    <div className={cx(styles.container, bgClass)}>
      <Header active={activeSection} sections={sections.slice(1)} />
      <div ref={sections[0].ref} />
      <MoneyShot />
      <div ref={sections[1].ref} className={styles.rsvpSection}>
        <RSVPSection />
      </div>
      <div ref={sections[2].ref} className={styles.planSection}>
        <PlanPicture />
        <Timeline />
      </div>
      <div ref={sections[3].ref} className={styles.travelSection}>
        <TravelSection />
      </div>
      <div ref={sections[4].ref} className={styles.faqSection}>
        <FAQSection />
      </div>
      <div ref={sections[5].ref} className={styles.registrySection}>
        <RegistrySection />
      </div>
    </div>
  );
}

export default Home;
