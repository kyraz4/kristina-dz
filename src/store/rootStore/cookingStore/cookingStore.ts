import { RootStore } from "../rootStore";
import { observable, action, makeAutoObservable, makeObservable } from 'mobx';
import { cookersInterface, cookingApi, cookItem } from '../../../api/api';


export class CookingStore {

    constructor(rootStore: RootStore) {

        makeAutoObservable(this, {
            choosenChangeDishCooker: observable,
            rootStore: observable,
            currentText: observable,
            allCookersObj: observable,
            setChoosenChangeDish: action,
            addNewDish: action,
            addNewCooker: action,
            refreshJson: action,
            deleteDish: action,
            onDishNameChange: action,
            setCurrentText: action,
            setChoosenChangeDishCooker: action,
            changeCookerDish: action

        });

        this.rootStore = rootStore;

    }


    choosenChangeDish: cookItem | null = null;

    choosenChangeDishCooker: cookersInterface | null = null;

    currentText:string = ''; 

    rootStore: RootStore;

    allCookersObj: cookersInterface[] = [];


    changeCookerDish = (event: React.ChangeEvent<HTMLSelectElement>) => {

        const cooker = this.allCookersObj.find(el => el.name ===  event.currentTarget.value);

        if (cooker && this.choosenChangeDish && this.choosenChangeDishCooker ) {

            cooker.cookItems.push(this.choosenChangeDish);
            this.choosenChangeDishCooker.cookItems =  this.choosenChangeDishCooker.cookItems.filter(el => el.id !== this.choosenChangeDish?.id )

            this.choosenChangeDish= null;
            this.choosenChangeDishCooker = null;

        }

    }

    setChoosenChangeDish = (event: React.ChangeEvent<HTMLSelectElement>) => {
        
        const cookItem = this.choosenChangeDishCooker?.cookItems.find(el => el.name === event.currentTarget.value);

        if(cookItem) this.choosenChangeDish = cookItem;

    }

    setChoosenChangeDishCooker = (event: React.ChangeEvent<HTMLSelectElement>) => {

      const cooker = this.allCookersObj.find(el => el.name ===  event.currentTarget.value);

      if (cooker) this.choosenChangeDishCooker = cooker;

    }


    getRandomInt = (min : number, max: number) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
      }


    onDishNameChange = ( cookerId:number , event: React.ChangeEvent<HTMLInputElement> ) => {
          
        const cooker = this.allCookersObj.find(el => el.id === cookerId);

        if ( cooker ) {

            console.log(event);
            cooker.newDishName =  event.currentTarget.value;
        }
         
    }


    setCurrentText = ( event: React.ChangeEvent<HTMLInputElement> ) => {
      this.currentText = event.currentTarget.value;
    }


    addNewDish = ( cookerId: number ) => {

        const cooker = this.allCookersObj.find(el => el.id === cookerId);

        cooker && cooker.cookItems.push({
            id: this.getRandomInt(0, 1000000000),
            name: cooker.newDishName
        });

        cooker!.newDishName = '';

    }


    addNewCooker = () => {

        this.allCookersObj.push({
            id: 3,
       name: this.currentText,
        cookItems: [],
        newDishName: ''
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