import { useState } from "react"
import ExampleImage from "./example-image/example-image"
import style from './form-component.module.css'
import { calculatePrice } from "@/utils/calculatePrice"
import PriceDisplay from "./price-display/price-display"
import Coupon from "./cta/coupon"
import { ResetIcon } from '@radix-ui/react-icons'

export default function FormComponent() {

  // controled values
  const [formValues, setFormValues] = useState({ height: 0, width: 0, colors: 0, isOriginal: false, complexity: 'easy' }) as [FormValues, (formValues: FormValues) => void]
  const [price, setPrice] = useState(0)

  // handlers
  const handleCalculate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const height = Number(formData.get('height in cm'))
    const width = Number(formData.get('width in cm'))
    const colors = Number(formData.get('number of colors'))
    const isOriginal = Boolean(formData.get('is original'))
    const complexity = formData.get('complexity') as 'easy' | 'medium' | 'hard'
    const price = calculatePrice({ height, width, colors, isOriginal, complexity })
    if (price < Number(process.env.NEXT_PUBLIC_MIN_PRICE_POINT)) {
      setPrice(Number(process.env.NEXT_PUBLIC_MIN_PRICE_POINT));
    } else if (price > Number(process.env.NEXT_PUBLIC_MAX_PRICE_POINT)) {
      console.log(process.env.NEXT_PUBLIC_MAX_PRICE_POINT)
      setPrice(Number(process.env.NEXT_PUBLIC_MAX_PRICE_POINT))
    } else {
      return setPrice(price)
    }
  }

  return (
    <div className={style['form-container']}>
      <form className={style.form} onSubmit={(event) => handleCalculate(event)}>
        {
          price === 0 &&
          <div className={style['inputs-container']}>
            <div className={style['form-group']}>
              <label className={style.label} htmlFor="height in cm" hidden>Altura em cm</label>
              <input className={style['text-input']} type="number" name="height in cm" id="height in cm" placeholder="Altura em cm" />
            </div>
            <div className={style['form-group']}>
              <label className={style.label} htmlFor="width in cm" hidden>Largura em cm</label>
              <input className={style['text-input']} type="number" name="width in cm" id="width in cm" placeholder="Largura em cm" />
            </div>
            <div className={style['form-group']}>
              <label className={style.label} htmlFor="number of colors" hidden> Número de cores</label>
              <input className={style['text-input']} type="number" name="number of colors" id="number of colors" placeholder="Número de cores" />
            </div>
            <div className={style['form-group']}>
              <label className={style.label} htmlFor="is original">É um design original?</label>
              <input type="checkbox" name="is original" id="is original" />
            </div>
            <div className={style['form-group']}>
              <label className={style.label} htmlFor="complexity">Complexidade</label>
              <select name="complexity" id="complexity" onChange={(event) => setFormValues({ ...formValues, complexity: event.currentTarget.value as FormValues['complexity'] })}>
                <option value="easy"> Fácil
                </option>
                <option value="medium" onSelect={() => setFormValues({ ...formValues, complexity: "medium" })}>Média</option>
                <option value="hard" onSelect={() => setFormValues({ ...formValues, complexity: "hard" })}>Difícil</option>
              </select>
            </div>
            {
              /* image complexity display and description as a function of the chosen complexity value */
              formValues.complexity && <div className={style['complexity-description']}> <ExampleImage complexity={formValues.complexity} /></div>
            }
            <div className={style['submit-button']}>
              <button type="submit">Calcular</button>
            </div>
          </div>
        }
      </form>
      {
        price > 0 && <div>
          <PriceDisplay price={price} />
          <Coupon price={price} />
        </div>
      }
      {price > 0 && <button className={style['restart-button']} onClick={() => setPrice(0)}> <ResetIcon /> Recomeçar</button>}
    </div>
  )
}