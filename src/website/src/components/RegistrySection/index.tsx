import React, { FC } from 'react';
import { Parallax } from 'react-scroll-parallax';
import { ReactComponent as Paypal } from './paypal.svg';
import { ReactComponent as Zelle } from './zelle.svg';
import { ReactComponent as Venmo } from './venmo.svg';
import styles from './RegistrySection.module.sass';
import pic from './field.jpeg';

const RegistrySection: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Parallax speed={3}>
          <img src={pic} alt="field" />
        </Parallax>
        <Parallax className={styles.title} speed={-1}>
          <div>registry</div>
        </Parallax>
      </div>
      <div className={styles.content}>
        <h2>the most important thing to us is that you are able to celebrate with us. however, if you wish to give a gift, we will gratefully accept a small contribution towards our honeymoon.</h2>

        <h3>we have a handful of options to contribute virtually, but will gladly accept anything physical as well.</h3>
        <div style={{ display: "flex", gap: "1rem" }}>
          <a className={styles.button} href="https://www.venmo.com/u/corleygoldberg" rel="noreferrer" target="_blank"><Venmo />venmo</a>
          <a className={styles.button} href="http://paypal.me/corleyj" rel="noreferrer" target="_blank"><Paypal />paypal</a>
          <a className={styles.button} href="https://example.com" rel="noreferrer" target="_blank"><Zelle />zelle</a>
        </div>
      </div>
    </div>
  )
}

export default RegistrySection
