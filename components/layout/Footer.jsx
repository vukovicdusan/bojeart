import React from "react";
import Wrapper from "./Wrapper";
import Region from "./Region";
import Splatter from "../svg/Splatter";
import Link from "next/link";
import * as styles from "../../styles/Footer.module.css";
import Socials from "../Socials";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Wrapper>
        <Region>
          <Splatter className="[ splatter ] [ splatter2 ]"></Splatter>
          <div>
            <nav>
              <ul className="stack">
                <li className={styles.footerNavLink}>
                  <Link href={"/"}>Slike</Link>
                </li>
                <li className={styles.footerNavLink}>
                  <Link href="/about">O nama</Link>
                </li>
                <li className={styles.footerNavLink}>
                  <a href="/contact">Kontakt</a>
                </li>
              </ul>
            </nav>
            <div className={`${styles.footerBottom} [ mr-bs-4 ] [ wrap ]`}>
              <Link className="logo" href={"/"}>
                <div>
                  BoJe<span className="main-color">Art</span>
                </div>
              </Link>
              <div>Terms of Use/Privacy Policy</div>
              <Socials></Socials>
            </div>
          </div>
        </Region>
      </Wrapper>
    </footer>
  );
};

export default Footer;
