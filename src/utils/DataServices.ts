import { ICharacters } from "@/Interfaces/Interfaces";

const url = 'https://potterhead-api.vercel.app/api/characters'

export const charactersApi = async () => {
    const promise = await fetch(url)
    const data: ICharacters[] = await promise.json()
    console.log(data);
    return data; 
}



