import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { RootStore } from './store/rootStore/rootStore';
import React, { useEffect } from 'react';
import { cookersInterface } from './api/api';
import Cooker from './components/Cooker';

export const AppContainer = styled.div`
      
      width: 100%;
      height: 100%;
      background-color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;



      input {
        width: 150px;
        height: 40px;
        margin:20px;
      }

      button {
        cursor: pointer;
        width: 150px;
        height: 80px;
        margin:20px;

      }

`;



export interface props {
  rootStore?: RootStore,

}


export const CookersContainer = styled.div`

      display: flex;
      justify-content: space-evenly;

width: auto;
max-width: 100%;
flex-wrap: wrap;
      height: auto;
margin: 30px;
max-height:800px;
overflow-y: auto;
`;



const CookerHeaderContaner = styled.div`

display: flex;
justify-content: space-between;
max-width: 30%;

`;


const App: React.FC<props> = inject('rootStore')(observer(({ rootStore }) => {


  const { getAllCookers, allCookersObj, setCurrentText, currentText, addNewCooker,
     setChoosenChangeDishCooker, choosenChangeDishCooker, setChoosenChangeDish, choosenChangeDish, changeCookerDish } = rootStore!.cookingStore;


  useEffect(() => {
    getAllCookers();
  }, []);

  useEffect(() => {
    
  }, [choosenChangeDish, choosenChangeDishCooker]);


  return (<AppContainer>
    <h1>   Приложение менеджера ресторана </h1>


   <CookerHeaderContaner>


   <div>
      <button onClick={() => {
        addNewCooker();
      }} > Добавить повара </button>
      <input type='text' value={currentText} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentText(event);
      }} />
    </div>


    <div>
    <p> Поменять местами блюда </p>
       
      <form>
       
        <select defaultChecked = {false} onChange = {setChoosenChangeDishCooker} >
        <option selected disabled>Выберите повара</option>
          {allCookersObj.map(el => {
            return <option > {el.name} </option>
          })}
        </select>
     
      </form>
      {
          choosenChangeDishCooker !== null &&  <select onChange = {setChoosenChangeDish}  >
                <option selected disabled>Выберите блюдо</option>
          {choosenChangeDishCooker.cookItems.map(el => {
            return <option > {el.name} </option>
          })}
        </select>
        }
        {
          choosenChangeDish !== null &&  <div>
            <p>  Направить повару </p>
            <select onChange = {changeCookerDish} >
            <option selected disabled>Выберите повара</option>
          {allCookersObj.map(el => {

            return el.id !== choosenChangeDishCooker?.id &&  <option  > {el.name} </option> 
          })}
        </select></div>
        }
    </div>



   </CookerHeaderContaner>

 




    <CookersContainer >

      {
        allCookersObj && allCookersObj.map(el => {
          return < Cooker cooker={el} />
        })
      }
    </CookersContainer>


  </AppContainer>)



}));

export default App;
