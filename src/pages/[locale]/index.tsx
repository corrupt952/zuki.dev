import { GetStaticPaths, GetStaticProps } from "@/libs/i18n";
import Home from "@/pages/index";

export const getStaticPaths = GetStaticPaths;
export const getStaticProps = GetStaticProps;

export default function LocalizedHome() {
  return <Home />;
}
