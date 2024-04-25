import React, { useEffect, useState } from "react";
import ClientOnly from "./ClientOnly";
import ChevronDown from "./svg/ChevronDown";
import * as styles from "../styles/MobileMenu.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "../public/firebase/firebase";
import { signOut } from "firebase/auth";
import Socials from "./Socials";

const MobileMenu = (props) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    props.isOpen
      ? setTimeout(() => {
          setAnimate(true);
        }, 200)
      : setTimeout(() => {
          setAnimate(false);
        }, 200);
  }, [props.isOpen]);

  const router = useRouter();
  const logoutHandler = () => {
    router.push("/");
    setTimeout(() => {
      signOut(auth)
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    }, 500);
  };

  const closeMenu = () => {
    props.close(true);
  };

  return (
    <div
      className={`${styles.mobileMenu} ${animate ? styles.mobileMenuOpen : ""}`}
    >
      <nav className={`${styles.mobileNav} [ stack ]`}>
        <ul onClick={closeMenu} className="stack">
          <li>
            <Link href={"/"}>Slike</Link>
          </li>
          <li>
            <Link href={"/about"}>O nama</Link>
          </li>
          <li>
            <Link href={"/contact"}>Kontakt</Link>
          </li>
          <li>
            <ClientOnly>
              {props.user && (
                <div className={styles.authorMenu}>
                  <ul className="[ stack ]">
                    <li>
                      <Link href={"/autor"}>Radionica</Link>
                    </li>
                    <li>
                      <button onClick={logoutHandler} className="[ button ]">
                        Odjavi se
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </ClientOnly>
          </li>
        </ul>
      </nav>
      <div className={`${styles.mobileNavFooter} [ wrap ]`}>
        <Socials></Socials>
        <div className="logo" href={"/"}>
          BoJe<span className="main-color">Art</span>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
