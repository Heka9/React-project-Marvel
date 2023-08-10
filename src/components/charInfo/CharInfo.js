import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import useMarvelService from '../../services/MarvelService'
import setContent from '../../utils/setContent'

import './charInfo.scss'

const CharInfo = (props) => {
   const [char, setChar] = useState(null)

   const { getCharacter, clearError, process, setProcess } = useMarvelService()

   useEffect(() => {
      updateChar()
   }, [props.charId])

   const updateChar = () => {
      const { charId } = props
      if (!charId) {
         return
      }

      clearError()
      getCharacter(charId)
         .then(onCharLoaded)
         .then(() => setProcess('confirmed'))
   }

   const onCharLoaded = (char) => {
      setChar(char)
   }

   return <div className="char__info">{setContent(process, View, char)}</div>
}

const View = ({ data }) => {
   const { name, description, thumbnail, homepage, wiki, comics } = data

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
