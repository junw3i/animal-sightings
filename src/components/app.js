import { h } from 'preact'
import { useState } from 'preact/hooks'
import Modal from './Modal'

import Card from './Card'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

const App = () => {
  const [modalIsOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }

  return (
    <main class="sm:px-0 px-4 flex">
      <div class="w-72">FILTER</div>
      <div class="max-w-7xl mx-4 fade-in duration-200">
        <div class="rhomboid rounded bg-red-500 mt-8">
          <div class="sm:text-5xl title px-3 py-2 text-4xl text-white font-header">
            ANIMAL SIGHTINGS
          </div>
        </div>
        <div class="ml-1 mt-1 text-neutral-700 opacity-80 text-sm">
          It ain't much but it's honest work
        </div>
        <div class="mt-12">
          <div class="grid lg:grid-cols-4 2xl:grid-cols-5 grid-cols-2 lg:gap-x-6 gap-x-4 lg:gap-y-2 gap-y-1 lg:col-span-3">
            <Card onClick={openModal} />
            <Card onClick={openModal} />
          </div>
        </div>
        <Modal content="hello" modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
      </div>
    </main>
  )
}

export default App
