import { useRef, createRef, useState, useEffect } from 'react';
import styles from './CardsList.module.scss';
import Filter from '../Filter/Filter';
import CardModal from '../CardModal/CardModal';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { CSSTransition } from 'react-transition-group';
import Fuse from 'fuse.js';

function CardsList({randombackCard, allCards}) {
    let filteredCards,
        iteration = 30;

    const [itemsToShow, setitemsToShow] = useState(iteration),
        [sortFilters, setSortFilters] = useState({}),
        [showCardModal, setshowCardModal] = useState(null),
        refCards = useRef([]),
        [transitionModal, setTransitionModal] = useState(false),
        [transitionCard, setTransitionCard] = useState(true),
        modalRef = useRef(null),
        [searchResults, setSearchResults] = useState(allCards),
        fuseOptions = {
            includeScore: true,
            includeMatches: true,
            keys: ['name']
        },
        fuse = new Fuse(searchResults, fuseOptions);

    function fuseSearch(event) {
        const { value } = event.target;

        if (value.length === 0) {
            setSearchResults(allCards);
            return;
        }
    
        const results = fuse.search(value);
        const items = results.map((result) => result.item);
        setSearchResults(items);
    }

    filteredCards = searchResults;

    if(Object.entries(sortFilters).length) {
        Object.entries(sortFilters).forEach((filter) => {
            const filterKey = filter[0],
                filterValue = filter[1];
            
            filteredCards = searchResults.filter((card) => {
                if(filterValue.slice(-1) === '+') {
                    return (typeof card[filterKey] !== 'undefined' && card[filterKey] >= +filterValue.slice(0, -1));
                }
                else {
                    return (typeof card[filterKey] !== 'undefined' && card[filterKey].toString() === filterValue);
                }
            });
        });
    }

    refCards.current = searchResults.map((element, i) => refCards.current[i] ?? createRef());

    function flipCard(refCard) {
        const effectClassName = 'flip';
        refCards.current.forEach((r) => {
            (r.current && r.current !== refCard.current) && r.current.classList.remove(effectClassName);
        });
        refCard.current.classList.toggle(effectClassName);
    }

    function resetItemsToShow() {
        window.scrollTo({top:0});
        setitemsToShow(iteration);
    }

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (Math.ceil((window.innerHeight + window.scrollY) + 350) > document.body.offsetHeight) {
                if (itemsToShow < searchResults.length) {
                    setitemsToShow(itemsToShow + iteration);
                    setTransitionCard(() => true);
                }
            }
        });
        return () => window.removeEventListener('scroll', {});
    },[itemsToShow, iteration, searchResults]);

    return (
        <>
            {showCardModal && (
                <CSSTransition in={transitionModal} nodeRef={modalRef} timeout={500} classNames='modal' appear unmountOnExit>
                    <CardModal ref={modalRef} card={showCardModal} setTransitionModal={setTransitionModal} />
                </CSSTransition>
            )}
            <Filter sortFilters={sortFilters} setSortFilters={setSortFilters} fuseSearch={fuseSearch} resetItemsToShow={resetItemsToShow} />
            {Object.keys(filteredCards).length ? (
                <section id="cardsList" className={styles.cardsList}>
                    <ul className='d-flex flex-row align-items-center flex-wrap mb-50'>
                        {filteredCards.slice(0, itemsToShow).map((card, i) => (
                            <CSSTransition key={card.dbfId} in={transitionCard} nodeRef={refCards.current[i]} timeout={1500} classNames='card' appear>
                                <li className="mb-20" ref={refCards.current[i]} onClick={() => flipCard(refCards.current[i])} key={card.dbfId}>
                                    <i
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setshowCardModal(card);
                                            setTransitionModal(true);
                                        }}
                                        className="icon fa-icon fa-solid fa-circle-info"
                                    ></i>
                                    <img src={card.img} alt="{card.name}" />
                                    <div style={{backgroundImage: randombackCard}}>
                                    </div>
                                </li>
                            </CSSTransition>
                        ))}
                    </ul>
                </section>
            ) : (
                <ErrorMessage errorLabel="Pas de résultat" />
            )}
        </>
    );
}

export default CardsList;