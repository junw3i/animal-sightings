import { h } from 'preact'
import { useState, useRef, useEffect } from 'preact/hooks'
import Modal from './Modal'

import Card from './Card'
import data from '../assets/data.json'

// https://stackoverflow.com/questions/57810378/how-to-create-dynamic-refs-in-functional-component-using-useref-hook

const App = () => {
  const [headerClassName, setHeaderClassName] = useState('hidden-card')
  const [activeTab, setActiveTab] = useState('wild')
  const [modalIsOpen, setIsOpen] = useState(false)
  const [visibleSections, setVisibleSections] = useState([])
  const [cardData, setData] = useState(null)
  const wildRefs = useRef([])
  const captiveRefs = useRef([])
  const plantsRefs = useRef([])

  function openModal(index) {
    setIsOpen(true)
    setData(data[activeTab][index])
  }

  function handleClickTab(tab) {
    setVisibleSections([])
    setActiveTab(tab)
  }

  useEffect(() => {
    // console.log(activeTab)
    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
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

    wildRefs.current.forEach(section => {
      if (section) {
        sectionObserver.observe(section)
      }
    })
    captiveRefs.current.forEach(section => {
      if (section) {
        sectionObserver.observe(section)
      }
    })
    plantsRefs.current.forEach(section => {
      if (section) {
        sectionObserver.observe(section)
      }
    })

    return () => {
      sectionObserver.disconnect()
    }
  }, [visibleSections, activeTab])

  useEffect(() => {
    setHeaderClassName('show-card duration-700 transition-all inline-flex flex-col')
  }, [])

  const activeCss =
    'py-2 px-5 lg:hover:scale-105 lg:hover:bg-red-300 duration-300 bg-red-300 cursor-pointer'
  const inactiveCss =
    'py-2 px-5 lg:hover:scale-105 lg:hover:bg-red-300 duration-300 bg-red-200 cursor-pointer'

  const wild = data['wild'].map((animal, i) => (
    <Card
      key={animal.short_name}
      onClick={openModal}
      i={i}
      content={animal}
      rf={el => (wildRefs.current[i] = el)}
      isVisible={visibleSections.includes(wildRefs.current[i])}
    />
  ))

  const captive = data['captive'].map((animal, i) => (
    <Card
      key={animal.short_name}
      onClick={openModal}
      i={i}
      content={animal}
      rf={el => (captiveRefs.current[i] = el)}
      isVisible={visibleSections.includes(captiveRefs.current[i])}
    />
  ))

  let plants = data['plants'].map((animal, i) => (
    <Card
      key={animal.short_name}
      onClick={openModal}
      i={i}
      content={animal}
      rf={el => (plantsRefs.current[i] = el)}
      isVisible={visibleSections.includes(plantsRefs.current[i])}
    />
  ))

  if (plants.length < 5) {
    let count = plants.length
    while (count < 5) {
      plants.push(<div class="w-[360px]" />)
      count++
    }
  }

  return (
    <main class="px-0 flex min-h-screen">
      <div class="w-72 hidden">FILTER</div>
      {/* <div class="max-w-7xl mx-4 fade-in duration-200"> */}

      <div class="max-w-7xl mx-4">
        <div class={headerClassName}>
          <div
            class={`rhomboid rounded bg-red-500 sm:mt-8 mt-6 border-solid border-4 border-neutral-700 shadow`}
          >
            <div class="sm:text-5xl title px-8 py-2 text-3xl text-white font-bold leading-none">
              SIGNS OF LIFE
            </div>
          </div>
          <div class="mt-10 shadow flex w-fit">
            <div
              class={activeTab === 'wild' ? activeCss : inactiveCss}
              onClick={() => handleClickTab('wild')}
            >
              WILD
            </div>
            <div
              class={activeTab === 'plants' ? activeCss : inactiveCss}
              onClick={() => handleClickTab('plants')}
            >
              FLORA
            </div>
            <div
              class={activeTab === 'captive' ? activeCss : inactiveCss}
              onClick={() => handleClickTab('captive')}
            >
              CAPTIVE
            </div>
          </div>
        </div>
        <div class="sm:mt-4 mt-4">
          <div class="grid lg:grid-cols-4 2xl:grid-cols-5 grid-cols-2 lg:gap-x-6 gap-x-4 lg:gap-y-2 gap-y-1 lg:col-span-3">
            {/* {data[activeTab].map((animal, i) => (
              <Card
                key={animal.short_name}
                onClick={openModal}
                i={i}
                content={animal}
                rf={el => (wildRefs.current[i] = el)}
                isVisible={visibleSections.includes(wildRefs.current[i])}
                // isVisible={true}
              />
            ))} */}
            {activeTab === 'wild' && wild}
            {activeTab === 'captive' && captive}
            {activeTab === 'plants' && plants}
          </div>
        </div>
        <div class="my-5 uppercase font-bold text-neutral-600 leading-tight text-center shadow-text">
          Spot any mistakes or just want to chat? Reach out to me on{' '}
          <a
            class="text-red-500"
            href="https://t.me/SeverusCuckoo"
            target="_blank"
            rel="noopener noreferrer"
          >
            telegram
          </a>
          .
        </div>
        <Modal content={cardData} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
      </div>
    </main>
  )
}

export default App
