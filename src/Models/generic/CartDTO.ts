import { CartElementDTO } from "./CartElementDTO";

export interface CartDTO {
    getCart: CartElementDTO[]
    setCart: React.Dispatch<React.SetStateAction<CartElementDTO[]>>
}