import Header from './components/Header/Header';
import CardsList from './components/CardsList/CardsList';
import {useFetchCards} from './hooks/useFetchAllCards';
import Footer from './components/Footer/Footer';
import Loading from './components/Loading/Loading';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';

function App() {
    const [ isLoading, error, allCards ] = useFetchCards();
    
    return (
        <>
            <Header />
            {isLoading ? (
                <Loading />
            ) : (
                <CardsList allCards={allCards} />
            )}
            {error && <ErrorMessage errorLabel={error} />}
            <Footer />
        </>
    );
}

export default App;