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

export function getFiveGenre(){
    return requestJSON({
        url: BASE_URL + "/Book/genre/five",
        method: 'GET'
    });
}