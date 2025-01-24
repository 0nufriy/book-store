import { CatalogeDTO } from "../Models/req/CatalogeDTO";
import { LoginDTO } from "../Models/req/LoginDTO";
import { RegistDTO } from "../Models/req/RegistDTO";

const BASE_URL = "https://localhost:7109/api";

const requestJSON = (options: any) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true"
    })
    if(localStorage.getItem("TOKEN")) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem("TOKEN"));
    }
    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    return fetch(options.url,options)
}

export function getAllBooks(){
    return requestJSON({
        url: BASE_URL + "/Book",
        method: 'GET'
    });
}

export function getSomeBooks(count: number, iter: number){
    return requestJSON({
        url: BASE_URL + "/Book/getSome/" + count + "/" + iter,
        method: 'GET'
    });
}

export function getCatalogeBooks(count: number, iter: number, cataloge: CatalogeDTO){
    console.log(BASE_URL + "/Book/getCataloge?count=" + count + "&iter=" + iter + "&minPrice=" + cataloge.minPrice + "&maxPrice=" + cataloge.maxPrice + "&genreId=" + cataloge.genreId + "&sort=" + cataloge.sort)
    return requestJSON({
        url: BASE_URL + "/Book/getCataloge?count=" + count + "&iter=" + iter + "&minPrice=" + cataloge.minPrice + "&maxPrice=" + cataloge.maxPrice + "&genreId=" + cataloge.genreId + "&sort=" + cataloge.sort,
        method: 'GET'
    });
}

export function getOneBook(id: string){
    return requestJSON({
        url: BASE_URL + "/Book/getOne/" + id,
        method: 'GET'
    });
}


export function getFiveGenre(){
    return requestJSON({
        url: BASE_URL + "/Book/genre/five",
        method: 'GET'
    });
}

export function getAllGenre(){
    return requestJSON({
        url: BASE_URL + "/Book/genre",
        method: 'GET'
    });
}

export function loginAuth(request: LoginDTO){
    return requestJSON({
        url: BASE_URL + "/Auth/login",
        method: 'POST',
        body: JSON.stringify(request)
    });
}

export function Registration(request: RegistDTO){
    return requestJSON({
        url: BASE_URL + "/Auth/registr",
        method: 'POST',
        body: JSON.stringify(request)
    });
}