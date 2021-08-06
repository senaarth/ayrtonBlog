import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './header.module.css';

export function Header() {
    return (
        <div className={styles.container} style={{ height: 120 }}>
            <div className={styles.contentContainer} style={{ height: 120 }}>
                <Link href='/'>
                    <Image 
                        className={styles.logo} 
                        src='/images/traveler.png' 
                        width={70}
                        height={80}
                    />
                </Link>
            </div>
        </div>
    )
}