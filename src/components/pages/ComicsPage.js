import { Helmet } from 'react-helmet'
import AppBanner from '../appBanner/AppBanner'
import ComicsLis from '../comicsList/ComicsList'

const ComicsPage = () => {
   return (
      <>
         <Helmet>
            <meta name="description" content="Page with different comics" />
            <title>Comics page</title>
         </Helmet>
         <AppBanner />
         <ComicsLis />
      </>
   )
}

export default ComicsPage
