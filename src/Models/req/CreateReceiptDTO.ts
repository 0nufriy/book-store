import { BookReceiptDTO } from "./BookReceiptDTO";

export interface CreateReceiptDTO {
    addressId: number,
    books: BookReceiptDTO[]
}