import React from 'react';
import Link from 'next/link';

import styles from './header.module.css';

export function Header() {
    return (
        <div className={styles.container}>
            <div className={styles.contentContainer}>
                <Link href='/'>
                    <img className={styles.logo} src='./images/logo.png' />
                </Link>
            </div>
        </div>
    )
}