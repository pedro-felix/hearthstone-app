import styles from './ErrorMessage.module.scss';

function ErrorMessage({errorLabel}) {
    return (
        <section className={`d-flex flex-column align-items-center error ${styles.error}`}>
            <label>{errorLabel}</label>
        </section>
    );
}

export default ErrorMessage;