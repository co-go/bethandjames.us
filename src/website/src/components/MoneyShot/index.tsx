import React, { FC } from 'react';
import styles from './MoneyShot.module.sass';
import pic from './the_pic.jpeg';

export const MoneyShot: FC = () => {
  return (
    <div className={styles.container}>
      <img src={pic} alt="ooh la la" />
      <div className={styles.peepo}>
        <span className={styles.beth}>Beth</span>
        <span className={styles.and}>&</span>
        <span className={styles.james}>James</span>
      </div>
      <div className={styles.party}>
        <span className={styles.celebrate}>celebrate with us</span>
        <span className={styles.date}>February 11th, 2023</span>
      </div>
    </div>
  )
}
