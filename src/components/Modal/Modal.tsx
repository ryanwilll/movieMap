import { createPortal } from 'react-dom'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import useFetch from '../../hooks/useFetch'

import styles from './Modal.module.css'
import { IMovieDetails, IResponseTrailers, ISeriesDetails } from '../../types/IMoviesDetails'

type Props = {
  isOpen: boolean
  item_id: number
  type: string | undefined
  setIsOpen: Function
}

export const Modal = ({ isOpen, item_id, type, setIsOpen }: Props) => {
  //! Chamar a API aqui
  const { data: dataPtBR } = useFetch(`/${type == 'serie' ? 'tv' : 'movie'}/${item_id}/videos?language=pt-BR`)
  const { data: dataEnUS } = useFetch(`/${type == 'serie' ? 'tv' : 'movie'}/${item_id}/videos?language=en-US`)

  const trailersDublados = dataPtBR?.results.filter((item: IMovieDetails | ISeriesDetails | IResponseTrailers) => {
    if ((item as ISeriesDetails).name.toLowerCase().includes('dublado')) {
      return (item as ISeriesDetails).name.toLowerCase().includes('dublado')
    }
    ;(item as IResponseTrailers).iso_639_1.toLowerCase().includes('pt') &&
      (item as IResponseTrailers).iso_3166_1.toLowerCase().includes('br')
  })

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
      {trailersDublados && dataEnUS && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          onClick={(e) => e.stopPropagation()}
          className={styles.modal_container}>
          {trailersDublados?.[0] == undefined && dataEnUS!.results?.length <= 0 ? (
            <h1 className={styles.modal_notfound}>Não foi possível encontrar um trailer.</h1>
          ) : (
            <>
              <iframe
                className={styles.iframe}
                src={`https://www.youtube.com/embed/${
                  trailersDublados?.[0]?.key ? trailersDublados?.[0]?.key : dataEnUS?.results?.[0]?.key
                }?si=Bz5t4-fuIGcRbOJI&volume=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen={true}></iframe>
            </>
          )}
        </motion.div>
      )}
    </div>
  )

  if (!isOpen) return <></>

  // @ts-ignore
  return createPortal(content, document.getElementById('root'))
}
