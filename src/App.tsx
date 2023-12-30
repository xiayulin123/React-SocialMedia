import './globals.css';
import {Routes, Route, Router} from 'react-router-dom'
const App = () => {
  return (
    <main className='flex h-screen '>
        <Routes>
            {/* {public routes} */}
            <Router path="/sign-in" element={<SigninForm/> } />
            {/* {private routes} */}
            <Route index element= {<Home/>} />
        </Routes>
    </main>
  )
}

export default App