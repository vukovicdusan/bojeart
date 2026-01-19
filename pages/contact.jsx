import React, { useState, useEffect } from "react";
import Head from "next/head";
import { sendContactForm } from "../lib/api";
import Loader from "../components/Loader";
import Region from "../components/layout/Region";
import Socials from "../components/Socials";

const Contact = () => {
  // const [hasMounted, setHasMounted] = useState(false);
  const [contactFormData, setContactFormData] = useState({});
  const [contactFormProccess, setContactFormProccess] = useState({
    success: false,
    error: false,
    loading: false,
  });

  // useEffect(() => {
  //   setHasMounted(true);
  // }, []);

  // if (!hasMounted) {
  //   return null;
  // }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setContactFormProccess((prev) => ({ ...prev, loading: true }));
    // console.log(contactFormData);
    if (contactFormData.website) {
      return;
    }
    try {
      await sendContactForm(contactFormData);
      setContactFormProccess((prev) => ({
        ...prev,
        success: true,
        loading: false,
      }));
    } catch (err) {
      console.log(err);
      setContactFormProccess((prev) => ({
        ...prev,
        error: true,
        loading: false,
      }));
    }
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setContactFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
  };

  return (
    <Region>
      <Head>
        <title>BojeArt - Kontaktirajte Jelenu i Bojana</title>
        <meta
          name="description"
          content="Umetnost Jelene Tijanić Savić i Bojana Savića - Kontakt stranica BojeArt.com"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="canonical"
          href="https://bojeart.com/contact"
          key="canonical"
        />
      </Head>
      <div className="stack">
        <div className="[ stack ] [ center ] [ text-center ]">
          <h1 className="[ h1-as-h3 ][ max-w-prose ] [ text-center ]">
            Imate pitanje o nekoj slici?{" "}
          </h1>
          <p className="h1-as-h3">
            Zainteresovani ste za naručivanje personalizovanog dela?
          </p>
          <p className="[ max-w-prose ]">
            Rado bismo se čuli sa Vama! Slobodno nas kontaktirajte putem naše
            kontakt forme ili se povežite s nama na društvenim mrežama.{" "}
          </p>
        </div>
        <div className="center">
          <h2 className="mr-bs-1 main-color">Ne budi stranac!</h2>
          <Socials></Socials>
          <form
            onSubmit={onSubmitHandler}
            className="[ stack ] [ z-top ] [ mr-bs-1 ]"
          >
            <div className="d-flex-c">
              <label htmlFor="email">Tvoj Mail</label>
              <input
                type="text"
                name="email"
                id="email"
                autoCapitalize="none"
                autoCorrect="off"
                required
                pattern="[^@]+@[^\.]+\..+"
                onChange={inputHandler}
              />
            </div>

            <div className="d-flex-c absolute left-9999">
              <label htmlFor="company_website">Kompani Mail</label>
              <input
                type="text"
                name="website"
                id="company_website"
                autoComplete="off"
                tabIndex="-1"
                onChange={inputHandler}
              />
            </div>

            <div className="d-flex-c">
              <label htmlFor="message">Poruka</label>
              <textarea
                name="message"
                id="message"
                type="text"
                required
                autoCorrect="off"
                onChange={inputHandler}
              />
            </div>
            <button className="button">Pošalji</button>
          </form>
          {!contactFormProccess.success && contactFormProccess.error ? (
            <p className="signup-alert">
              Došlo je do greške. Poruka nije poslata.
            </p>
          ) : !contactFormProccess.success && !contactFormProccess.error ? (
            ""
          ) : (
            <p className="signup-success">Hvala na poruci! Javljamo se!</p>
          )}
          {contactFormProccess.loading ? <Loader></Loader> : ""}
          <div className="[ stack ] [ center ] [ text-center ] [ mr-bs-4 ]">
            <p className="[ max-w-prose ]">
              Hvala vam što ste posetili našu galeriju. Nadamo se da naša
              umetnost donosi radost i inspiraciju u Vaš dan.
            </p>
            <p className="[ max-w-prose ] [ bold ] [ main-color ]">
              Topli pozdravi od Jelene & Bojana.
            </p>
          </div>
        </div>
      </div>
    </Region>
  );
};

export default Contact;
