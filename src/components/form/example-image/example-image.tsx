import Image from "next/image";
import style from './example-image.module.css'
import easy from '../../../images/easy.webp'
import medium from '../../../images/medium.webp'
import hard from '../../../images/hard.webp'

type ExampleImageProps = {
  complexity: FormValues['complexity']
}


export default function ExampleImage({ complexity }: ExampleImageProps): React.ReactElement {
  return (
    <div>
      <div className={style['image-container']}>
        <Image src={complexity === 'easy' ? easy : complexity === 'medium' ? medium : hard} alt="Tattoo" fill={true} />
      </div>
      <div>
        {complexity === 'easy' && <p className={style['complexity-description']}> Imagens pequenas, com poucas linhas e poucas sombras, linhas simples e com poucos detalhes. Imagem: <a href="https://www.tattoodo.com/artists/charlotte.dot_tattoos" target={"_blank"} rel="noreferrer"> Charllote Louise</a></p>}
        {complexity === 'medium' && <p className={style['complexity-description']}>Imagens maiores, com média quantidade de detalhes, sombras mais realistas e linhas mais complicadas. Image: <a href="https://www.tattoodo.com/artists/scummotattoo" target={"_blank"} rel="noreferrer">Scummo Study</a></p>}
        {complexity === 'hard' && <p className={style['complexity-description']} >Imagens grandes, com bastante detalhes, linhas e sombras mais complicadas ou mais realistas. Imagem: <a href="https://www.tattoodo.com/artists/tessavonvon" target={"_blank"} rel="noreferrer">Tessa Von</a></p>}
      </div>
    </div>
  )
}