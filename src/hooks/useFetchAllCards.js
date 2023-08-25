import { useEffect, useState } from 'react';
import { getAllCards } from '../apis/cards';

export function useFetchCards() {
    const [allCards, setAllCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancel = false;
        
        async function fetchData() {
            try {
                setIsLoading(true);
                if (!cancel) {
                    const fetchedCards = await getAllCards('?locale=frFR');
                    const allSortedCards = [];
                    Object.entries(fetchedCards)
                        .filter((cardSet) => (cardSet[1].length))
                        .map((filteredCardSet) => filteredCardSet[1])
                        .forEach((cards) => (
                            cards.forEach((card) => {
                                card.img && allSortedCards.push(card);
                            })
                        ));
                    allSortedCards.forEach(cards => {
                        
                    });
                    setAllCards((x) => [...x, ...allSortedCards]);
                }
            } catch (e) {
                setError(e);
            } finally {
                if (!cancel) {
                    setIsLoading(false);
                }
            }
        }
        fetchData();
    
        return () => {
            cancel = true;
        };
    }, []);

    return [isLoading, error, allCards];
}