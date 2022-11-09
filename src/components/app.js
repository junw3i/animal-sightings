import { h } from 'preact'
import { useState } from 'preact/hooks'
import Modal from './Modal'

import Card from './Card'
import data from '../assets/data.json'

const App = () => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [cardData, setData] = useState(null)

  function openModal(index) {
    setIsOpen(true)
    setData(data[index])
  }

  return (
    <main class="px-0 flex min-h-screen">
      <div class="w-72 hidden">FILTER</div>
      <div class="max-w-7xl mx-4 fade-in duration-200">
        <div class="rhomboid rounded bg-red-500 sm:mt-8 mt-6">
          <div class="sm:text-5xl title px-3 py-2 text-3xl text-white font-bold leading-none">
            ANIMAL SIGHTINGS
          </div>
        </div>
        <div class="ml-1 mt-1 text-neutral-700 opacity-80 text-sm">
          It ain't much but it's honest work
        </div>
        <div class="sm:mt-8 mt-6">
          <div class="grid lg:grid-cols-4 2xl:grid-cols-5 grid-cols-2 lg:gap-x-6 gap-x-4 lg:gap-y-2 gap-y-1 lg:col-span-3">
            {data.map((animal, i) => (
              <Card key={animal.short_name} onClick={openModal} i={i} content={animal} />
            ))}
          </div>
        </div>
        <Modal content={cardData} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
      </div>
    </main>
  )
}

export default App
