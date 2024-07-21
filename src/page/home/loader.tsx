import '@/scss/global.scss'

import PostContainerLoader from "@/component/loader/post-container-loader/postContainerLoader";

import type { LoaderProps } from './page.type';

export default function Loader({ containersCount }: LoaderProps) {
  return <div className='flex-column-normal-normal-small'>{[...Array(containersCount || 3)].map((_, index) => <PostContainerLoader key={index}/>)}</div>
}