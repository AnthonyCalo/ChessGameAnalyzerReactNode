import React from 'react';
import { Modal,Button } from 'react-bootstrap';


export default function GameModal({closeModal, text}) {
    function handleSubmit(){
        closeModal(false)
    }
    return (
        <>
        <Modal.Header closeButton>GameOver</Modal.Header>
        <Modal.Body>
            {text}
        </Modal.Body>
        <Modal.Footer>
            <Button type="submit" onClick={handleSubmit}>Close</Button>
        </Modal.Footer>
        </>
    )
}
