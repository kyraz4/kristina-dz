import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { RootStore } from '../store/rootStore/rootStore';
import { cookersInterface } from '../api/api';
import { cookItem } from './../api/api';


export interface DishProps {
    rootStore?: RootStore,
    dish: cookItem,
    parentId: number
}


export const DishContainer = styled.div`

background-color: lightblue;
display: flex;
width: 300px;
height: auto;
margin:10px;
border-radius: 5px;
flex-direction: column;

p {
    min-width: 100px;
}

button{
    width: 100px;
    background-color: red;
    height: 35px;

    border-radius: 5px;
}

`;

const Dish: React.FC<DishProps> = inject('rootStore')(observer(({ rootStore, dish , parentId}) => {

     const { deleteDish } = rootStore!.cookingStore;

    return (< DishContainer>
      <button  onClick = {() => {
          console.log('click');
          deleteDish( parentId, dish.id );
      }} 
       > Удалить блюдо </button>
        <p>
            -id блюда: {dish.id}</p>
        <p>
            - название блюда:  "{dish.name}"
        </p>
    </ DishContainer>)



}));


export default Dish;