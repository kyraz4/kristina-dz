import { default as allCookers } from '../jsonData/allCookers.json';


const allCookersMock: { cookers: cookersInterface[] } = allCookers as { cookers: cookersInterface[] };


export interface cookItem {
    name: string,
    id: number,
}


export interface cookersInterface {

    name: string,
    id: number,
    cookItems: cookItem[]


}


export const cookingApi =  {


    getAllCookers() {
        return  allCookersMock;
    }
   



}