import { h } from 'preact'
import { useState } from 'preact/hooks'
import Modal from 'react-modal'
import CrossSVG from '../assets/cross.svg'

const imageUrl = 'http://d3my2e9fyh34tb.cloudfront.net/biscuit_sea_star.jpg'
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    backgroundColor: 'transparent',
  },
}

function CloseButton({ closeModal, isClosing, modalHasOpen }) {
  let classes =
    'bg-black rounded-full w-9 h-9 flex justify-center items-center close-button'
  if (isClosing) {
    classes =
      'bg-black rounded-full w-9 h-9 flex justify-center items-center close-button closing'
  } else if (modalHasOpen) {
    classes =
      'bg-black rounded-full w-9 h-9 flex justify-center items-center close-button opened'
  }

  return (
    <div
      className="absolute top-0 right-0 p-2 cursor-pointer opacity-60 hover:opacity-100"
      onClick={closeModal}
    >
      <div className={classes}>
        <img className="w-4" src={CrossSVG} />
      </div>
    </div>
  )
}

export default function ModalComponent({ content, modalIsOpen, setIsOpen }) {
  const [modalHasOpen, setHasOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
    setHasOpen(false)
  }

  function animate() {
    setTimeout(() => {
      setHasOpen(true)
    }, 200)
  }

  let modalClasses = 'modal-container overflow-hidden'
  if (modalHasOpen) {
    modalClasses = 'modal-container overflow-hidden modal-open'
  }
  if (!modalIsOpen) {
    modalClasses = 'modal-container overflow-hidden modal-closing'
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      onAfterOpen={animate}
      style={customStyles}
      closeTimeoutMS={500}
      ariaHideApp={false}
    >
      <div className={modalClasses}>
        <CloseButton
          closeModal={closeModal}
          isClosing={!modalIsOpen}
          modalHasOpen={modalHasOpen}
        />
        <div className="flex">
          <div className="">
            <img src={imageUrl} className="w-[620px] h-[620px]" alt="descriptive text" />
          </div>
          <div className="w-[620px] h-[620px]">{content}</div>
        </div>
      </div>
    </Modal>
  )
}
