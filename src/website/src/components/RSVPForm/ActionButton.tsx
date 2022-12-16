import React, { FC, useState } from 'react';
import styles from './ActionButton.module.sass';
import cx from "classnames";
import { ReactComponent as Arrow } from "./arrow-right-solid.svg"
import { ReactComponent as Check } from "./check-solid.svg"
import { useLottie } from "lottie-react";
import loading from "./loading.json"

interface Props {
  type: "next" | "back" | "submit" | "link" | "text"
  text?: string
  href?: string
  disabled?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<any>
}

const ActionButton: FC<Props> = ({ type, text, href, disabled, onClick }) => {
  const [isLoading, setLoading] = useState(false)
  const { View } = useLottie({
    animationData: loading,
    loop: true,
    autoplay: true,
  }, { height: "3rem", display: isLoading ? 'block' : 'none' });

  if (type === "link") {
    return <a className={styles.button} href={href} rel="noreferrer" target="_blank">{text}</a>
  }

  return (
    <button
      className={cx(styles.button, isLoading && styles.loading)}
      disabled={isLoading || disabled}
      onClick={async (e) => {
        setLoading(true)
        if (onClick) {
          await onClick(e);
        }
        setLoading(false)
      }}
    >
      {!isLoading && type === "back" && <Arrow className={styles.backIcon} />}
      {View}
      {!isLoading && (text || type)}
      {!isLoading && type === "next" && <Arrow className={styles.nextIcon} />}
      {!isLoading && type === "submit" && <Check className={styles.submitIcon} />}
    </button>
  )
}

export default ActionButton
