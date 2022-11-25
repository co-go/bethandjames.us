import React, { FC } from 'react';
import styles from './PlanPicture.module.sass';
import pic from './stomp.jpeg';

export const PlanPicture: FC = () => {
  return (
    <div className={styles.container}>
      <img src={pic} alt="stomp" />
      <div className={styles.title}>the plan</div>
    </div>
  )
}
