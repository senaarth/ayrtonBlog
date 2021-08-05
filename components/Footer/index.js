import React from 'react';

import styles from './footer.module.css';

export function Footer() {

    async function changeLanguage(lang) {
        await localStorage.setItem('@MyTrip:lang', lang);
    }

    return (
        <div className={styles.footerContainer}>
            <div className={styles.contentContainer}>
                <p
                    onClick={() => changeLanguage('eng')}
                    className={styles.text}
                >
                    ENG
                </p>
                <p
                    style={{
                        color: '#B9B16B',
                        fontFamily: 'Open Sans, sans-serif',
                        marginLeft: 16,
                    }}
                >
                    |
                </p>
                <p
                    onClick={() => changeLanguage('esp')}
                    className={styles.text}
                    style={{
                        marginLeft: 16
                    }}
                >
                    ESP
                </p>
            </div>
        </div>
    );
}