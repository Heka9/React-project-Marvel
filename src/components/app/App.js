import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from '../Layout/Layout'
import Spinner from '../spinner/Spinner'

const Page404 = lazy(() => import('../pages/404'))
const MainPage = lazy(() => import('../pages/MainPage'))
const ComicsPage = lazy(() => import('../pages/ComicsPage'))
const SinglePage = lazy(() => import('../pages/SinglePage'))
const SingleComicPage = lazy(() => import('../pages/SingleComicPage/SingleComicPage'))
const SingleCharacterPage = lazy(() => import('../pages/SingleCharacterPage/SingleCharacterPage'))

const App = () => {
   return (
      <BrowserRouter>
         <Suspense fallback={<Spinner />}>
            <Routes>
               <Route path="/" element={<Layout />}>
                  <Route index element={<MainPage />} />
                  <Route path="comics" element={<ComicsPage />} />
                  <Route path="comics/:id" element={<SinglePage Component={SingleComicPage} dataType="comic" />} />
                  <Route
                     path="characters/:id"
                     element={<SinglePage Component={SingleCharacterPage} dataType="character" />}
                  />
                  <Route path="*" element={<Page404 />} />
               </Route>
            </Routes>
         </Suspense>
      </BrowserRouter>
   )
}

export default App
