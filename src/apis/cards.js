const CARDS_API = 'https://omgvamp-hearthstone-v1.p.rapidapi.com',
    headers = {
        'X-RapidAPI-Key': process.env.REACT_APP_AUTH_TOKEN,
        'X-RapidAPI-Host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
    };

export async function getInfos() {
    const response = await fetch(
        `${CARDS_API}/info`,
        {
            headers
        }
    );
    if (response.ok) {
        const cardsInfos = await response.json();
        return cardsInfos;
    } else {
        throw new Error('Une erreur est survenue pendant la récupération des données.');
    }
}

export async function getAllCards(localeParam) {
    const response = await fetch(
        `${CARDS_API}/cards${localeParam}`,
        {
            headers
        }
    );
    if (response.ok) {
        const cardsData = await response.json();
        return cardsData;
    } else {
        throw new Error('Une erreur est survenue pendant la récupération des données.');
    }
}