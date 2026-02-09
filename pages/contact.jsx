import React, { useState } from "react";
import Head from "next/head";
import { useTranslations } from "next-intl";

import { sendContactForm } from "../lib/api";
import Loader from "../components/Loader";
import Region from "../components/layout/Region";
import Socials from "../components/Socials";

import en from "../messages/en.json";
import sr from "../messages/sr.json";

const Contact = () => {
  const t = useTranslations("contact");

  const [contactFormData, setContactFormData] = useState({});
  const [contactFormProccess, setContactFormProccess] = useState({
    success: false,
    error: false,
    loading: false,
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setContactFormProccess((prev) => ({ ...prev, loading: true }));

    // Honeypot
    if (contactFormData.website) return;

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
        <title>{t("meta.title")}</title>
        <meta name="description" content={t("meta.description")} />
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
            {t("hero.title")}
          </h1>
          <p className="h1-as-h3">{t("hero.subtitle")}</p>
          <p className="[ max-w-prose ]">{t("hero.text")}</p>
        </div>

        <div className="center">
          <h2 className="mr-bs-1 main-color">{t("sectionTitle")}</h2>

          <Socials />

          <form
            onSubmit={onSubmitHandler}
            className="[ stack ] [ z-top ] [ mr-bs-1 ]"
          >
            <div className="d-flex-c">
              <label htmlFor="email">{t("form.emailLabel")}</label>
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

            {/* Honeypot field */}
            <div className="d-flex-c absolute left-9999">
              <label htmlFor="company_website">
                {t("form.companyEmailLabel")}
              </label>
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
              <label htmlFor="message">{t("form.messageLabel")}</label>
              <textarea
                name="message"
                id="message"
                type="text"
                required
                autoCorrect="off"
                onChange={inputHandler}
              />
            </div>

            <button className="button">{t("form.send")}</button>
          </form>

          {!contactFormProccess.success && contactFormProccess.error ? (
            <p className="signup-alert">{t("feedback.error")}</p>
          ) : !contactFormProccess.success && !contactFormProccess.error ? (
            ""
          ) : (
            <p className="signup-success">{t("feedback.success")}</p>
          )}

          {contactFormProccess.loading ? <Loader /> : ""}

          <div className="[ stack ] [ center ] [ text-center ] [ mr-bs-4 ]">
            <p className="[ max-w-prose ]">{t("footer.thanks")}</p>
            <p className="[ max-w-prose ] [ bold ] [ main-color ]">
              {t("footer.signature")}
            </p>
          </div>
        </div>
      </div>
    </Region>
  );
};

export default Contact;

export async function getStaticProps({ locale = "sr" }) {
  return {
    props: {
      locale,
      messages: locale === "en" ? en : sr,
    },
  };
}
