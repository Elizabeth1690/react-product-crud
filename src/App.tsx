import { useRoutes, BrowserRouter } from 'react-router-dom';
import { ProductProvider } from './contexts/ProductContext';
import Home from './page/Home';

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Home /> },
  ]);
  return routes;
};

const App = () => {
  return (
    <div className='container mx-auto'>
      <ProductProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ProductProvider>
    </div>
  );
};

export default App;
