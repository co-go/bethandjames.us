import React, { FC } from 'react';
import { Parallax } from 'react-scroll-parallax';
import styles from './RSVPSection.module.sass';
import pic from './wassup.jpeg';

const RSVPSection: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Parallax speed={3}>
          <img src={pic} alt="walking" />
        </Parallax>
        <Parallax className={styles.title} speed={-1}>
          <div>RSVP</div>
        </Parallax>
      </div>
      <div className={styles.content}>
        <h1>we'd love to have you!</h1>
        <p>click the button below to rsvp (or edit your responses) for yourself and your party. <i>please be sure to respond by january 11th</i></p>
        <a className={styles.rsvpButton} href="https://example.com" rel="noreferrer" target="_blank">let's party</a>
      </div>
    </div>
  )
}

export default RSVPSection;
