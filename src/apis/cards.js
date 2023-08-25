const CARDS_API = 'https://omgvamp-hearthstone-v1.p.rapidapi.com',
    headers = {
        'X-RapidAPI-Key': '1578ff5a10msha72b327352e02b2p17cf2cjsn3f679bdf4eca',
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
        throw new Error('Error fetch cardsInfos');
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
        throw new Error('Error fetch cards');
    }
}