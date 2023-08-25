import headerLogo from '../../assets/img/header_logo.avif';
import styles from './Header.module.scss';
function Header() {
    return <header className={`d-flex flex-row justify-content-center ${styles.headerContainer}`}>
        <img src={headerLogo} alt="" />
    </header>;
}

export default Header;