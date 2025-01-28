import { AddAddressDTO } from "../Models/req/AddAddressDTO";
import { CatalogeDTO } from "../Models/req/CatalogeDTO";
import { CreateBookDTO } from "../Models/req/CreateBookDTO";
import { CreateReceiptDTO } from "../Models/req/CreateReceiptDTO";
import { LoginDTO } from "../Models/req/LoginDTO";
import { RegistDTO } from "../Models/req/RegistDTO";
import { UpdateBookDTO } from "../Models/req/UpdateBookDTO";
import { UpdateUserDTO } from "../Models/req/UpdateUserDTO";

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
    return fetch(options.url,options).catch(error => {
        throw  error
    })
}

export function getAllBooks(){
    return requestJSON({
        url: BASE_URL + "/Book",
        method: 'GET'
    });
}

export function getUser(){
    return requestJSON({
        url: BASE_URL + "/User",
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

   

    if(cataloge.search.length >= 3){
        return requestJSON({
            url: BASE_URL + "/Book/getCataloge?count=" + count + 
                            "&iter=" + iter + 
                            "&minPrice=" + cataloge.minPrice + 
                            "&maxPrice=" + cataloge.maxPrice + 
                            "&genreId=" + cataloge.genreId + 
                            "&sort=" + cataloge.sort +
                            "&search=" + cataloge.search,
            method: 'GET'
        });
    }

    return requestJSON({
        url: BASE_URL + "/Book/getCataloge?count=" + count + 
                        "&iter=" + iter + 
                        "&minPrice=" + cataloge.minPrice + 
                        "&maxPrice=" + cataloge.maxPrice + 
                        "&genreId=" + cataloge.genreId + 
                        "&sort=" + cataloge.sort,
        method: 'GET'
    });
}

export function getSearchBooks(search: string){
    return requestJSON({
        url: BASE_URL + "/Book/getCataloge?count=" + 3 + "&iter=" + 1 + "&minPrice=" + 0 + "&maxPrice=" + 2000 + "&genreId=" + 0 + "&sort=" + "def" + "&search=" + search,
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

export function UpdateUser(request: UpdateUserDTO){
    return requestJSON({
        url: BASE_URL + "/User",
        method: 'PUT',
        body: JSON.stringify(request)
    });
}
export function addAddress(request: AddAddressDTO){
    return requestJSON({
        url: BASE_URL + "/User/address",
        method: 'POST',
        body: JSON.stringify(request)
    });
}

export function removeAddress(id: number){
    return requestJSON({
        url: BASE_URL + "/User/Delete/" + id,
        method: 'DELETE'
    });
}

export function createReceipt(request: CreateReceiptDTO){
    return requestJSON({
        url: BASE_URL + "/Receipt",
        method: 'POST',
        body: JSON.stringify(request)
    });
}

export function getReceipts(){
    return requestJSON({
        url: BASE_URL + "/Receipt",
        method: 'GET'
    });
}

export function UpdateStatus(receiptId: number, status: number){
    return requestJSON({
        url: BASE_URL + "/Receipt?receiptId=" + receiptId + "&status=" + status,
        method: 'PUT'
    });
}

export function UpdateBook(request: UpdateBookDTO){
    return requestJSON({
        url: BASE_URL + "/Book",
        method: 'PUT',
        body: JSON.stringify(request)
    });
}

export function CreateBook(request: CreateBookDTO){
    return requestJSON({
        url: BASE_URL + "/Book",
        method: 'POST',
        body: JSON.stringify(request)
    });
}