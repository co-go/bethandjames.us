import React, { FC } from 'react';
import { Parallax } from 'react-scroll-parallax';
import styles from './GallerySection.module.sass';
import pic from './dancin.jpeg';

const GallerySection: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Parallax speed={3}>
          <img src={pic} alt="dancin" />
        </Parallax>
        <Parallax className={styles.title} speed={-1}>
          <div>Pictures</div>
        </Parallax>
      </div>
      <div className={styles.content}>
        <h1>thanks for partying with us!</h1>
        <p>click the button below to check out the pictures from the day!</p>
        <a className={styles.rsvpButton} href="https://barbaraophotography.pic-time.com/FDLXFskKmVWXZ" target="_blank" rel="noreferrer">📸 view pictures</a>
      </div>
    </div>
  )
}

export default GallerySection;
