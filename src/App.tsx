
import './App.css';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { RootStore } from './store/rootStore/rootStore';
import React, { useEffect } from 'react';
import { cookersInterface } from './api/api';


export const AppContainer = styled.div`
      
      width: 100%;
      height: 100%;
      background-color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;

`;



export interface props {
    rootStore?: RootStore,

}


const App: React.FC<props> = inject('rootStore')( observer(({ rootStore }) => {


  const { getAllCookers, allCookersObj } = rootStore!.cookingStore;


  useEffect(() => {
       getAllCookers();
  }, []);


  return (<AppContainer>
      <h1>   Приложение менеджера ресторана </h1>


       {
       allCookersObj && allCookersObj.map(el => {
       return <p>{ el.name }</p>
       })
       }

  </AppContainer>)



}));

export default App;
