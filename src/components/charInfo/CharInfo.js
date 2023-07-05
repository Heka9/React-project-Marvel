import { Component } from 'react'
import PropTypes from 'prop-types'

import ErrorMessage from '../errorMessage/errorMessage'
import Spinner from '../../spinner/Spinner'
import MarvelService from '../../services/MarvelService'
import Skeleton from '../skeleton/Skeleton'
import './charInfo.scss'

class CharInfo extends Component {
   state = {
      char: null,
      loading: false,
      error: false,
   }

   marvelServise = new MarvelService()

   componentDidMount() {
      this.updateChar()
   }

   componentDidUpdate(prevProps) {
      if (this.props.charId !== prevProps.charId) {
         this.updateChar()
      }
   }

   updateChar = () => {
      const { charId } = this.props
      if (!charId) {
         return
      }

      this.onCharLoading()
      this.marvelServise.getCharacter(charId).then(this.onCharLoaded).catch(this.onError)
   }

   onCharLoading = () => {
      this.setState({
         loading: true,
         error: false,
      })
   }

   onCharLoaded = (char) => {
      this.setState({
         char,
         loading: false,
         error: false,
      })
   }

   onError = () => {
      this.setState({
         loading: false,
         error: true,
      })
   }

   render() {
      const { char, loading, error } = this.state

      if (!this.props.charId) {
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

// CharInfo.propTypes = {
//    charId: PropTypes.number.isRequired,
// }

export default CharInfo
