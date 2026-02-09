import Header from "./Header";
import Footer from "./Footer";
import Wrapper from "../layout/Wrapper";
import * as styles from "../../styles/Layout.module.css";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();

  // This is true for "/" and "/en" (and any other locale home)
  const isHome = router.pathname === "/";

  return (
    <div className={isHome ? styles.layoutBackground : styles.layout}>
      <div>
        <Header />
        <main>
          <Wrapper>{children}</Wrapper>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
