import Modal from './templates/Modal'
import { useState } from 'react';
import Options from './Options'

function OptionsModalButton() {

    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        setShowModal(true);
    }

    const dismissModal = () => {
        setShowModal(false);
    }

    const actionBar = <div>
        <button className="border-solid bg-eggplant flex align-center" onClick={dismissModal}>Update Options</button>
    </div>

    const modal = <Modal onClose={dismissModal} actionBar={actionBar}>
        <Options />
    </Modal>

    return <div>
        <button className="border-solid bg-eggplant ml-4 flex align-center" onClick={handleClick}>Options</button>
        {showModal && modal }
    </div>
}

export default OptionsModalButton;