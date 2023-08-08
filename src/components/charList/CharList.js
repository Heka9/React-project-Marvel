import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import useMarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/errorMessage'
import './charList.scss'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const CharList = (props) => {
   const [charList, setCharList] = useState([])
   const [newItemLoading, setNewItemLoading] = useState(false)
   const [offset, setOffset] = useState(350)
   const [charEnded, setCharEnded] = useState(false)

   const { loading, error, getAllCharacters } = useMarvelService()

   const duration = 400

   useEffect(() => {
      onRequest(offset, true)
   }, [])

   useEffect(() => {
      window.addEventListener('scroll', onScroll)
      return () => window.removeEventListener('scroll', onScroll)
   })

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

   const onRequest = (offset, initialRequest) => {
      initialRequest ? setNewItemLoading(false) : setNewItemLoading(true)
      getAllCharacters(offset).then(onLoadedCharacters)
   }

   const onLoadedCharacters = (data) => {
      let ended = false
      if (data.length < 9) {
         ended = true
      }

      setCharList((charList) => [...charList, ...data])

      setNewItemLoading(false)
      setOffset((offset) => offset + 9)
      setCharEnded(ended)
   }

   const myRefs = useRef([])

   const onItemClick = (id) => {
      myRefs.current.forEach((item) => item.classList.remove('char__item_selected'))
      myRefs.current[id].classList.add('char__item_selected')
      myRefs.current[id].focus()
   }

   const renderItems = (array) => {
      const items = array.map((item, index) => {
         let styles = { objectFit: 'cover' }

         if (item.thumbnail.includes('image_not_available')) {
            styles = { objectFit: 'contain' }
         }

         return (
            <CSSTransition timeout={duration} classNames="char__item" key={index}>
               <div
                  ref={(div) => (myRefs.current[index] = div)}
                  tabIndex={0}
                  className="char__item"
                  onClick={() => {
                     props.onCharSelected(item.id)
                     onItemClick(index)
                  }}
                  onKeyDown={(e) => {
                     if (e.key === ' ' || e.key === 'Enter') {
                        props.onCharSelected(item.id)
                        onItemClick(index)
                     }
                  }}
               >
                  <img src={item.thumbnail} alt={item.name} style={styles} />
                  <div className="char__name">{item.name}</div>
               </div>
            </CSSTransition>
         )
      })
      return <TransitionGroup className="char__grid">{items}</TransitionGroup>
   }

   return (
      <div className="char__list">
         {loading && !newItemLoading ? <Spinner /> : error ? <ErrorMessage /> : renderItems(charList)}
         <button
            disabled={newItemLoading}
            onClick={() => onRequest(offset)}
            className="button button__main button__long"
            style={{ display: charEnded ? 'none' : 'block' }}
         >
            <div className="inner">load more</div>
         </button>
      </div>
   )
}

CharList.propTypes = {
   onCharSelected: PropTypes.func.isRequired,
}

export default CharList
