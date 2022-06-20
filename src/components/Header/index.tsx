import styles from './styles.module.scss'
import { SigninButton } from '../SigninButton'
import { ActiveLink } from '../ActiveLink'


export function Header() {

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src='/images/logo.svg' alt="Ig News" />
                <nav>
                    <ActiveLink href='/' activeClassName={styles.active}>
                        <a>Home</a>
                    </ActiveLink>

                    <ActiveLink href='/posts' activeClassName={styles.active}>
                        <a>Posts</a>
                    </ActiveLink>
                </nav>

                <SigninButton />
            </div>
        </header>
    )
}