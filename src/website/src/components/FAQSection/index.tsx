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
        <h2>what should i wear?</h2>
        <span>black tie mixed with cyberpunk-themed masquerade attire.</span>

        <h2>are kids welcome?</h2>
        <span>nope, leave them at home.</span>

        <h2>where should I stay?</h2>
        <span>there are plenty of options in the city for you to pick from. we've reserved a couple of room blocks at some hotels we'd reccommend, linked under the <i>travel</i> section.</span>

        <h2>will the event be indoors or outdoors?</h2>
        <span>all indoors</span>

        <h2>what should I do if I cannot make it?</h2>
        <span>we'll miss your company! please respond "no" to the rsvp form so we can adjust accordingly.</span>

        <h2>what should I do if i'm not feeling well?</h2>
        <span>due to the potential risk to our other guests, we'd ask that you would stay home. while we would love to be able to party with you, we will find another, safer, opportunity to do so!</span>

        <h2>what time should I arrive?</h2>
        <span>feel free to arrive at 5:30 pm, at the start of the event</span>

        <h2>how do I get to the venue?</h2>
        <span>there is enough free parking for our entire party at the venue, so feel free to drive up, or use your favorite ride-sharing service (uber, lyft, ...) to come by!</span>

        <h2>can I bring a plus one?</h2>
        <span>unfortunately, due to budget, only those listed on your invite can attend</span>

        <h2>will there be special dietary food options (e.g., gluten free or vegan)?</h2>
        <span>while everything that we are serving on the day is vegan, if you have further dietary restrictions, please be sure to note them when submitting your rsvp!</span>

        <h2>will there be an open bar or cash bar?</h2>
        <span>open bar!</span>

        <h1>if you have any further questions about the day, feel free to reach out to james or beth!</h1>
      </div>
    </div>
  )
}

export default FAQSection;
