import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import useFetch from '../../hooks/useFetch'

import styles from './Modal.module.css'

type Props = {
  isOpen: boolean
  item_id: number
  type: string | undefined
  setIsOpen: Function
}

export const Modal = ({ isOpen, item_id, type, setIsOpen }: Props) => {
  // Chamar a API aqui
  const { data: dataPtBR } = useFetch(
    `/${type == 'serie' ? 'tv' : 'movie'}/${item_id}/videos?language=pt-BR&append_to_response=videos`
  )
  const { data: dataEnUS } = useFetch(
    `/${type == 'serie' ? 'tv' : 'movie'}/${item_id}/videos?language=pt-BR&append_to_response=videos`
  )
  const [dublados, setDublados] = useState<any>()
  console.log(dublados)
  console.log(dataEnUS)
  useEffect(() => {
    const trailersDublados = dataPtBR?.results.filter((item) => item.name.toLowerCase().includes('dublado'))
    setDublados(trailersDublados)
  }, [dataPtBR])

  useEffect(() => {
    const body = document.querySelector('body')

    if (isOpen) {
      body!.style.overflowY = 'hidden'
    } else {
      body!.style.overflowY = 'scroll'
    }
  }, [isOpen])

  const closeModal = () => {
    setIsOpen(false)
  }
  console.log(
    `https://www.youtube.com/embed/${
      dublados?.[0]?.key ? dublados?.[0]?.key : dataEnUS?.results?.[0]?.key
    }?rel=0&controls=1&volume=10`
  )
  const content = (
    <div className={styles.modal} onClick={closeModal}>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className={styles.modal_container}>
        {!dublados || !dataEnUS?.results ? (
          <h1>Não foi possível encontrar um trailer.</h1>
        ) : (
          <>
            <h2>Trailer em: {dublados ? 'Português' : 'Inglês'}</h2>
            <iframe
              width="560"
              height="315"
              allowFullScreen={true}
              id="ytplayer"
              typeof="text/html"
              className={styles.iframe}
              src={`https://www.youtube.com/embed/${
                dublados ? dublados?.[0]?.key : dataEnUS?.results?.[0]?.key
              }?rel=0&controls=1&volume=10`}
            />
          </>
        )}
      </motion.div>
    </div>
  )

  if (!isOpen) return <></>

  // @ts-ignore
  return createPortal(content, document.getElementById('root'))
}
