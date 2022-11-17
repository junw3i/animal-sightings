import { h } from 'preact'

const ModalCard = ({ header, text }) => (
  <div className="rounded bg-purplish bg-opacity-70 py-2 px-3 shadow-bk border-2 border-slate-800">
    <p className="text-xs opacity-60">{header}</p>
    <p className="uppercase sm:text-md text-sm font-bold leading-none">{text}</p>
  </div>
)

export default ModalCard
