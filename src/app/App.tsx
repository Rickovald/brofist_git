import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// COMPONENT IMPORTS
import { UserRepositories } from 'pages/UserRepositories';
import { Navigation } from 'widgets/Navigation';
import { Error404 } from 'pages/Error404';
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
                            {/*
                                //! В тз написано что нужно http://app.app/{username}
                                //! Но в случае вероятного расширения так лучше не делать
                                //! потому что любая несуществующая ссылка будет считаться
                                //! За страницу чьего-то репозитория, поэтому я выбрал /repos/:username
                            */}
                            <Route path='/repos/:username' element={<UserRepositories />} />
                            <Route path='/repos/:username?repo' element={<UserRepositories />} />
                            <Route path='*' element={<Error404 />} />
                        </Routes>
                    </Router>
                </QueryClientProvider>
            </HelmetProvider>
        </div>
    );
};

export default App;