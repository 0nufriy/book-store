import { BookInReceiptDTO } from "./BookInReceiptDTO";
import { UserDTO } from "./UserDTO";

export interface ReceiptDTO {
    id: number,
    userId: number,
    address: string,
    status: number,
    user: UserDTO | null,
    books: BookInReceiptDTO[]
}