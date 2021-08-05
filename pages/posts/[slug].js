import React, { useState, useEffect } from 'react';
import Prismic from '@prismicio/client';
import { FiCalendar } from 'react-icons/fi';
import { RichText } from 'prismic-dom';

import { getPrismicClient } from '../../services/prismic';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import styles from './post.module.css';

export default function Post({ post }) {
  const [lang, setLang] = useState('eng');

  const [formattedPost, setFormattedPost] = useState({
    ...post,
    createdAt: post?.createdAt ? format(
      new Date(post?.createdAt),
      'dd MMM yyyy',
      {
        locale: ptBR,
      }
    ) : null,
  })

  React.useEffect(() => {
    const language = localStorage.getItem('@MyTrip:lang');
    if (language) {
      setLang(language);
    }
  }, []);

  return (
    formattedPost ? (
      <div className={styles.container}>
        <h1
          style={{
            fontSize: '1.8rem',
            margin: '0 auto',
            fontFamily: 'Open Sans, sans-serif',
            color: '#A9AFB2'
          }}
        >
          {formattedPost?.data?.title[lang]}
        </h1>
        <div
          style={{
            marginTop: '1rem',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <FiCalendar
            size={20}
            color='#A9AFB2'
          />
          <p style={{ marginLeft: 8 }}>{formattedPost.createdAt}</p>
        </div>
        <div dangerouslySetInnerHTML={{ __html: formattedPost?.data?.content[lang] }} />
      </div>
    ) : (
      <div
        className={styles.contentContainer}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p>POST NÃO ENCONTRADO</p>
      </div>
    )
  );
}

export const getStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query([Prismic.Predicates.at('document.type', 'post')]);

  const paths = posts?.results?.map((post) => {
    return {
      params: {
        slug: post.id,
      }
    }
  });

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps = async ({ params }) => {
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('post', params.slug, { ref: null });

  const post = {
    uid: response?.uid ? response.uid : null,
    createdAt: response?.first_publication_date ? response?.first_publication_date : null,
    data: {
      title: {
        'eng': response?.data?.eng_title ? RichText.asText(response?.data?.eng_title) : null,
        'esp': response?.data?.esp_title ? RichText.asText(response?.data?.esp_title) : null,
      },
      content: {
        'eng': response?.data?.eng_content ? RichText.asHtml(response?.data?.eng_content) : null,
        'esp': response?.data?.esp_content ? RichText.asHtml(response?.data?.esp_content) : null,
      }
    },
  }

  return {
    props: {
      post: post ? post : null,
    }
  }
}