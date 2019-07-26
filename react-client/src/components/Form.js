import React, { useState } from 'react';
import axios from 'axios';

export default function Form(props) {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });
  const onChange = (event) => {
    const info = event.target;
    if(info.name === 'username') {
      setUser(prevState => ({
        ...prevState,
        username: info.value
      }));
    } else {
      setUser(prevState => ({
        ...prevState,
        password: info.value
      }));
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if(user.username.trim() && user.password.trim()) {
      if(props.type === 'register') {
        axios.post(`http://localhost:3300/api/register`, user)
          .then(res => {
            console.log(res.data);
          })
          .catch(err => {
            console.log(err.message);
          });
        } else {
          axios.post(`http://localhost:3300/api/login`, user)
            .then(res => {
              console.log(res.data);
              localStorage.setItem('token', res.data.token);
            })
            .catch(err => {
              console.log(err);
            });
      }
    }
  }

  return(
    <form onSubmit={onSubmit}>
      <input onChange={onChange} value={user.username} type='text' name='username' />
      <input onChange={onChange} value={user.password} type='password' name='password' />
      <button type='submit'>Submit</button>
    </form>
  );
}