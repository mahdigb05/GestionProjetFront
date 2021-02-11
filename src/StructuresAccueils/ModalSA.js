import React from 'react'
import ReactDom from 'react-dom'


const MODAL_STYLES = {
	position : 'fixed',
	top :'45%',
	left:'50%',
	width:'100%',
	transform : 'translate(-50%,-50%)',
	zIndex :1000
}

const OVERLAY_STYLES = {
	position:'fixed',
	top:0,
	left:0,
	right:0,
	buttom:0,
	backgroundColor : 'rgba(0, 0, 0, .7)',
	width:'100%',
  	height: '100%',
	zIndex:1000
}

export default function ModalSA({openModal, children}) {
	
	if(!openModal) return null
    return ReactDom.createPortal(
        <>
            <div style = {OVERLAY_STYLES}>
                <div style = {MODAL_STYLES}>
                    {children}
                </div>
            </div>
        </>,
        document.getElementById('portal')
    )
}
