import React, { FC } from 'react';
import { Parallax } from 'react-scroll-parallax';
import { ReactComponent as Paypal } from './paypal.svg';
import { ReactComponent as Zelle } from './zelle.svg';
import { ReactComponent as Venmo } from './venmo.svg';
import styles from './RegistrySection.module.sass';
import pic from './field.jpeg';
import home from './home.jpeg';
import honeymoon from './honeymoon.jpeg';
import night from './night.jpeg';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    border: 'none',
    borderRadius: "2rem",
    backgroundColor: "#98522D",
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    zIndex: 10,
  }
};

const RegistrySection: FC = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [blurb, setBlurb] = React.useState("");

  return (
    <div className={styles.container}>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
        closeTimeoutMS={300}
      >
        <h3 className={styles.closeText} onClick={() => setIsOpen(false)}>close</h3>
        <h1 className={styles.bigTitle}>{title}</h1>
        <p className={styles.blurb}>{blurb}</p>

        <a className={styles.linkWrapper} href="https://www.venmo.com/u/corleygoldberg" rel="noreferrer" target="_blank">
          <div className={styles.payRow}>
            <Venmo />
            <h2>venmo</h2>
            <span className={styles.payLink}>@corleygoldberg</span>
          </div>
        </a>
        <a className={styles.linkWrapper} href="https://paypal.me/corleyj" rel="noreferrer" target="_blank">
          <div className={styles.payRow}>
          <Paypal />
          <h2>paypal</h2>
          <span className={styles.payLink}>@corleyj</span>
          <i>(send via friends and family)</i>
          </div>
        </a>
        <a className={styles.linkWrapper} href="https://www.zellepay.com/get-started" rel="noreferrer" target="_blank">
          <div className={styles.payRow}>
          <Zelle />
          <h2>zelle</h2>
          <span className={styles.payLink}>4102927077</span>
          </div>
        </a>
      </Modal>
      <div className={styles.imgContainer}>
        <Parallax speed={3}>
          <img src={pic} alt="field" />
        </Parallax>
        <Parallax className={styles.title} speed={-1}>
          <div>registry</div>
        </Parallax>
      </div>
      <div className={styles.content}>
        <h2>the most important thing to us is that you are able to celebrate with us. however, if you wish to give a gift, we will gratefully accept any contribution towards one of our funds!</h2>

        <h3>we have a handful of options to contribute virtually, but will gladly accept anything physical as well.</h3>
        <div className={styles.funds}>
          <div
            className={styles.fund}
            onClick={() => {
              setTitle("help us towards our first home!")
              setBlurb("(with a large backyard for the pups)")
              setIsOpen(true)
            }}
          >
            <img src={home} alt="home" />
            <h1 className={styles.fundName}>First Home Fund</h1>
          </div>
          <div
            className={styles.fund}
            onClick={() => {
              setTitle("help us pay for a vacation!")
              setBlurb("send us your favorite places that we should visit")
              setIsOpen(true)
            }}
          >
            <img src={honeymoon} alt="honeymoon" />
            <h1 className={styles.fundName}>Honeymoon Fund</h1>
          </div>
          <div
            className={styles.fund}
            onClick={() => {
              setTitle("contribute to future date nights!")
              setBlurb("send us fun ideas that we should try out")
              setIsOpen(true)
            }}
          >
            <img src={night} alt="night" />
            <h1 className={styles.fundName}>Date Night Fund</h1>
          </div>
        </div>
        <div>
        </div>
      </div>
    </div>
  )
}

export default RegistrySection
