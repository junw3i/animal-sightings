import { h } from 'preact'
import { useState } from 'preact/hooks'
import Modal from 'react-modal'

import ModalCard from './ModalCard'
import CrossSVG from '../assets/cross.svg'
import LinkSVG from '../assets/external-link.svg'

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

function Tag({ children }) {
  return (
    <div className="rounded bg-black bg-opacity-10 py-2 px-3 leading-none uppercase text-sm">
      {children}
    </div>
  )
}
function TagContainer({ children, header }) {
  return (
    <div className="p-2 pt-1 rounded mt-2 shadow-bk bg-purplish bg-opacity-70 border-2 border-slate-800">
      <p className="text-xs mb-1 inline opacity-60">{header}</p>
      {children}
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

  let modalClasses = 'modal-container overflow-hidden shadow'
  if (modalHasOpen) {
    modalClasses = 'modal-container overflow-hidden modal-open shadow'
  }
  if (!modalIsOpen) {
    modalClasses = 'modal-container overflow-hidden modal-closing'
  }

  if (!content) return null

  const locations = content.locations.map(location => (
    <Tag key={location}>{location}</Tag>
  ))
  const links = content.link.map(link => (
    <a
      key={link.name}
      href={link.link}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-70"
    >
      <Tag>
        <div className="flex justify-between items-center">
          <p>{link.name}</p> <img className="w-3" src={LinkSVG} />
        </div>
      </Tag>
    </a>
  ))

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      onAfterOpen={animate}
      style={customStyles}
      closeTimeoutMS={500}
      ariaHideApp={false}
      className="absolute lg:w-full w-10/12 max-w-7xl outline-0"
    >
      <div className={modalClasses}>
        <CloseButton
          closeModal={closeModal}
          isClosing={!modalIsOpen}
          modalHasOpen={modalHasOpen}
        />
        <div className="grid md:grid-cols-12 grid-cols-1">
          <div className="col-span-6">
            <img
              src={content.image}
              className="border-b-4 sm:border-r-4 border-slate-800"
              alt={content.short_name}
            />
          </div>
          <div className="col-span-6 flex flex-col max-h-[45vh] sm:max-h-full overflow-y-auto">
            <div className="h-full w-full flex flex-col">
              <div className="sm:mt-8 mt-4 mx-6 bg-white border-2 border-black pl-4 pb-2 pt-3 rounded text-sm shadow-bk">
                <p className="leading-none opacity-60 uppercase">
                  {content.scientific_name}
                </p>
                <p className="font-header sm:text-2xl text-xl uppercase tracking-wide leading-none">
                  {content.short_name}
                </p>
              </div>
              <div className="flex flex-col grow justify-between h-full sm:h-0">
                <div className="mx-6 lg:grid-cols-2 sm:gap-3 gap-2 grid grid-cols-1 sm:mt-12 mt-2">
                  <ModalCard header="CATEGORY" text={content.category} />
                  <ModalCard header="TYPE" text={content.type} />
                  <ModalCard header="DIET" text={content.diet} />
                  <ModalCard header="SIZE" text={content.size} />
                </div>
                <div className="mx-6 mb-4">
                  <TagContainer header="SIGHTED AT">
                    <div className="grid sm:grid-cols-4 grid-cols-2 gap-2 ">
                      {locations}
                    </div>
                  </TagContainer>
                  <TagContainer header="MORE INFO">
                    <div className="grid sm:grid-cols-3 grid-cols-1 gap-2 ">{links}</div>
                  </TagContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
