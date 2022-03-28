import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from "react";


export default function Home() {

  const [value, setValue] = useState('');
  const [mail, setMail] = useState('<sub></sub>');
  const [count, setCount] = useState(0);

  const checkAnswer = (e)=> {
    e.preventDefault();
    setCount(count + 1)
    securityCheck()
  }
  let msg;
  let toggle = false;

  const securityCheck = async () => {
    const response = await fetch(`api/hello`, {
      method: 'POST',
      body: JSON.stringify({value, count}),
      headers: {'Content-Type':'application/json'}
    })
    const data = await response.json();
    setMail(data.collector)
  }
  
  if( count < 4 ){
    msg = <div>
    <form onSubmit={checkAnswer}>
      <label htmlFor="security">What is the first name of the property manager who just retired?</label><br/>
      <input id="security" 
      type="text" 
      value={value}
      onChange={e => { setValue(e.currentTarget.value); }}
      />

    <button className="button" type="submit">SUBMIT</button>
    </form>
    <sub>After 3 failed attempts you need to try again tomorrow.</sub><br/>
    {count} attempts
  </div>
  } else {
    msg = <div>Sorry too many incorrect attempts. Try again tomorrow. </div>
  }

  return (

    <div className={styles.container}>
      <Head>
        <title>Riviera Email Sign-Up</title>
        <meta name="description" content="Riviera Email Sign-Up" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="{styles.main}">
            <h1>The Riviera Email Sign-up</h1>
            <p>Before we get started, this is a private list that will ONLY be used for communication about the Riviera Condominiums. The email you sign-up with will never be shared with anyone and at the bottom of every communication you will be able to unsubscribe from further communiction. If you don't want to use your primary email, I suggest making a new at GMAIL, but be sure you add it to you mail client so you always recieve the latest communcation.</p>
            <p>In an attempt to secure this list from the general public we are asking one security question. When it's anserwed correctly you will be allowed to sign up for the email list.</p>

            {msg}

         <div dangerouslySetInnerHTML={{__html: mail}} />

      </main>

      {/* <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main> */}

      <footer className={styles.footer}>
        <a
          href="https://georgeramirez.me/contact/?utm_source=riv_email_signup"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by George Ramirez. Follow this link if you have a question. 
        </a>
      </footer>
    </div>
  )
}
