import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// COMPONENT IMPORTS
import { UserRepository } from 'pages/UserRepository/UserRepository';
import { Footer } from 'widgets/Footer';
import { Navigation } from 'widgets/Navigation';
import { Error404 } from 'pages/Error404/Error404';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Main } from 'pages/Main';
const App = () => {
    const queryClient = new QueryClient();

    return (
        <div className='App'>
            <HelmetProvider>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Page title</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                </Helmet>
                <QueryClientProvider client={queryClient}>
                    <Router>
                        <Navigation />
                        <Routes>
                            <Route
                                path='/'
                                element={<Main />}
                            />
                            {/* COMPONENT ROUTES */}
                            <Route path='/:username' element={<UserRepository />} />
                            <Route path='*' element={<Error404 />} />
                        </Routes>
                        <Footer />
                    </Router>
                </QueryClientProvider>
            </HelmetProvider>
        </div>
    );
};

export default App;