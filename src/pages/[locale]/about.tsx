import { GetStaticPaths, GetStaticProps } from "@/libs/i18n";
import About from "@/pages/about";

export const getStaticPaths = GetStaticPaths;
export const getStaticProps = GetStaticProps;

export default function LocalizedAbout() {
  return <About />;
}
