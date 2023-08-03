import ErrorMessage from '../errorMessage/errorMessage'
import { Link } from 'react-router-dom'

const Page404 = () => {
   return (
      <main>
         <div>
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
