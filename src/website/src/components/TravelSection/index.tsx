import React, { FC } from 'react';
import { Parallax } from 'react-scroll-parallax';
import styles from './TravelSection.module.sass';
import pic from './mooovin.jpeg';

const TravelSection: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.travelWrapper}>
        <div className={styles.imgContainer}>
          <Parallax speed={3} style={{height: "100%"}}>
            <img src={pic} alt="moooovin" />
          </Parallax>
          <Parallax className={styles.title} speed={-1}>
            <div>travel</div>
          </Parallax>
        </div>
        <div className={styles.tContent}>
          <h1>transportation</h1>
          <h2>by <span className={styles.special}>Air</span></h2>
          <h3>BWI</h3>
          <a className={styles.specialLink} href="https://www.bwiairport.com/" target="_blank" rel="noreferrer">Baltimore/Washington International Thurgood Marshall Airport</a>
          <span>(8.9 miles from venue)</span>
          <br />

          <h3>DCA</h3>
          <a className={styles.specialLink} href="https://www.flyreagan.com/" target="_blank" rel="noreferrer">Ronald Reagan Washington National Airport</a>
          <span>(44.1 miles from venue)</span>
          <br />

          <h2>by <span className={styles.special}>Train</span></h2>
          <h3>Amtrack</h3>
          <a className={styles.specialLink} href="https://www.amtrak.com/stations/bal" target="_blank" rel="noreferrer">Baltimore, MD - Penn Station (BAL)</a>
          <span>(3.9 miles from venue)</span>
        </div>
      </div>

      <br /><br />
      <div className={styles.lContent}>
        <h1 className={styles.subtitle}>lodging</h1>
        <div className={styles.hotelWrapper}>
          <div className={styles.lodgingContainer}>
            <h2><a className={styles.specialLink} href="https://www.hilton.com/en/book/reservation/deeplink/?ctyhocn=BWIHPPY&groupCode=COGO&arrivaldate=2023-02-07&departuredate=2023-02-14&cid=OM,WW,HILTONLINK,EN,DirectLink&fromId=HILTONLINKDIRECT" target="_blank" rel="noreferrer">The Canopy *</a></h2>
            <span>1215 Wills St<br />Baltimore, MD 21231</span>
            <span>(443) 422-6679</span>
            <span><i>(13 minutes from venue)</i></span>
          </div>
          <div className={styles.lodgingContainer}>
            <h2><a className={styles.specialLink} href="https://www.marriott.com/en-us/hotels/bwiwf-baltimore-marriott-waterfront/overview/" target="_blank" rel="noreferrer">The Marriott Waterfront</a></h2>
            <span>700 Aliceanna St<br />Baltimore, MD 21202</span>
            <span>(410) 385-3000</span>
            <span><i>(11 minutes from venue)</i></span>
          </div>
          <div className={styles.lodgingContainer}>
            <h2><a className={styles.specialLink} href="https://www.hilton.com/en/book/reservation/deeplink/?ctyhocn=BWIHPPY&groupCode=COGO&arrivaldate=2023-02-07&departuredate=2023-02-14&cid=OM,WW,HILTONLINK,EN,DirectLink&fromId=HILTONLINKDIRECT" target="_blank" rel="noreferrer">Another Hotel *</a></h2>
            <span>1215 Street St<br />Baltimore, MD 21231</span>
            <span>(443) 422-6679</span>
            <span><i>(10 minutes from venue)</i></span>
          </div>
        </div>
        <b className={styles.details}>* rooms have been blocked at these hotels, use the links above or mention <i>corley-goldberg</i> to get a group rate!</b>
        <p className={styles.details}>
          these are not the only options! feel free to look at <a className={styles.specialLink} href="https://www.airbnb.com/" target="_blank" rel="noreferrer">airbnb</a> or other hotels around the inner harbor in Baltimore.
        </p>
      </div>
    </div>
  )
}

export default TravelSection;
