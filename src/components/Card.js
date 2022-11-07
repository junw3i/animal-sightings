import { h } from 'preact'

const Card = ({ onClick, i, content }) => (
  <div
    class="flex flex-col justify-center items-center group cursor-pointer fade-in duration-300"
    onClick={() => onClick(i)}
  >
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
    <div class="text-bold text-sm uppercase leading-none mb-4">{content.short_name}</div>
  </div>
)

export default Card
