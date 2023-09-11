import { GetStaticPaths, GetStaticProps } from '@/libs/i18n'
import Portfolio from '@/pages/portfolio'

export const getStaticPaths = GetStaticPaths
export const getStaticProps = GetStaticProps

export default function LocalizedPortfolio() {
  return <Portfolio />
}
