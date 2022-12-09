import React, { Children, FC, ReactNode, useEffect, useRef, useState } from 'react';
import styles from './Header.module.sass';
import { useLottie } from "lottie-react";
import cx from "classnames";
import menu from "./menu-animated.json"

type HeaderProps = {
  active: Number
}

export const Header: FC<HeaderProps> = ({ active }) => {
  const [isOpen, setOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  const { View, playSegments } = useLottie({
    animationData: menu,
    loop: false,
    autoplay: false,
  });

  const closeMenu = () => {
    setOpen(false);
    playSegments([17, 28], true)
  }

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 32);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setSticky]);

  return (
    <>
      <div className={cx(styles.header, isOpen && styles.open, sticky && styles.sticky )}>
        <Item name='rsvp' />
        <Divider />
        <Item name='timeline' active={active === 1} />
        <Divider />
        <Item name='travel' active={active === 2} />
        <Divider />
        <Item name='faq' active={active === 3} />
        <Divider />
        <Item name='registry' active={active === 4} />
      </div>
      <div className={styles.menu_button} onClick={() => {
        setOpen(!isOpen)
        playSegments(!isOpen ? [0, 16] : [17, 28], true)
      }}>
        {View}
      </div>
    </>
  )
}

const Divider: FC = () => <hr className={styles.divider} />

type ItemProps = {
  name: string
  active?: boolean
}

export const Item: FC<ItemProps> = ({ name, active = false }) => {
  return (<div className={cx(styles.item, active && styles.active)}>{name}</div>)
}
