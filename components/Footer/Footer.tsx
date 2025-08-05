import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={styles.wrap}>
          <p>Developer: Lais Shamukh</p>
          <p>
            Contact us:{' '}
            <a href="mailto:lithshamok@gmail.com" className={styles.link}>
              lithshamok@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
