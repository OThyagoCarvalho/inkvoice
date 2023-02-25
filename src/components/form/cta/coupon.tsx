import style from './coupon.module.css'

type CouponProps = {
  price: number
}

export default function Coupon({ price }: CouponProps): React.ReactElement {

  const calculateDiscount = (price: number) => {
    if (price <= 500) {
      return 10
    }
    if (price > 500 && price <= 1000) {
      return 15
    }
    if (price > 1000) {
      return 20
    }
  }
  const calculateExpirationDate = () => {
    const date = new Date()
    const expirationDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7)
    return expirationDate.toLocaleDateString('pt-BR')
  }
  const createCouponName = (discount: number) => {
    return `DINK${discount}%OFF`
  }

  const couponName = createCouponName(calculateDiscount(price)!)

  return (
    <div>
      <div className={style["coupon-container"]}>
        <p className={style['coupon-name']}> {`"${couponName}"`} </p>
        <p className={style['coupon-disclaimer']}> **válido até {calculateExpirationDate()} para orçamentos</p>
        {price <= 500 && <span> de até R$ 500,00 </span>}
        {price > 500 && price <= 1000 && <span>de até R$ 1.000,00 </span>}
        {price > 1000 && <span> a partir R$ 1.000,00 </span>}
        <form method="POST" action={process.env.NEXT_PUBLIC_GETFORMS_ENDPOINT} className={style['coupon-form']}>
          <label className={style['coupon-label']} htmlFor="name" hidden> Nome</label>
          <input className={style['coupon-input']} id="name" name='name' type="text" placeholder="nome" required />
          <label className={style['coupon-label']} htmlFor="email" hidden> Email </label>
          <input className={style['coupon-input']} id="email" name='email' type="email" placeholder="email@email.com" required />
          <label className={style['coupon-label']} htmlFor="phone" hidden> Telefone </label>
          <input className={style['coupon-input']} id="phone" name='phone' type="tel" placeholder="021 99999-9999" required />
          <input type="number" readOnly value={price ? price : 0} name="invoice-value" hidden />
          <p> Não enviamos spam ou ligações, apenas entraremos em contato por whatsapp</p>
          <div className={style['coupon-button-container']}>
            <button type='submit' className={style['coupon-button']}> Quero desconto</button>
          </div>
        </form>
      </div>
    </div>
  )
}