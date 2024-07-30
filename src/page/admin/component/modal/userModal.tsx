import scss from '../../scss/modal/userModal.module.scss'
import '@/scss/global.scss'

import type { Content, User } from "@/global.type";
import type { ContentData } from '../../page.type';

import DataModalWrapper from "../data-render/dataModalWrapper";
import SimpleData from "../data-render/simpleData";
import AdminActionButton from "../adminActionButton";
import DataBurgerWrapper from "../data-render/dataBurgerWrapper";
import Empty from '@/component/empty/empty';
import PaginationList from '@/component/pagination-list/paginationList';
import FormWrapper from '@/component/form-wrapper/formWrapper';
import DataEditModalWrapper from '../data-render/dataEditModalWrapper';
import TextInput from '@/component/input/textInput/textInput';
import FileInput from '@/component/input/fileInput/fileInput';

import DateParser from "@/lib/date-parser/dateParser";

import useSearchParams from '@/custom-hook/use-search-params/useSearchParams';
import useForm from '@/custom-hook/useForm/useForm';
import useSelect from '@/component/input/select-input/selectInput';
import useRequest from '@/custom-hook/_use-request/_useRequest';

import { Link } from 'react-router-dom';
import { ShieldHalf, SquarePen, UserRound } from 'lucide-react'

import fetcher from '@/lib/fetcher/fetcher';
import createFormDataFromJSON from '@/lib/create-formdata-from-json/createFormDataFromJSON';
import coockie from '@/lib/coockie/coockie';
import inObject from '@/lib/in-object/inObject';
import { Fragment } from 'react/jsx-runtime';

