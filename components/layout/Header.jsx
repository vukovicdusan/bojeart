import { useContext, React, useState, useEffect } from "react";
import Wrapper from "./Wrapper";
import * as styles from "../../styles/Header.module.css";
import Link from "next/link";
import LoginContext from "../../store/LoginCtx";
import Router, { useRouter } from "next/router";
import { auth } from "../../public/firebase/firebase";
import { signOut } from "firebase/auth";
import ChevronDown from "../svg/ChevronDown";
import ClientOnly from "../ClientOnly";
import MobileMenu from "../MobileMenu";
import Loader from "../Loader";
import { useTranslations } from "next-intl";

const Header = () => {
  const tNav = useTranslations("nav");
  const tHeader = useTranslations("header");

  const [menuOpen, setMenuOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const loginContext = useContext(LoginContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    menuOpen
      ? (document.body.style.overflow = "hidden") &&
        setTimeout(() => {
          setAnimate(true);
        }, 200)
      : (document.body.style.overflow = "auto") &&
        setTimeout(() => {
          setAnimate(false);
        }, 400);
  }, [menuOpen]);

  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  const router = useRouter();

  const logoutHandler = () => {
    router.push("/");
    setTimeout(() => {
      signOut(auth).catch((error) => console.log(error));
    }, 500);
  };

  const menuOpenHandler = () => {
    setMenuOpen((prev) => !prev);
  };

  const menuCloseHandler = () => {
    setMenuOpen(false);
  };

  const author = loginContext.user === "jelena@gmail.com" ? "jelena" : "bojan";

  // Locale switch: keep the same route + query, just change locale
  //   const switchLocale = (nextLocale) => {
  //     router.push(router.pathname, router.asPath, { locale: nextLocale });
  //   };
  const switchLocale = (nextLocale) => {
    router.push(
      { pathname: router.pathname, query: router.query },
      router.asPath,
      { locale: nextLocale },
    );
  };

  return (
    <div>
      {loading ? (
        <div className="full-loader">
          <Loader />
        </div>
      ) : null}

      {animate ? (
        <MobileMenu
          isOpen={menuOpen}
          user={loginContext.user}
          close={menuCloseHandler}
        />
      ) : (
        ""
      )}

      <header className={styles.header}>
        <Wrapper>
          <div className="wrap">
            <Link className="logo" href={"/"}>
              BoJe<span className="main-color">Art</span>
            </Link>

            <nav className={styles.desktopNav}>
              <ul className="wrap">
                <li>
                  <Link className={styles.navbarLink} href={"/"}>
                    {tNav("gallery")}
                  </Link>
                </li>
                <li>
                  <Link className={styles.navbarLink} href={"/about"}>
                    {tNav("about")}
                  </Link>
                </li>
                <li>
                  <Link className={styles.navbarLink} href={"/contact"}>
                    {tNav("contact")}
                  </Link>
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
                    {loginContext.user && (
                      <div className="dropdown-toggle">
                        <span className="[ with-icon ] [ bold ]">
                          <ChevronDown className="icon" />
                          {author}
                        </span>
                        <ul className="[ dropdown-menu ] [ stack ] [ box ]">
                          <li>
                            <Link href={"/autor"}>{tHeader("workshop")}</Link>
                          </li>
                          <li>
                            <button
                              onClick={logoutHandler}
                              className="button"
                              type="button"
                            >
                              {tHeader("logout")}
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </ClientOnly>
                </li>
              </ul>
            </nav>

            <button
              onClick={menuOpenHandler}
              className={`${styles.hamburger} [ button-ghost ]`}
              aria-label={tHeader("openMenuAria")}
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="hamburger-svg"
                style={{
                  transition: "all .4s ease-in-out",
                  width: 32 + "px",
                  height: 32 + "px",
                  transform: menuOpen ? "rotate(225deg)" : "rotate(0deg)",
                }}
              >
                <line
                  id="top-line"
                  x1="4.8"
                  y1="9.6"
                  x2="27.2"
                  y2="9.6"
                  stroke="var(--text-primary)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  style={{
                    transition: "all .4s ease-in-out",
                    transform: menuOpen
                      ? "rotate(-90deg) translate(-29px, 7px)"
                      : "rotate(0deg)",
                  }}
                />
                <line
                  id="bottom-line"
                  x1="27.2"
                  y1="22.4"
                  x2="4.8"
                  y2="22.4"
                  stroke="var(--text-primary)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  style={{
                    transition: "all .4s ease-in-out",
                    transform: menuOpen
                      ? "rotate(0deg) translate(0,-9px)"
                      : "rotate(0deg)",
                  }}
                />
              </svg>
            </button>
          </div>
        </Wrapper>
      </header>
    </div>
  );
};

export default Header;
