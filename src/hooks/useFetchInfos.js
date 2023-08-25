import { useEffect, useState } from 'react';
import { getInfos } from '../apis/cards';

export function useFetchInfos () {
    const [cardsInfos, setCardsInfos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancel = false;

        async function fetchData() {
            try {
                setIsLoading(true);
                if (!cancel) {
                    const fetchedInfos = await getInfos(),
                        newfilterKeys = {
                            'classes' : 'playerClass',
                            'factions' : 'faction',
                            'qualities' : 'rarity',
                            'races' : 'race',
                            'sets' : 'cardSet',
                            'types' : 'type',
                            'cost' : ['0','1','2','3','4','5','6','7','8','9','10','11'],
                            'attack' : ['0','1','2','3','4','5','6','7','8'],
                            'health' : ['1','2','3','4','5','6','7','8','9']
                        };
            
                    let filteredInfos = {};
                
                    Object.entries(newfilterKeys).forEach(key => {
                        if (fetchedInfos[key[0]]) {
                            const cleanedInfos = [...new Set(fetchedInfos[key[0]])];
                            filteredInfos[key[1]] = cleanedInfos;
                        }
                        else {
                            filteredInfos[key[0]] = key[1];
                        }
                    });

                    setCardsInfos(filteredInfos);
                }
            } catch (e) {
                setError('Erreur');
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

    return [isLoading, error, cardsInfos];
}