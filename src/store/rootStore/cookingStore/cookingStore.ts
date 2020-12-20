import { RootStore } from "../rootStore";
import { observable, action, makeAutoObservable, makeObservable } from 'mobx';

export class CookingStore {

    constructor( rootStore: RootStore ) {
  
        makeAutoObservable(this, {
             rootStore: observable
        });

        this.rootStore = rootStore;

    } 

    rootStore: RootStore;


}