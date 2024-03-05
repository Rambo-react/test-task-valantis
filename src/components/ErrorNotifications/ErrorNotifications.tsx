import { memo } from 'react'
import styles from './ErrorNotifications.module.scss'

interface Props {
  error: any
}

export const ErrorNotifications = memo(({ error }: Props) => {
  console.error(error)
  return (
    <div className={styles.wrapper}>
      <h1>{error}</h1>
    </div>
  )
})

ErrorNotifications.displayName = 'ErrorNotifications'
