import { GetStaticPaths, GetStaticProps } from '@/libs/i18n'
import Work from '@/pages/work'

export const getStaticPaths = GetStaticPaths
export const getStaticProps = GetStaticProps

export default function LocalizedWork() {
  return <Work />
}
