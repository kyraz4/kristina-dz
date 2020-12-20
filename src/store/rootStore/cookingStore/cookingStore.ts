import { RootStore } from "../rootStore";
import { observable, action, makeAutoObservable, makeObservable } from 'mobx';
import { cookersInterface, cookingApi } from '../../../api/api';


export class CookingStore {

    constructor(rootStore: RootStore) {

        makeAutoObservable(this, {
            rootStore: observable,
            currentText: observable,
            allCookersObj: observable,

        });

        this.rootStore = rootStore;

    }





    currentText:string = ''; 

    rootStore: RootStore;

    allCookersObj: cookersInterface[] = [];


    setCurrentText = ( event: React.ChangeEvent<HTMLInputElement> ) => {
      this.currentText = event.currentTarget.value;
    }



    addNewCooker = () => {

        this.allCookersObj.push({
            id: 3,
       name: this.currentText,
        cookItems: []
        });

        this.refreshJson();

    }



    setCookersState = ( newCookers:cookersInterface[] ) => {
       this.allCookersObj = newCookers
    }

    getAllCookers = async () => {

        const newCookers: {
            cookers: cookersInterface[];
        } = await cookingApi.getAllCookers();

        if (newCookers) {
            this.setCookersState(newCookers.cookers);
        }

    }

    refreshJson = (  ) => {
    
        const newJson =  JSON.stringify(this.allCookersObj);
   
    }

    deleteDish = ( cookerId: number, dishId: number  ) => {


        console.log("cookerId",cookerId," dishId", dishId );

        this.allCookersObj.forEach(el => {
               if (el.id === cookerId) {
                el.cookItems = el.cookItems.filter(dish => dish.id !== dishId);
               }
        });

        this.refreshJson();
          
    }

  



}