import React, { FC, useEffect, useRef, useState } from 'react';
import cx from "classnames";
import { Header, Item } from './components/Header';
import { MoneyShot } from './components/MoneyShot';
import { PlanPicture } from './components/PlanPicture';
import { Timeline } from './components/Timeline';
import styles from './Home.module.sass';

const Home = () => {
  const sections = [
    {
      ref: useRef<HTMLDivElement>(null),
      bgClass: styles.headerBg,
    },
    {
      ref: useRef<HTMLDivElement>(null),
      bgClass: styles.timelineBg,
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
      <Header active={activeSection} />
      <div ref={sections[0].ref} />
      <MoneyShot />
      <div ref={sections[1].ref} className={styles.planSection}>
        <PlanPicture />
        <Timeline />
      </div>
    </div>
  );
}

export default Home;
