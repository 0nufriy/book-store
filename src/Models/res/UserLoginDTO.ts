import { AddressDTO } from "./address";

export interface UserLoginDTO {
    id: number,
    login: string,
    email: string,
    phone: string,
    name: string,
    role: string,
    token: string,
    addresses: AddressDTO[]
}