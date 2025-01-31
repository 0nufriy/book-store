export interface CreateBookDTO {
    genreId: number,
    bookName: string,
    autor: string,
    description: string,
    pagecount: number,
    format: string,
    isbn: string,
    cover: string,
    image: string,
    price: number,
    stock: number
}