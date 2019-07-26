import styled from 'styled-components';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  > h2 {
    margin: 10px 0;
  }
  > a {
    text-decoration: none;
  }
  > form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px 0;

    > input {
      outline: none;
      padding: 5px;
      border: 1px solid blueviolet;
      color: blueviolet;
      border-radius: 10px;
      width: 95%;
      margin: 5px 2.5%;
    }
    > button {
      outline: none;
      padding: 5px;
      border: none;
      background-color: blueviolet;
      color: white;
      border-radius: 10px;
      width: 95%;
      margin: 5px 2.5%;
    }
  }
`;
