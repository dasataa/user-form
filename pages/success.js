import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';

export default function Success(props) {
  const router = useRouter();

  const onClick = () => {
    router.back({ pathname: '/' });
  };
  return (
    <div className={styles.Form}>
      <Head>
        <title>Success</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.form}>
        <h1 className={styles.h1}>Success</h1>
        <h4>Form Submited Successfully</h4>
        <p>check console.log to see if the data went through, it kept giving me the 500 error</p>

        <button className={styles.button} onClick={onClick}>
          Go back
        </button>
      </main>
    </div>
  );
}
