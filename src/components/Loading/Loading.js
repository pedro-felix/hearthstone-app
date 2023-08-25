import loaderImg from '../../assets/img/loader.svg';
import styles from './Loading.module.scss';

function Loading() {
    return (
        <section className={`d-flex justify-content-center align-ittems-center ${styles.loading}`}>
            <img src={loaderImg} alt="Chargement en cours" />
        </section>
    );
}

export default Loading;
