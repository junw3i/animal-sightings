import { h } from 'preact'
import { useState, useRef, useEffect } from 'preact/hooks'
import Modal from './Modal'

import Card from './Card'
import data from '../assets/data.json'

// https://stackoverflow.com/questions/57810378/how-to-create-dynamic-refs-in-functional-component-using-useref-hook

const App = () => {
  const [headerClassName, setHeaderClassName] = useState('hidden-card')
  const [modalIsOpen, setIsOpen] = useState(false)
  const [visibleSections, setVisibleSections] = useState([])
  const [cardData, setData] = useState(null)
  const myRefs = useRef([])

  function openModal(index) {
    setIsOpen(true)
    setData(data[index])
  }

  useEffect(() => {
    // const sections = [intro, projectOne, projectTwo, projectThree, details, team];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        // console.log('entries', entries);
        // console.log('observer', observer);
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target
            observer.unobserve(section)
            if (visibleSections.includes(section)) return
            setVisibleSections(prevSections => [...prevSections, section])
          }
        })
      },
      { threshold: 0 }
    )

    myRefs.current.forEach(section => {
      sectionObserver.observe(section)
    })

    return () => {
      sectionObserver.disconnect()
    }
  }, [visibleSections])

  useEffect(() => {
    setHeaderClassName('show-card duration-700 transition-all')
  }, [])

  return (
    <main class="px-0 flex min-h-screen">
      <div class="w-72 hidden">FILTER</div>
      {/* <div class="max-w-7xl mx-4 fade-in duration-200"> */}

      <div class="max-w-7xl mx-4">
        <div class={headerClassName}>
          <div class={`rhomboid rounded bg-red-500 sm:mt-8 mt-6`}>
            <div class="sm:text-5xl title px-3 py-2 text-3xl text-white font-bold leading-none">
              ANIMAL SIGHTINGS
            </div>
          </div>
          <div class="ml-1 mt-1 text-neutral-700 opacity-80 text-sm">
            It ain't much but it's honest work
          </div>
        </div>
        <div class="sm:mt-8 mt-6">
          <div class="grid lg:grid-cols-4 2xl:grid-cols-5 grid-cols-2 lg:gap-x-6 gap-x-4 lg:gap-y-2 gap-y-1 lg:col-span-3">
            {data.map((animal, i) => (
              <Card
                key={animal.short_name}
                onClick={openModal}
                i={i}
                content={animal}
                rf={el => (myRefs.current[i] = el)}
                isVisible={visibleSections.includes(myRefs.current[i])}
              />
            ))}
          </div>
        </div>
        <Modal content={cardData} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
      </div>
    </main>
  )
}

export default App
