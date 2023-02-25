import style from './price-display.module.css'

type PriceDisplayProps = {
  price: number
}

export default function PriceDisplay({ price }: PriceDisplayProps) {
  return (
    <div>
      <div className={style["price-display"]}>
        <p className={`${style['price-display-field']} + ${style['price-field']}`}>Preço estimado: R$ {price.toFixed(2)}</p>
        <p className={style['price-display-field']}> **O preço mostrado é apenas uma estimativa, não constitui uma promessa e pode variar para mais ou para menos </p>
      </div >
      <hr />
    </div>
  )
}