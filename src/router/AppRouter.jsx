import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Main from '../pages/Main'
import Login from '../pages/Login'
import Register from '../pages/Register'
import MovieDetails from '../pages/MovieDetails'
import PrivateRouter from './PrivateRouter'

const AppRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="" element={<PrivateRouter />}>
          <Route path="/details/:movieId" element={<MovieDetails />} />
        </Route>
    </Routes>
  )
}

export default AppRouter