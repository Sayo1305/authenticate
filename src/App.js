import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MoviePage from './pages/MoviePage';
import WatchListPage from './pages/WatchListPage';

function App() {
  return (
    <div className="">
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/watchlist' element={<WatchListPage/>}/>
        <Route path='/movie/:id' element={<MoviePage/>}/>
      </Routes>
    </div>
  );
}

export default App;
