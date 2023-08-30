import {useFetchInfos} from '../../hooks/useFetchInfos';
import styles from './Filter.module.scss';
import Loading from '../Loading/Loading';
import { useState } from 'react';

function Filter({sortFilters, setSortFilters, fuseSearch, resetItemsToShow}) {
    const[isLoading, error, filterTypes] = useFetchInfos(),
        [inputValue, setInputValue] = useState(''),
        keysTitlesObject = {
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

    function updateFilter(e) {
        resetItemsToShow();
        const newFilter = {};
        newFilter[e.target.name] = e.target.value;
        setSortFilters({...sortFilters, ...newFilter});
    }

    function resetValue(valueName) {
        resetItemsToShow();
        if (valueName === 'allFilters') {
            resetSearchByName();
            setSortFilters({});
            return;
        }
        setSortFilters((filters) => Object.fromEntries(Object.entries(sortFilters).filter((filter) => filter[0] !== valueName)));
    }

    function resetSearchByName() {
        setInputValue('');
        fuseSearch({'target': {'value': ''}});
    }

    function handleInputValue(e) {
        e.stopPropagation();
        setInputValue(e.target.value);
        fuseSearch(e);
    }

    return (
        <section className={`d-flex flex-row align-items-center ${styles.cardFilters}`}>
            <>
                {isLoading ? (
                    <Loading />
                ) : (
                    <>
                        {(Object.entries(sortFilters).length > 1 || (Object.entries(sortFilters).length > 0 && inputValue.length > 0) ) &&
                            <i onClick={() => resetValue('allFilters')} className="icon fa-solid fa-circle-xmark"></i>
                        }
                        <ul className='d-flex flex-row flex-wrap'>
                            {Object.entries(filterTypes).map((filterType, i) => keysTitlesObject.hasOwnProperty(filterType[0]) && 
                            <li className='d-flex flex-row align-items-center' key={i}>
                                <select onChange={(e) => updateFilter(e)} value={sortFilters[filterType[0]] || 'none'} name={filterType[0]}>
                                    <option disabled value='none'>{keysTitlesObject[filterType[0]]}</option>
                                    {filterType[1].map((value, i) => 
                                        <option key={i} value={value}>{value}</option>)
                                    }
                                </select>
                                {sortFilters[filterType[0]] &&
                                    <i onClick={() => resetValue(filterType[0])} className="icon fa-solid fa-circle-xmark"></i>
                                }
                            </li>
                            )}
                            <li>
                                <input type="text" onChange={handleInputValue} value={inputValue} placeholder='Recherche par nom' />
                                {inputValue.length > 0 &&
                                <i onClick={resetSearchByName} className="icon fa-solid fa-circle-xmark"></i>
                                }
                            </li>
                        </ul>
                    </>
                )}
                {error && <p>{error}</p>}
            </>
        </section>
    );
}

export default Filter;