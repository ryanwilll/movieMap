import { createPortal } from 'react-dom'
import { useEffect } from 'react'
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
  const { data } = useFetch(`/${type}/${item_id}/videos?language=pt-BR`)

  console.log(data)

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
        {!data?.results ? (
          <h1>Não foi possível encontrar um trailer em PT-BR</h1>
        ) : (
          <iframe
            allowFullScreen={true}
            id="ytplayer"
            typeof="text/html"
            className={styles.iframe}
            src={`https://www.youtube.com/embed/${data.results?.[0]?.key}`}
          />
        )}
      </motion.div>
    </div>
  )

  if (!isOpen) return <></>

  // @ts-ignore
  return createPortal(content, document.getElementById('root'))
}