export default function UserModal() {
  const searchParams = useSearchParams()
  const userRoles = useSelect({})
  const userBan = useSelect({})
  const { submit, reset } = useForm<User>([])
  const { mutate, isMutating } = useRequest({ deps: [] })

  const currMyContentPage: number = parseInt(searchParams.get('user-content') || '0')
  const currMyLikes: number = parseInt(searchParams.get('my-likes') || '0')

  const myContentStart: number = currMyContentPage * 10
  const myContentEnd: number = myContentStart + 10

  const myLikesStart: number = currMyLikes * 10
  const myLikesEnd: number = myLikesStart + 10

  const editUser = (userNewData: User): void => {
    mutate<ContentData<User>>({
      key: [`user-${searchParams.get('page') || 0}`],
      request: async (option) => {
        const role: string | undefined = userRoles.selected.length === 0 ? undefined : userRoles.selected[0]
        const ban: string | undefined = userBan.selected.length === 0 ? undefined : userBan.selected[0]

        const updatedUser = await fetcher.post<User>('/admin/user/update', createFormDataFromJSON({...userNewData, id: searchParams.get('id'), role, ban }), { 'Authorization': `Bearer ${coockie.getOne('PR_TOKEN')}` })

        userRoles.reset()
        userBan.reset()
        reset()
        searchParams.remove(['user-edit-modal'])

        return {
          pagesCount: option.state?.pagesCount || 0,
          data: option.state?.data.map(item => item._id === updatedUser._id ? {...item, ...updatedUser } : item) || []
        }
      }
    })
  }

  return(
    <DataModalWrapper<User> Component={props => {
      const currMyContent: Content[] = (props.data.myContent?.slice(myContentStart, myContentEnd) || []) as unknown as Content[]
      const currMyLikes: Content[] = (props.data.likedContent.slice(myLikesStart, myLikesEnd) || []) as unknown as Content[]

      const maxMyContentPage: number = Math.ceil(currMyContent.length / 10)
      const maxMyLikesPage: number = Math.ceil(currMyLikes.length / 10)

      return (
        <Fragment>
          <DataEditModalWrapper>
            <FormWrapper style={{ border: 'none', width: '25rem', boxShadow: 'none', padding: '1rem' }} buttonLabel='Change user data' onSubmit={submit(editUser)}>
              <TextInput name='name' placeholder='Write new user name' defaultValue={props.data.name}/>
              <userRoles.SelectInput title='User roles:'>
                <userRoles.SelectItem value='Admin'><div style={{ background: 'transparent' }} className='flex-row-center-normal-big'><ShieldHalf size={15}/><p>Admin</p></div></userRoles.SelectItem>
                <userRoles.SelectItem value='Creator'><div style={{ background: 'transparent' }} className='flex-row-center-normal-big'><SquarePen size={15}/><p>Creator</p></div></userRoles.SelectItem>
                <userRoles.SelectItem value='User'><div style={{ background: 'transparent' }} className='flex-row-center-normal-big'><UserRound size={15}/><p>User</p></div></userRoles.SelectItem>
              </userRoles.SelectInput>
              <userBan.SelectInput title='Ban for:'>
                <userBan.SelectItem value='1'>1 Day</userBan.SelectItem>
                <userBan.SelectItem value='7'>7 Days</userBan.SelectItem>
                <userBan.SelectItem value='14'>14 Days</userBan.SelectItem>
              </userBan.SelectInput>
              <FileInput label='Change user avatar' name='avatar' isChange={isMutating}/>
            </FormWrapper>
          </DataEditModalWrapper>
          <div style={{ width: '30rem', position: 'relative' }} className='flex-column-normal-normal-small'>
            <div style={{ background: 'white', padding: '1rem', borderRadius: '6px', position: 'absolute', right: '-12.5%', zIndex: '-1', top: '-2%' }} className='flex-column-normal-normal-small'>
              <AdminActionButton optionAction={{ actionType: 'remove' }}/>
              <AdminActionButton optionAction={{ actionType: 'edit' }}/>
            </div>
            <SimpleData propKey="ID:" propValue={props.data._id} useCopyBoard/>
            <SimpleData propKey="Email:" propValue={props.data.email} useCopyBoard/>
            <SimpleData propKey="Name:" propValue={props.data.name}/>
            <SimpleData propKey="Role:" propValue={props.data.role}/>
            <SimpleData propKey="Registrated:" propValue={DateParser.getDifference(props.data.createdAt)}/>
            <SimpleData propKey="Ban for:" propValue={DateParser.getDifference(props.data.ban) || 'Not baned!'}/>
            <DataBurgerWrapper propKey={`${props.data.name} content:`}>
              <ul className={scss.user_modal_user_content}>
                {maxMyContentPage > 1 ? <PaginationList pagesCount={maxMyContentPage} listKey='user-content'/> : null}
                {currMyContent.length === 0 ? <Empty option={{ flexCenterCenter: true, size: 'SMALL' }} label='User have no content!'/> :
                currMyContent.map(content => 
                  <Link to={`/admin/${inObject<Content>(content, ['viewedBy']) ? 'post' : 'comment'}?id=${content._id}`}>
                    <li key={content._id} className='flex-column-normal-normal-none'>
                      <h5>{content.title}</h5>
                      <section className={`${scss.user_modal_data_container} flex-row-normal-normal-big`}><p>Likes:</p><p>{content.likedBy.length}</p></section>
                      {content.viewedBy ? <section className={`${scss.user_modal_data_container} flex-row-normal-normal-big`}><p>Views:</p><p>{content.viewedBy.length}</p></section> : null}
                      {content.comments ? <section className={`${scss.user_modal_data_container} flex-row-normal-normal-big`}><p>Comments:</p><p>{content.comments.length}</p></section> : null}
                    </li>
                  </Link>)}
              </ul>
            </DataBurgerWrapper>
            <DataBurgerWrapper propKey={`${props.data.name} likes:`}>
              <ul className={scss.user_modal_user_content}>
                {maxMyLikesPage > 1 ? <PaginationList pagesCount={maxMyLikesPage} listKey='my-likes'/> : null}
                {currMyLikes.length === 0 ? <Empty option={{ flexCenterCenter: true, size: 'SMALL' }} label='User have not liked some one content!'/> :
                currMyLikes.map(content => 
                  <li key={content._id} className='flex-column-normal-normal-none'>
                    <h5>{content.title}</h5>
                    <section className={`${scss.user_modal_data_container} flex-row-normal-normal-big`}><p>Likes:</p><p>{content.likedBy.length}</p></section>
                    <section className={`${scss.user_modal_data_container} flex-row-normal-normal-big`}><p>Views:</p><p>{content.viewedBy!.length}</p></section>
                    <section className={`${scss.user_modal_data_container} flex-row-normal-normal-big`}><p>Comments:</p><p>{content.comments!.length}</p></section>
                  </li>
                )}
              </ul>
            </DataBurgerWrapper>
          </div>
        </Fragment>
      )}}/>
  )
}