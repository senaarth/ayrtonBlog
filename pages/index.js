import Head from 'next/head';

export default function Home() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <Head>
        <title>Blog do Ayrton</title>
      </Head>
      <h1>BLOG DO AYRTON</h1>
    </div>
  )
}
