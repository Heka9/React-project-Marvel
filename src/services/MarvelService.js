import { useHttp } from '../hooks/http.hook'

const useMarvelService = () => {
   const { loading, error, request, clearError } = useHttp()

   const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
   const _apiKey = 'apikey=e86591788d711f875b3cf193ec08cc92'
   const _baseOffset = 350

   const getAllCharacters = async (offset = _baseOffset) => {
      const result = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
      return result.data.results.map(_fransformCharacter)
   }

   const getCharacter = async (id) => {
      const result = await request(`${_apiBase}characters/${id}?${_apiKey}`)
      return _fransformCharacter(result.data.results[0])
   }

   const _fransformCharacter = (res) => {
      return {
         id: res.id,
         name: res.name,
         description: res.description ? res.description : 'Description not found',
         thumbnail: `${res.thumbnail.path}.${res.thumbnail.extension}`,
         homepage: res.urls[0].url,
         wiki: res.urls[1].url,
         comics: res.comics.items,
      }
   }

   return { loading, error, getAllCharacters, getCharacter, clearError }
}

export default useMarvelService
