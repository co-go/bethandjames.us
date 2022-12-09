import React, { FC } from 'react';
import { Parallax } from 'react-scroll-parallax';
import styles from './MoneyShot.module.sass';
import pic from './the_pic.jpeg';

export const MoneyShot: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <Parallax speed={3}>
          <img src={pic} alt="ooh la la" />
        </Parallax>
        <div className={styles.peepo}>
          <Parallax speed={-3}>
            <span className={styles.beth}>Beth</span>
          </Parallax>
          <Parallax speed={-3}>
            <span className={styles.and}>&</span>
          </Parallax>
          <Parallax speed={-5}>
            <span className={styles.james}>James</span>
          </Parallax>
        </div>
        <div className={styles.party}>
          <Parallax speed={-4}>
            <span className={styles.celebrate}>celebrate with us</span>
          </Parallax>
          <Parallax speed={-8}>
            <span className={styles.date}>February 11th, 2023</span>
          </Parallax>
        </div>
      </div>
    </div>
  )
}
