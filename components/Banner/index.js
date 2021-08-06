import React, { useState } from 'react';
import Image from 'next/image';
import { Carousel } from "react-bootstrap";

import styles from './banner.module.css';

export function Banner({
    slidesSources,
}) {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel
            className={styles.container}
            activeIndex={index}
            onSelect={handleSelect}
            indicators={true}
            controls={true}
            interval={10000}
            slide={true}
        >
            {
                slidesSources?.map((src) => {
                    return (
                        <Carousel.Item
                            key={src}
                        >
                            <Image
                                src={src}
                                layout='fill'
                                style={{
                                    height: 100,
                                    width: 100,
                                }}
                            />
                        </Carousel.Item>
                    );
                })
            }
        </Carousel>
    );
}