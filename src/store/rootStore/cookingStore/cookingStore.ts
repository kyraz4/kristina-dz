import { RootStore } from "../rootStore";
import { observable, action, makeAutoObservable, makeObservable } from 'mobx';
import { cookersInterface, cookingApi } from '../../../api/api';


export class CookingStore {

    constructor(rootStore: RootStore) {

        makeAutoObservable(this, {
            rootStore: observable,
            allCookersObj: observable,

        });

        this.rootStore = rootStore;

    }

    rootStore: RootStore;

    allCookersObj: cookersInterface[] = [];


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

        this.allCookersObj.forEach(el => {
               if (el.id === cookerId) {
                   el.cookItems.filter(dish => dish.id !== dishId);
               }
        });

        this.refreshJson();
          
    }

    addNewCooker = () => {


        
        this.refreshJson();

    }



}