import React, { useEffect, useState } from "react";
import ClientOnly from "./ClientOnly";
import ChevronDown from "./svg/ChevronDown";
import * as styles from "../styles/MobileMenu.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "../public/firebase/firebase";
import { signOut } from "firebase/auth";
import Socials from "./Socials";
import { useTranslations } from "next-intl";

const MobileMenu = (props) => {
  const [animate, setAnimate] = useState(false);
  const tNav = useTranslations("nav");
  const tHeader = useTranslations("header");

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

  const switchLocale = (nextLocale) => {
    router.push(
      { pathname: router.pathname, query: router.query },
      router.asPath,
      { locale: nextLocale },
    );
  };

  return (
    <div
      className={`${styles.mobileMenu} ${animate ? styles.mobileMenuOpen : ""}`}
    >
      <nav className={`${styles.mobileNav} [ stack ]`}>
        <ul onClick={closeMenu} className="stack">
          <li>
            <Link href={"/"}>{tNav("gallery")}</Link>
          </li>
          <li>
            <Link href={"/about"}>{tNav("about")}</Link>
          </li>
          <li>
            <Link href={"/contact"}> {tNav("contact")}</Link>
          </li>
          {/* Language toggle (SR/EN) */}
          <li className=" language-toggle">
            <button
              type="button"
              className="[ button-ghost ]"
              onClick={() => switchLocale("sr")}
              aria-label={tHeader("languageSr")}
              disabled={router.locale === "sr"}
            >
              {tHeader("languageSr")}
            </button>
            <button
              type="button"
              className="[ button-ghost ]"
              onClick={() => switchLocale("en")}
              aria-label={tHeader("languageEn")}
              disabled={router.locale === "en"}
            >
              {tHeader("languageEn")}
            </button>
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
