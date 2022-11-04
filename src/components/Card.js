import { h } from 'preact'

const imageUrl = 'http://d3my2e9fyh34tb.cloudfront.net/biscuit_sea_star.jpg'

const Card = ({ onClick }) => (
  <div
    class="flex flex-col justify-center items-center group cursor-pointer fade-in duration-300"
    onClick={onClick}
  >
    <img
      src={imageUrl}
      style="aspect-ratio: 1"
      height="360"
      width="360"
      loading="lazy"
      class="rounded shadow border-solid border-2 border-neutral-700 lg:group-hover:scale-105 duration-300"
    />
    <div class="mt-3 text-sm uppercase text-neutral-700 opacity-80">Starfish</div>
    <div class="text-bold text-sm uppercase">Biscuit Sea Star</div>
  </div>
)

export default Card
