
import logo from '../../assets/img/blizzard-logo.svg';
import styles from './Footer.module.scss';

function Footer() {
    return (
        <footer className={`d-flex flex-column justify-content-center align-items-center ${styles.footer}`}>
            <img src={logo} alt="Blizzard Logo" />
            <p>
                {`${new Date().getFullYear()}© Blizzard Entertainment, Inc.`}
                <br />
                Coded by <a target="_blank" href='https://www.linkedin.com/in/pedro-felix-03b03962/' rel="noreferrer">Pedro Felix</a>
            </p>
        </footer>
    );
}

export default Footer;