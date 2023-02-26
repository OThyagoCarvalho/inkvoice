import FormComponent from '@/components/form/form-component'
import Head from 'next/head'
import Image from 'next/image'
import cover from '../images/cover.jpg'


export default function Home() {
  return (
    <>
      <Head>
        <title>Inkvoice</title>
        <meta name="description" content="Inkvoice - Orçamento" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="desktop-only">
        <h1> Ops..., esta aplicação foi projetada para ser acessada por dispositivos móveis, acesse através de um telefone ou tablet.</h1>
      </div>
      <main className="content">
        <div className="max-content-container">
          <div className="cover">
            <Image src={cover} alt="Tattoo" fill={true} />
          </div>
          <div className="cover-text">
            <div>
              <h1 className="title">
                <span>In</span>k<span>voice</span>
              </h1>
            </div>
            <p className="subtitle">
              Responda algumas perguntas e receba uma estimativa de quanto custa sua ideia de tatuagem.
            </p>
          </div>
          <FormComponent />
        </div>
      </main>
    </>
  )
}
