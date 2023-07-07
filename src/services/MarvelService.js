class MarvelService {
   _apiBase = 'https://gateway.marvel.com:443/v1/public/'
   _apiKey = 'apikey=e86591788d711f875b3cf193ec08cc92'
   _baseOffset = 350

   getResource = async (url) => {
      let response = await fetch(url)

      if (!response.ok) {
         throw new Error(`Could not fetch ${url}, status: ${response.status}`)
      }

      return await response.json()
   }

   getAllCharacters = async (offset = this._baseOffset) => {
      const result = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`)
      return result.data.results.map(this._fransformCharacter)
   }

   getCharacter = async (id) => {
      const result = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
      return this._fransformCharacter(result.data.results[0])
   }

   _fransformCharacter = (res) => {
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
}

export default MarvelService
