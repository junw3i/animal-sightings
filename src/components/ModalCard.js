import { h } from 'preact'

const ModalCard = ({ header, text }) => (
  <div className="rounded bg-white bg-opacity-20 py-2 px-3">
    <p className="text-xs opacity-60">{header}</p>
    <p className="uppercase font-bold leading-none">{text}</p>
  </div>
)

export default ModalCard
