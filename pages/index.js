import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FiCalendar } from 'react-icons/fi';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { getPrismicClient } from '../services/prismic';

import styles from './home.module.css';

export default function Home({ posts }) {
  const [lang, setLang] = useState('eng');

  const formattedPosts = posts.map((item) => {
    return {
      ...item,
      createdAt: format(
        new Date(item.createdAt),
        'dd MMM yyyy',
        {
          locale: ptBR,
        }
      )
    }
  });

  React.useEffect(() => {
    const language = localStorage.getItem('@MyTrip:lang');
    if (language) {
      setLang(language);
    }
  }, []);

  return (
    <div
      className={styles.container}
    >
      <Head>
        <title>MyTrip Blog</title>
      </Head>
      <div className={styles.contentContainer}>
        {
          formattedPosts.map((item) => {
            return (
              <Link href={`/posts/${item.id}`} key={item.id}>
                <a
                  className={styles.postContainer}
                >
                  <h1 className={styles.title}>{item.title[lang]}</h1>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <FiCalendar size={15} color="#A9AFB2" />
                    <p className={styles.infoText}>
                      {item.createdAt}
                    </p>
                  </div>
                </a>
              </Link>
            );
          })
        }
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
  );

  const posts = postsResponse.results.map((item) => {
    return {
      id: item.uid,
      title: {
        'esp': RichText.asText(item.data.esp_title),
        'eng': RichText.asText(item.data.eng_title),
      },
      createdAt: item.first_publication_date,
    }
  });

  return {
    props: {
      posts,
    }
  }
}