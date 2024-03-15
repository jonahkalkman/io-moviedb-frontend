import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import { MovieProvider } from './contexts/MovieContext';
import MainRouter from './components/organisms/MainRouter';
import Header from './components/organisms/Header';
import Sidebar from './components/organisms/Sidebar';

const App = () => {
  return (
    <Router>
      <MovieProvider>
        <div className="min-h-full">
          <Header />
          <div className="py-10">
            <div className="mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
              <div className="px-4 md:px-0 lg:col-span-3 lg:block xl:col-span-2">
                <Sidebar />
              </div>
              <main className="lg:col-span-9">
                <MainRouter />
              </main>
            </div>
          </div>
        </div>
      </MovieProvider>
    </Router>
  );
};

export default App;
