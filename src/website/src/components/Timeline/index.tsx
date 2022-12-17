import React, { FC, ReactNode } from 'react';
import styles from './Timeline.module.sass';

export const Timeline: FC = () => {
  return (
    <div className={styles.container}>
      <Event time="6:00 pm - 7:15 pm" text={<SpecialText text="drink"/>} description={<span>cocktail hour<br />hors d'oeuvres<br />live music<br />open bar</span>} />
      <Event time="7:30 pm - 8:30 pm" text={<SpecialText text="dine" />} description={<span>entrance<br />dinner<br />speeches</span>} />
      <Event time="8:30 pm - 11:00 pm" text={<SpecialText text="dance" />} description={<span>live music<br />open bar<br />desserts<br />having the time of your life</span>} />
    </div>
  )
}

type EventProps = {
  time: string;
  text: ReactNode
  description: ReactNode
}

const Event: FC<EventProps> = ({time, text, description}) => (
  <div className={styles.event}>
    <span><b>{time}</b></span>
    <span>{text}</span>
    <span>{description}</span>
  </div>
)

type TextProps = {
  text: string
}

const SpecialText: FC<TextProps> = ({ text }) => (
  <span className={styles.specialStandard}>we <span className={styles.specialSpecial}>{text}</span></span>
);
