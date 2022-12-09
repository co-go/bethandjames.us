import React, { FC } from 'react';
import { Parallax } from 'react-scroll-parallax';
import styles from './PlanPicture.module.sass';
import pic from './stomp.jpeg';

export const PlanPicture: FC = () => {
  return (
    <div className={styles.container}>
      <Parallax speed={5}>
        <img src={pic} alt="stomp" />
      </Parallax>
      <Parallax className={styles.title} speed={-3}>
        <div>the plan</div>
      </Parallax>
    </div>
  )
}
