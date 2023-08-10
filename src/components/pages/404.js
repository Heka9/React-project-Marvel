import ErrorMessage from '../errorMessage/errorMessage'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const Page404 = () => {
   return (
      <main>
         <div>
            <Helmet>
               <meta name="description" content="This page is not found" />
               <title>This page is not found</title>
            </Helmet>
            <ErrorMessage />
            <div style={{ 'text-align': 'center', fontWeight: 'bold', fontSize: '28px' }}>
               <p>Page not found</p>
               <Link to="/" style={{ margin: '20px', textDecoration: 'underline' }}>
                  Back to main page
               </Link>
            </div>
         </div>
      </main>
   )
}

export default Page404
