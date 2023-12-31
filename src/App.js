import Header from './components/Header/Header';
import CardsList from './components/CardsList/CardsList';
import {useFetchCards} from './hooks/useFetchAllCards';
import Footer from './components/Footer/Footer';
import Loading from './components/Loading/Loading';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import { randomNumber } from './components/Helpers';

function App() {
    const [ isLoading, error, allCards ] = useFetchCards(),
        backCards = require.context('./assets/img/back-cards/', true),
        backCardsList = backCards.keys().map(backCard => backCards(backCard)),
        randombackCard = `url(${backCardsList[randomNumber(1, 232)]})`;

    return (
        <>
            <Header />
            {error ? (
                <ErrorMessage errorLabel={error} />
            ) : (
                isLoading ? (
                    <Loading />
                ) : (
                    <CardsList randombackCard={randombackCard} allCards={allCards} />
                )
            )}
            <Footer />
        </>
    );
}

export default App;