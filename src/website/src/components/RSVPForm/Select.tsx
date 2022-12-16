import React, { FC } from 'react';
import styles from './Select.module.sass';

type Props = {
  name: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  options: Array<string>
}

const Select: FC<Props> = ({ name, onChange, options }) => (
  <div className={styles.container}>
    {options.map((o, i) => (
      <React.Fragment key={`select-${i}`}>
        <input type="radio" name={name} id={`${name}-${i}`} value={o} onChange={onChange} />
        <label htmlFor={`${name}-${i}`} className={styles.option}>
          <div className={styles.dot} />
          <span>{o}</span>
        </label>
      </React.Fragment>
    ))}
  </div>
)

export default Select
