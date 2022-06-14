import ContentContainer from "./ContentContainer";
import Header from "./Header";
import Footer from "./Footer";
import { PROJECT_NAME, PROJECT_DESCRIPTION } from "../util/constants";
import Head from "next/head";

export default function BasicPageContainer({ children }) {
  return (
    <div>
      <Head>
        <title>{PROJECT_NAME}</title>
        <meta name="description" content={PROJECT_DESCRIPTION} />
      </Head>
      <ContentContainer>
        <Header />
        {children}
        <Footer />
      </ContentContainer>
    </div>
  );
}
