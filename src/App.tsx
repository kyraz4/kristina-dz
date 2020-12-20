
import './App.css';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { RootStore } from './store/rootStore/rootStore';
import React from 'react';


export const AppContainer = styled.div`
      
      width: 100%;
      height: 100%;
      background-color: #121212;
      display: flex;
      flex-direction: column;
      justify-content: center;

`;


export interface props {
    rootStore?: RootStore
}


const App: React.FC<props> = inject('rootStore')( observer(({ rootStore }) => {

  return <AppContainer>
      <h1>   Приложение менеджера ресторана </h1>
  </AppContainer>


}));

export default App;
