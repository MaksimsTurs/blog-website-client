import '@/scss/global.scss'

import PostContainerLoader from "@/component/loader/post-container-loader/postContainerLoader";

import type { LoaderProps } from './page.type';

import useMetadata from '@/custom-hook/use-metadata/useMetadata';

export default function Loader({ containersCount }: LoaderProps) {
  useMetadata({ title: 'Home', description: 'Hier kannst du alle letzt geschriebene posts ansehen.' })
  return <div className='flex-column-normal-normal-small'>{[...Array(containersCount || 3)].map((_, index) => <PostContainerLoader key={index}/>)}</div>
}