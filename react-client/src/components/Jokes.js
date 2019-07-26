import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { JokesContainer } from './styled-components/JokesContainer';

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
    <JokesContainer>
      <h2>Jokes</h2>
      { jokes.list? 
          <ul>{
            jokes.list.map(item => <li key={item.id}>{item.joke}</li>)
          }</ul> :
          <strong>Fetching Jokes...</strong>
      }
    </JokesContainer>
  );
}