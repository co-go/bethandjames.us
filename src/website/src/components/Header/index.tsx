import React, { Children, FC, ReactNode } from 'react';
import styles from './Header.module.sass';

type HeaderProps = {
  children: any
}

export const Header: FC<HeaderProps> = ({ children }) => {
  const arrayChildren = Children.toArray(children);
  const childrenWithDividers: Array<ReactNode> = [];

  Children.forEach(arrayChildren, (child, index) => {
    childrenWithDividers.push(child);

    const isLast = index === arrayChildren.length - 1;
    if (!isLast) {
      childrenWithDividers.push(<Divider />)
    }
  });

  return (
    <div className={styles.header}>
      {childrenWithDividers}
    </div>
  )
}

const Divider: FC = () => <hr className={styles.divider} />

type ItemProps = {
  name: string
  active?: boolean
}

export const Item: FC<ItemProps> = ({ name, active = false }) => {
  return (<div className={styles.item}>{name}</div>)
}
