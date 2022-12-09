import React, { FC } from 'react';
import { Parallax } from 'react-scroll-parallax';
import styles from './FAQSection.module.sass';
import pic from './dawg.jpeg';

const FAQSection: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Parallax speed={3}>
          <img src={pic} alt="walking" />
        </Parallax>
        <Parallax className={styles.title} speed={-1}>
          <div>FAQ</div>
        </Parallax>
      </div>
      <div className={styles.content}>
        <h1>what should i wear?</h1>
        <p>whatever you'd like</p>

        <h1>what should i wear?</h1>
        <p>whatever you'd like</p>

        <h1>what should i wear?</h1>
        <p>whatever you'd like</p>
      </div>
    </div>
  )
}

export default FAQSection;
