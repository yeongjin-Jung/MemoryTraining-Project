import React, { Component } from 'react';
import styled from "styled-components";
import './App.css';

class App extends Component {
  render() {
    return (
      <AppContainer>
          <HeaderContainer><h1>China</h1></HeaderContainer>
            <ListWrapper>
              <ul>
                <ol>The Flight</ol>
                <ol>The City</ol>
                <ol>The Island</ol>
                <ol>The Food</ol>
              </ul>
            </ListWrapper>
          <Main>
            <h1>The City</h1>
            <p>china is the capital of China region on the island of Create. The city can be
                  divided in two parts, the old town and the mordern city.<br></br><br></br>
                  Resize the browser window to see how the content respond to the resizing.
              </p>
          </Main>
          <Aside>
            <h1>what</h1>
            <p>안녕하세요 반갑습니다.</p>
          </Aside>
      </AppContainer>
    );
  }
}

const AppContainer = styled.div`
&,
& * {
  box-sizing: border-box;
}
`;

// Header 컴포넌트
const HeaderContainer = styled.header`
  padding: 1rem;
  border: 1px solid red;
`;

// Menu 컴포넌트
const ListWrapper = styled.div`
  width: 25%;
  float: left;
  padding: 15px;
  border: 1px solid red;
`;


// Main 컴포넌트
const Main = styled.div`
  width: 75%;
  float: left;
  padding: 15px;
  border: 1px solid red;
`;


// Aside 컴포넌트
const Aside = styled.div`
  width: 100%;
  float: left;
  padding: 15px;
  border: 1px solid red;
`;



export default App;