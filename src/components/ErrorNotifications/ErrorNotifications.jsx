import { memo } from 'react'
import styles from './ErrorNotifications.module.scss'

export const ErrorNotifications = memo(({ error }) => {
  console.error(error)
  return (
    <div className={styles.wrapper}>
      <h1>{error}</h1>
    </div>
  )
})

ErrorNotifications.displayName = 'ErrorNotifications'
