import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './header.module.css';

export function Header() {
    return (
        <div className={styles.container}>
            <div className={styles.contentContainer}>
                <Link href='/'>
                    <Image 
                        className={styles.logo} 
                        src='/images/logo.png' 
                        width={120}
                        height={120}
                    />
                </Link>
            </div>
        </div>
    )
}