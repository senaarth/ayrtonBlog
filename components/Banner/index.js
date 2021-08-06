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
                slidesSources?.forEach((src) => {
                    return (
                        <Carousel.Item>
                            <Image
                                src={src}
                                layout='fill'
                                className='d-block w-100'
                            />
                        </Carousel.Item>
                    );
                })
            }
        </Carousel>
    );
}