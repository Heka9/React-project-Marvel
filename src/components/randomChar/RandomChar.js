import { Component } from 'react'
import Spinner from '../../spinner/Spinner'
import ErrorMessage from '../errorMessage/errorMessage'
import MarvelService from '../../services/MarvelService'
import './randomChar.scss'
import mjolnir from '../../resources/img/mjolnir.png'

class RandomChar extends Component {
   state = {
      char: { name: null, description: null, thumbnail: null, homepage: null, wiki: null },
      loading: true,
      error: false,
   }

   marvelServise = new MarvelService()

   componentDidMount() {
      this.updateChar()
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

   updateChar = () => {
      const id = 1011000 + Math.floor(Math.random() * (1011400 - 1011000 + 1))
      this.onCharLoading()
      this.marvelServise.getCharacter(id).then(this.onCharLoaded).catch(this.onError)
   }

   render() {
      const { char, loading, error } = this.state

      return (
         <div className="randomchar">
            {loading ? <Spinner /> : error ? <ErrorMessage /> : <View char={char} />}
            <div className="randomchar__static">
               <p className="randomchar__title">
                  Random character for today!
                  <br />
                  Do you want to get to know him better?
               </p>
               <p className="randomchar__title">Or choose another one</p>
               <button className="button button__main" onClick={this.updateChar}>
                  <div className="inner">try it</div>
               </button>
               <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
         </div>
      )
   }
}
const View = ({ char }) => {
   const { name, description, thumbnail, homepage, wiki } = char

   const classes = thumbnail.includes('image_not_available')
      ? 'randomchar__img randomchar__img_contain'
      : 'randomchar__img randomchar__img_cover'

   return (
      <div className="randomchar__block">
         <img src={thumbnail} alt="Random character" className={classes} />
         <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">{description}</p>
            <div className="randomchar__btns">
               <a href={homepage} className="button button__main">
                  <div className="inner">homepage</div>
               </a>
               <a href={wiki} className="button button__secondary">
                  <div className="inner">Wiki</div>
               </a>
            </div>
         </div>
      </div>
   )
}
export default RandomChar
