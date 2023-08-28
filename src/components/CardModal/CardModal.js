import { forwardRef, useEffect } from 'react';
import styles from './CardModal.module.scss';

const CardModal = forwardRef(({ card, setTransitionModal}, ref) => {
    card = Object.entries(card)
        .sort(([,a],[,b]) => a-b)
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

    const keysTitlesObject = {
        'artist': 'Artiste',
        'rarity': 'Rareté',
        'type': 'Type',
        'race': 'Race',
        'playerClass': 'Classe',
        'cardSet': 'Paquet de cartes',
        'cost': 'Coût',
        'attack': 'Point(s) d\'attaque',
        'health': 'Point(s) de vie',
        'text': 'Description'
    };

    function closeModal() {
        setTransitionModal(false);
    }

    useEffect(() => {
        document.addEventListener('keydown', function(e) {
            if (e.code === 'Escape') setTransitionModal();
        });
    }, [setTransitionModal]);

    

    return (
        <section ref={ref} onClick={closeModal} className={`d-flex flex-column align-items-center justify-content-center ${styles.cardModal}`}>
            <i className="icon fa-solid fa-circle-xmark" onClick={closeModal}></i>
            <section onClick={(e) => e.stopPropagation()} className="d-flex flex-column align-items-center">
                <h2>{card.name}</h2>
                {card.flavor && <p>{card.flavor }</p>}
                <ul>
                    {Object.entries(card).map((stat, i) => keysTitlesObject.hasOwnProperty(stat[0]) && <li key={i} dangerouslySetInnerHTML={{__html: `<p>${keysTitlesObject[stat[0]]} :</p> <strong>${stat[1]}</strong>`}} />)}
                </ul>
            </section>
        </section>
    );
});

export default CardModal;