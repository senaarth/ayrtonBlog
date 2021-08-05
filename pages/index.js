import Head from 'next/head';
import Link from 'next/link';
import { FiUser, FiCalendar } from 'react-icons/fi';

import styles from './home.module.css';

export default function Home() {
  return (
    <div
      className={styles.container}
    >
      <Head>
        <title>MyTrip Blog</title>
      </Head>
      <div className={styles.contentContainer}>
        <Link href={`/post/id`}>
          <a
            className={styles.postContainer}
          >
            <h1 className={styles.title}>Título do Post</h1>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <FiCalendar size={15} color="#A9AFB2" />
              <p className={styles.infoText}>
                23 Jul 2021
              </p>
            </div>
          </a>
        </Link>
      </div>
    </div>
  )
}
