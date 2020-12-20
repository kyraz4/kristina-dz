import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { RootStore } from '../store/rootStore/rootStore';
import { cookersInterface } from '../api/api';
import Dish from './Dish';

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
    cooker: cookersInterface,

}

export const CookerContainer = styled.div`

margin: 10px;
width: 400px;
display: flex;
flex-direction: column;
height: auto;
background-color: green;
justify-content: center;
align-items: center;
border-radius: 10px;
min-width: 320px;
min-height:490px;

`;


const Cooker: React.FC<CookerProps> = inject('rootStore')( observer(({ rootStore, cooker }) => {

  return (  <CookerContainer>
          <p>
           id: { cooker.id }</p>
          <p>
        название повара  { cooker.name}
          </p>
         <p>Блюда:  
            </p>
            <div>  
            {  cooker.cookItems.map(el => {
              return <Dish parentId = {cooker.id}  dish = {el} />
            }) } 
             </div>
      </ CookerContainer>)



}));

export default Cooker; 
