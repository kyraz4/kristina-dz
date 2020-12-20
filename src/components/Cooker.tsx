import './App.css';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { RootStore } from '../store/rootStore/rootStore';
import { cookersInterface } from '../api/api';


export const AppContainer = styled.div`
      
      width: 100%;
      height: 100%;
      background-color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
`;

export interface CookerProps {
    rootStore?: RootStore,
    cooker: cookersInterface
}

export const CookerContainer = styled.div`

margin: 10rem;

`;


const Cooker: React.FC<CookerProps> = inject('rootStore')( observer(({ rootStore, cooker }) => {



  return (  <p>{ 'okdcopsk' }</p>)



}));

export default Cooker; 
