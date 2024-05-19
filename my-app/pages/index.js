import Head from "next/head";
import { useState, useRef } from "react";
import styles from '../styles/Home.module.css'
import { useRouter } from "next/router";


export default function Home() {
  const router = useRouter();

  const [{ street, city, state, addressEntered}, setForm,] = useState({
    street: "",
    city: "",
    state: "",
    addressEntered: false,
  })

  function handleChange(e) {
    setForm({
      street,
      city,
      state,
      ...{ [e.target.name]: e.target.value },
    });
  }

  function clearAddress(e) {
    setForm({
      street: "",
      city: "",
      state: "" ,
    });
    return router.push("/");
  }

  function handleSubmit(e) {
    e.preventDefault();
    setForm({
      street,
      city,
      state,
      ...{ [e.target.name]: e.target.value },
      addressEntered: true,
    }); 

    return router.push("/");
    
  }

  return (
    <>
      <Head>
        <title>Map Builder</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <div className={styles.container}>

         <form 
            onSubmit={handleSubmit}
            className={styles.form}
          >
            <label htmlFor="street" className={styles.label}>Street Address</label>
            <input
              type="text"
              name="street"
              id="street"
              value={street}
              onChange={handleChange}
              className={styles.inputField}
            />
            <label htmlFor="city" className={styles.label}>Cityr</label>
            <input
              type="text"
              name="city"
              id="city"
              value={city}
              onChange={handleChange}
              className={styles.inputField}
            />
            <label htmlFor="state" className={styles.label}>State</label>
            <input
              type="text"
              name="state"
              id="state"
              value={state}
              onChange={handleChange}
              className={styles.inputField}
            />
            <button>Submit</button>
          </form> 
            


          {addressEntered?
              
           <div className={styles.mapContainer}>

            <button onClick={clearAddress}> Clear Map</button>
            
            <p>{street}</p>
            <p>{city}, {state}</p>
            

            <LocationMap
              street={street}
              city={city} 
              state={state}>
            </LocationMap>

           </div> 
          : <p>Enter Address to see it on the map!</p>
          }
        
        </div>
      </main>
    </>
  );
}

function LocationMap({street, city, state}){

  console.log("Street Variable:", street)
  console.log("city Variable:", city)
  console.log("state Variable:", state)

  return(


    <iframe
      width="300"
      height="300"
      loading="lazy"
      allowfullscreen
      referrerpolicy="no-referrer-when-downgrade"
      src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_API_KEY}&q=${street}+${city}+${state}`}>
    </iframe>
  )

}