import React, { Children, FC, ReactNode, useEffect, useRef, useState } from 'react';
import styles from './Header.module.sass';
import { useLottie } from "lottie-react";
import cx from "classnames";
import menu from "./menu-animated.json"

type HeaderProps = {
  active: Number,
  sections: Array<{
    ref: React.RefObject<HTMLDivElement>;
    bgClass: string;
    label: string;
  }>
}

export const Header: FC<HeaderProps> = ({ active, sections }) => {
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
        {sections.map((section, i) => {
          const item = <Item
            key={`item-${i}`}
            name={section.label}
            active={active === i+1}
            onClick={() => {
              closeMenu()
              section.ref.current!.scrollIntoView({behavior: "smooth"})}
            }
          />

          return <React.Fragment key={`item-${i}`}>
            {item}
            {(i !== sections.length - 1) && <Divider key={`div-${i}`} />}
          </React.Fragment>
        })}
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
  [x:string]: any
}

export const Item: FC<ItemProps> = ({ name, active = false, ...rest }) => {
  return (<div className={cx(styles.item, active && styles.active)} {...rest}>{name}</div>)
}
