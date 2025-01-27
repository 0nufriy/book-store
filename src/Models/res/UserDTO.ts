import { AddressDTO } from "./address";

export interface UserDTO {
    id: number,
    login: string,
    email: string,
    phone: string,
    name: string,
    role: string,
    addresses: AddressDTO[]
}