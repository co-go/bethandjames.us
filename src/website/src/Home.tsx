import React from 'react';
import { Header, Item } from './components/Header';
import { MoneyShot } from './components/MoneyShot';
import { PlanPicture } from './components/PlanPicture';
import { Timeline } from './components/Timeline';
import styles from './Home.module.sass';

const Home = () => {
  return (
    <>
      <Header>
        <Item name='rsvp' />
        <Item name='travel' />
        <Item name='timeline' />
        <Item name='faq' />
        <Item name='registry' />
      </Header>
      <MoneyShot />
      <div className={styles.planSection}>
        <div className={styles.image}><PlanPicture /></div>
        <div className={styles.timeline}><Timeline /></div>
      </div>
    </>
  );
}

export default Home;
