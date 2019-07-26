import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Form(props) {
  const [jokes, setJokes] = useState({
    list: null
  });

  useEffect(() => {
    const enrichedAxios = axios.create({
      headers: {
        Authorization: localStorage.getItem('token')
      }
    });

    enrichedAxios.get(`http://localhost:3300/api/jokes`)
      .then(res => {
        console.log(res.data);
        setJokes(prevJokes => ({
          ...prevJokes,
          list: res.data
        }));
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);

  return(
    <div>
      { jokes.list? 
          <ul>{
            jokes.list.map(item => <li key={item.id}>{item.joke}</li>)
          }</ul> :
          <strong>Fetching Jokes...</strong>
      }
    </div>
  );
}