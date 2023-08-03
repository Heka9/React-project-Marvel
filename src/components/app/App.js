import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { MainPage, ComicsPage, SingleComicPage } from '../pages'
import Page404 from '../pages/404'
import Layout from '../Layout/Layout'

const App = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Layout />}>
               <Route index element={<MainPage />} />
               <Route path="comics" element={<ComicsPage />} />
               <Route path="comics/:comicId" element={<SingleComicPage />} />
            </Route>
            <Route path="*" element={<Page404 />} />
         </Routes>
      </BrowserRouter>
   )
}

export default App
