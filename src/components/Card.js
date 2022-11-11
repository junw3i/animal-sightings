import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'

// function getClassByDelay(delay) {
//   return `delay-[${delay * 100}ms]`
// }

function getClassByDelay(delay) {
  return {
    0: 'delay-[0ms]',
    1: 'delay-[100ms]',
    2: 'delay-[200ms]',
    3: 'delay-[300ms]',
  }[delay]
}

const Card = ({ onClick, i, content, rf, isVisible }) => {
  const [className, setClassName] = useState(
    `flex flex-col justify-center items-center group cursor-pointer transition-all hidden-card`
  )
  // console.log('isVisible', isVisible, getClassByDelay(500))

  useEffect(() => {
    if (isVisible) {
      const imod = i % 4
      const delay = getClassByDelay(imod)
      setClassName(
        `flex flex-col justify-center items-center group cursor-pointer ${delay} transition-all duration-1000 show-card`
      )
    }
  }, [isVisible, i])
  return (
    <div class={className} onClick={() => onClick(i)} ref={rf}>
      <img
        src={content.image}
        style="aspect-ratio: 1"
        height="360"
        width="360"
        loading="lazy"
        class="rounded shadow border-solid border-2 border-neutral-700 lg:group-hover:scale-105 duration-300"
      />
      <div class="mt-3 text-sm uppercase text-neutral-700 opacity-80">
        {content.category}
      </div>
      <div class="text-bold text-sm uppercase leading-none mb-4 text-center h-8">
        {content.short_name}
      </div>
    </div>
  )
}

export default Card
