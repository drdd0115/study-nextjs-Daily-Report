import Link from 'next/link'
import React from 'react'
import styles from './Nav.module.css'

export default function Nav() {
  return (
    <div className={styles.nav}>
      <Link className={styles.navLink} href="/">Home</Link>
      <Link className={styles.navLink} href="/history">History</Link>
    </div>
  )
}
