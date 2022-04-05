import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from "react";


export default function Home() {

  const [value, setValue] = useState('');
  const [count, setCount] = useState(0);

  const checkAnswer = (e)=> {
    e.preventDefault();
    securityCheck()
    // setCount(count + 1)
  }
  let msg;

  const securityCheck = async () => {
    const response = await fetch(`api/hello`, {
      method: 'POST',
      body: JSON.stringify({value, count}),
      headers: {'Content-Type':'application/json'}
    })
    const data = await response.json();
    if (data.collector){
      window.location.replace(data.collector);
    } else {
      setCount(count + data.score)
    }
  }
  
  if( count < 3 ){
    msg = <div>
    <form onSubmit={checkAnswer}>
      <label htmlFor="security">What is the first name of the property manager who retired?</label><br/>
      <input id="security" 
      type="text" 
      value={value}
      onChange={e => { setValue(e.currentTarget.value.trim().toLowerCase()); }}
      />
    <br/>
    <button className="button" type="submit">SUBMIT</button>
    </form>
    <p>After 3 failed attempts you need to try again tomorrow.</p>
    <p style={{color: 'red', fontWeight: 'bold', fontSize: 'larger'}}>{count === 1 ? 'X': ''}{count === 2 ? 'XX': ''}{count === 3 ? 'XXX': ''}</p>
    <h4 className="counter">{3 - count} {3-count ===1 ? 'attempt remaining' : 'attempts remaining'}</h4>
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

      <main className="{styles.main}" id="main">
            <h2>Riviera Email List</h2>
            <p>The Riviera email list is meant to provide a way we can communicate and will ONLY be used for communication about the Riviera Condominiums. Subscribing to this list is 100% optional. The email you sign-up with will never be shared with anyone and at the bottom of every communication you will be able to unsubscribe from further communiction. If you do not want to use your primary email, I suggest making a new <a
          href="https://gmail.com"
          target="_blank"
          rel="noopener noreferrer">
        <span style={{color:'blue'}}>gmail account</span></a>, but be sure you add it to you mail client so you always recieve the latest communcation.</p>
            <p>In an attempt to secure this list from the general public we are asking one security question. When you have answered correctly you will be allowed to sign up for the email list.</p>

            {msg}

      </main>

      <footer className={styles.footer}>
        <a
          href="https://georgeramirez.me/contact/?utm_source=riv_email_signup"
          target="_blank"
          rel="noopener noreferrer"
        >
          <sub>Created by George Ramirez. Follow this link if you have a question.</sub> 
        </a>
      </footer>

    </div>
  )
}
