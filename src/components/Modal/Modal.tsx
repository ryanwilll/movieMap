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
  const [dublados, setDublados] = useState<any>()

  //! Chamar a API aqui
  const { data: dataPtBR } = useFetch(
    `/${type == 'serie' ? 'tv' : 'movie'}/${item_id}/videos?language=pt-BR&append_to_response=videos`
  )
  const { data: dataEnUS } = useFetch(
    `/${type == 'serie' ? 'tv' : 'movie'}/${item_id}/videos?language=pt-BR&append_to_response=videos`
  )

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

  const content = (
    <div className={styles.modal} onClick={closeModal}>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className={styles.modal_container}>
        {dublados?.[0] && !dataEnUS?.results ? (
          <h1 className={styles.modal_notfound}>Não foi possível encontrar um trailer.</h1>
        ) : (
          <>
            <h2>Trailer em: {dublados?.[0] ? 'Português' : 'Inglês'}</h2>
            <iframe
              className={styles.iframe}
              src={`https://www.youtube.com/embed/${
                dublados?.[0] ? dublados?.[0]?.key : dataEnUS?.results?.[0]?.key
              }?si=Bz5t4-fuIGcRbOJI`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen={true}></iframe>
          </>
        )}
      </motion.div>
    </div>
  )

  if (!isOpen) return <></>

  // @ts-ignore
  return createPortal(content, document.getElementById('root'))
}
