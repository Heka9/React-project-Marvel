import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import ErrorMessage from '../errorMessage/errorMessage'
import Spinner from '../spinner/Spinner'
import useMarvelService from '../../services/MarvelService'
import Skeleton from '../skeleton/Skeleton'
import './charInfo.scss'

const CharInfo = (props) => {
   const [char, setChar] = useState(null)

   const { loading, error, getCharacter, clearError } = useMarvelService()

   useEffect(() => {
      updateChar()
   }, [props.charId])

   const updateChar = () => {
      const { charId } = props
      if (!charId) {
         return
      }

      clearError()
      getCharacter(charId).then(onCharLoaded)
   }

   const onCharLoaded = (char) => {
      setChar(char)
   }

   if (!props.charId) {
      return (
         <div className="char__info">
            <Skeleton />
         </div>
      )
   } else {
      return (
         <div className="char__info">
            {loading ? <Spinner /> : error ? <ErrorMessage /> : char ? <View char={char} /> : null}
         </div>
      )
   }
}

const View = ({ char }) => {
   const { name, description, thumbnail, homepage, wiki, comics } = char

   let styles = { objectFit: 'cover' }

   if (thumbnail.includes('image_not_available')) {
      styles = { objectFit: 'contain' }
   }

   let comicsInner

   if (comics.length === 0) {
      comicsInner = 'Comics not found'
   } else if (comics.length > 10) {
      const newComics = comics.slice(0, 10)
      comicsInner = newComics.map((item, i) => {
         return (
            <li key={i} className="char__comics-item">
               {item.name}
            </li>
         )
      })
   } else {
      comicsInner = comics.map((item, i) => {
         return (
            <li key={i} className="char__comics-item">
               {item.name}
            </li>
         )
      })
   }

   return (
      <>
         <div className="char__basics">
            <img src={thumbnail} alt={name} style={styles} />
            <div>
               <div className="char__info-name">{name}</div>
               <div className="char__btns">
                  <a href={homepage} className="button button__main">
                     <div className="inner">homepage</div>
                  </a>
                  <a href={wiki} className="button button__secondary">
                     <div className="inner">Wiki</div>
                  </a>
               </div>
            </div>
         </div>
         <div className="char__descr">{description}</div>
         <div className="char__comics">Comics:</div>
         <ul className="char__comics-list">{comicsInner}</ul>
      </>
   )
}

CharInfo.propTypes = {
   charId: PropTypes.number,
}

export default CharInfo
