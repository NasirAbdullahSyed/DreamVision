import React from 'react'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import { logo } from './assets'
import { Home, CreatePost } from './pages'
import { StarsCanvas } from './components'
// #1BFD00
const Header = () => {
  const location = useLocation();

  return (
    <header className='w-full flex justify-between items-center sm:px-8 px-4 py-4 border-b border-transparent'>
      <Link to='/'>
        <img src={logo} alt="logo" className='w-[600px] object-contain'/>
      </Link>
      <Link to={location.pathname === '/' ? '/create-post' : '/'}
            className=" font-inter font-extrabold bg-[#0096c7] text-black px-4 py-2 rounded-md text-lg">
        {location.pathname === '/' ? 'Create' : 'Home'}
      </Link>
    </header>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0'>
        <Header />
        <main className='sm:p-8 px-4 py-8 w-full text-[#0096c7] min-h-[calc(100vh - 73px)]'>
        
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/create-post" element={<CreatePost/>}/>
          </Routes>
        </main>
        <StarsCanvas/>
      </div>
    </BrowserRouter>
  )
}

export default App
