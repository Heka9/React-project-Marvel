import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import useMarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/errorMessage'

import './comicsList.scss'

const setContent = (process, Component, newItemLoading) => {
   switch (process) {
      case 'waiting':
         return <Spinner />
         break
      case 'loading':
         return newItemLoading ? <Component /> : <Spinner />
         break
      case 'confirmed':
         return <Component />
         break
      case 'error':
         return <ErrorMessage />
         break
      default:
         throw new Error('Unexpected process state')
         break
   }
}

const ComicsList = () => {
   const [comicsList, setComicsList] = useState([])
   const [newItemLoading, setnewItemLoading] = useState(false)
   const [offset, setOffset] = useState(0)
   const [comicsEnded, setComicsEnded] = useState(false)

   const { loading, error, getAllComics, process, setProcess } = useMarvelService()

   const duration = 400

   useEffect(() => {
      onRequest(offset, true)
   }, [])

   useEffect(() => {
      window.addEventListener('scroll', onScroll)
      return () => window.removeEventListener('scroll', onScroll)
   })

   const onRequest = (offset, initial) => {
      initial ? setnewItemLoading(false) : setnewItemLoading(true)
      getAllComics(offset)
         .then(onComicsListLoaded)
         .then(() => setProcess('confirmed'))
   }

   const debounce = (fn, ms) => {
      return function () {
         setTimeout(() => fn.apply(this, arguments), ms)
      }
   }

   const onScroll = () => {
      if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
         debounce(onRequest(offset), 300)
      }
   }

   const onComicsListLoaded = (newComicsList) => {
      let ended = false
      if (newComicsList.length < 8) {
         ended = true
      }
      setComicsList([...comicsList, ...newComicsList])
      setnewItemLoading(false)
      setOffset(offset + 8)
      setComicsEnded(ended)
   }

   function renderItems(arr) {
      const items = arr.map((item, i) => {
         return (
            <CSSTransition timeout={duration} classNames="comics__item" key={i}>
               <Link to={`/comics/${item.id}`}>
                  <img src={item.thumbnail} alt={item.title} className="comics__item-img" />
                  <div className="comics__item-name">{item.title}</div>
                  <div className="comics__item-price">{item.price}</div>
               </Link>
            </CSSTransition>
         )
      })

      return <TransitionGroup className="comics__grid">{items}</TransitionGroup>
   }

   return (
      <div className="comics__list">
         {setContent(process, () => renderItems(comicsList), newItemLoading)}
         <button
            disabled={newItemLoading}
            style={{ display: comicsEnded ? 'none' : 'block' }}
            className="button button__main button__long"
            onClick={() => onRequest(offset)}
         >
            <div className="inner">load more</div>
         </button>
      </div>
   )
}

export default ComicsList
