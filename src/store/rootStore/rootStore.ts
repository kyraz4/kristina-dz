import { CookingStore } from "./cookingStore/cookingStore";

export class RootStore {
         
    cookingStore:CookingStore = new CookingStore(this);

}