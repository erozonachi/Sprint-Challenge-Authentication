import styled from 'styled-components';

export const JokesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  > h2 {
    margin: 10px 0;
  }
  > ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px 0;
    list-style-type: none;

    > li {
      outline: none;
      padding: 10px;
      border-bottom: 1px solid blueviolet;
      color: blueviolet;
      width: 95%;
      margin: 5px 2.5%;
      list-style-type: none;
    }
  }
`;
