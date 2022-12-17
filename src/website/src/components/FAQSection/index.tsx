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
        <div className={styles.questions}>
          <div className={styles.question}>
            <h2>is there a dress code?</h2>
            <span>yes! we request formal attire, including but not limited to, tea length/floor length dresses, and suits with tie/bow tie. feel free to wear any color you like, as our goal is for everyone to feel confident in whatever they choose to wear.</span>
          </div>

          <div className={styles.question}>
            <h2>can I bring a date?</h2>
            <span>due to limited space, we are only able to accommodate those guests formally invited on your wedding invitation. if you have any questions about who is invited within your group, when RSVPing, you should be able to see all names. thank you for understanding!</span>
          </div>

          <div className={styles.question}>
            <h2>are kids welcome?</h2>
            <span>we love your little ones! however, we have decided to keep our wedding reception an adults only event.</span>
          </div>

          <div className={styles.question}>
            <h2>is there parking at the venue?</h2>
            <span>yes! the venue has ample parking. however, as there will be an open bar (YAY), there are plenty of option for ubers, lyfts, etc.</span>
          </div>

          <div className={styles.question}>
            <h2>where should i stay?</h2>
            <span>there are many hotels within 20 minutes or less of our venue. we have also confirmed room blocks at a variety of hotels if you would like to utilize them! please check the 'travel' section for more details.</span>
          </div>

          <div className={styles.question}>
            <h2>where is the event located?</h2>
            <span>the event is at <a className={styles.link} href="https://www.winslowbaltimore.com/" target="_blank" rel="noreferrer">the winslow (333 w ostend st. baltimore, md 21230)</a> and will be held entirely indoors.</span>
          </div>

          <div className={styles.question}>
            <h2>will there be a ceremony?</h2>
            <span>as we eloped this passed June, this event will be a celebration of our marriage. this means that we will not have a ceremony, but will be skipping to the best parts of a wedding (the drinking, eating, and dancing!)</span>
          </div>

          <div className={styles.question}>
            <h2>is the venue wheelchair accessible? </h2>
            <span>yes! the venue is ADA friendly.</span>
          </div>

          <div className={styles.question}>
            <h2>what time should i arrive?</h2>
            <span>please arrive at the start of the event (6:00pm), where we will schmooze and have hors d'oeuvres.</span>
          </div>

          <div className={styles.question}>
            <h2>will there be special dietary food options (e.g., gluten free or vegan)?</h2>
            <span>yes! while everything being served is vegan, if you have any further dietary restrictions or allergies, please note them when you submit your rsvp.</span>
          </div>
        </div>

        <h1>if you have any further questions about the day, feel free to reach out to james or beth!</h1>
      </div>
    </div>
  )
}

export default FAQSection;
