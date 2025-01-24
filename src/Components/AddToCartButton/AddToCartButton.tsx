import { useState } from "react";
import AddToCartModal from "../Modal/AddToCart/AddToCartModal";
import { BookElementProps } from "../BookElement/BookElement";

interface ClassDTO {
    class: string,
    classDisable: string,
    book: BookElementProps | null,
    disable: boolean
}

function AddToCartButton(props: ClassDTO) {

    const [showOvrerlay, setShowOverlay] = useState<boolean>(false)

    return (
        <>
            <button disabled={props.disable} onClick={()=>(setShowOverlay(true))} className={ props.disable? props.classDisable :  props.class}>До кошика</button>
        
            {showOvrerlay && props.book && <AddToCartModal setShow={setShowOverlay} book={props.book} ></AddToCartModal> }
        </>
    )
}
export default AddToCartButton