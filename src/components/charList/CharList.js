import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MarvelService from '../../services/MarvelService'
import Spinner from '../../spinner/Spinner'
import ErrorMessage from '../errorMessage/errorMessage'
import './charList.scss'

class CharList extends Component {
   myRefs = []

   state = {
      charList: [],
      loading: true,
      error: false,
      newItemLoading: false,
      offset: 1550,
      charEnded: false,
   }

   marvelServise = new MarvelService()

   componentDidMount() {
      this.onReqest()
   }

   onReqest = (offset) => {
      this.onCharListLoading()
      this.marvelServise.getAllCharacters(offset).then(this.onLoadedCharacters).catch(this.onError)
   }

   onCharListLoading = () => {
      this.setState({ newItemLoading: true })
   }

   onLoadedCharacters = (data) => {
      let ended = false
      if (data.length < 9) {
         ended = true
      }

      this.setState(({ offset, charList }) => ({
         charList: [...charList, ...data],
         loading: false,
         error: false,
         newItemLoading: false,
         offset: offset + 9,
         charEnded: ended,
      }))
   }
   onError = () => {
      this.setState({
         loading: false,
         error: true,
      })
   }

   setRef = (ref) => {
      this.myRefs.push(ref)
   }

   onItemClick = (id) => {
      this.myRefs.forEach((item) => item.classList.remove('char__item_selected'))
      this.myRefs[id].classList.add('char__item_selected')
      this.myRefs[id].focus()
   }

   renderItems(array) {
      const items = array.map((item, index) => {
         let styles = { objectFit: 'cover' }

         if (item.thumbnail.includes('image_not_available')) {
            styles = { objectFit: 'contain' }
         }

         return (
            <li
               ref={this.setRef}
               tabIndex={0}
               className="char__item"
               key={item.id}
               onClick={() => {
                  this.props.onCharSelected(item.id)
                  this.onItemClick(index)
               }}
               onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                     this.props.onCharSelected(item.id)
                     this.onItemClick(index)
                  }
               }}
            >
               <img src={item.thumbnail} alt={item.name} style={styles} />
               <div className="char__name">{item.name}</div>
            </li>
         )
      })
      return <ul className="char__grid">{items}</ul>
   }

   render() {
      const { charList, loading, error, newItemLoading, offset, charEnded } = this.state

      return (
         <div className="char__list">
            {loading ? <Spinner /> : error ? <ErrorMessage /> : this.renderItems(charList)}
            <button
               ref={this.myRef}
               disabled={newItemLoading}
               onClick={() => this.onReqest(offset)}
               className="button button__main button__long"
               style={{ display: charEnded ? 'none' : 'block' }}
            >
               <div className="inner">load more</div>
            </button>
         </div>
      )
   }
}

CharList.propTypes = {
   onCharSelected: PropTypes.func,
}

export default CharList
