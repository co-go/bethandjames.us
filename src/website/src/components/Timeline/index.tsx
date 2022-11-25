import React, { FC, ReactNode } from 'react';
import styles from './Timeline.module.sass';

export const Timeline: FC = () => {
  return (
    <div className={styles.container}>
      <Event time="6:00 pm - 7:00 pm" text={<SpecialText text="drink"/>} />
      <Event time="7:00 pm - 9:00 pm" text={<SpecialText text="dine"/>} />
      <Event time="9:00 pm - 11:00 pm" text={<SpecialText text="dance"/>} />
    </div>
  )
}

type EventProps = {
  time: string;
  text: ReactNode
}

const Event: FC<EventProps> = ({time, text}) => (
  <div className={styles.event}>
    <span>{time}</span>
    <span>{text}</span>
    <span>the winslow<br />333 w ostend st, baltimore, md 21230</span>
  </div>
)

type TextProps = {
  text: string
}

const SpecialText: FC<TextProps> = ({ text }) => (
  <span className={styles.specialStandard}>we <span className={styles.specialSpecial}>{text}</span></span>
);
