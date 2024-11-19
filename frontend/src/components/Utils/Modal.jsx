import React, { useRef } from 'react'
import './Modal.css'
const Modal = ({ children, setIsOpen }) => {
    const modalRef = useRef()
    const wrapper = useRef()
    const handleClick = (e) => {

        if (modalRef.current === e.target) {
            setIsOpen(false);
        }
    }
    return (
        <div className='modal' ref={modalRef} onClick={handleClick}>

            <div className='modal_wrapper' ref={wrapper}>
                {children}
            </div>

        </div>
    )
}

export default Modal
