import scss from './authorizationModal.module.scss'

import useForm from '@/custom-hook/useForm/useForm'
import useSearchParams from '@/custom-hook/use-search-params/useSearchParams'
import useAuth from '@/custom-hook/useAuth/useAuth'

import type { User } from '@/global.type'

import FormWrapper from '../form-wrapper/formWrapper'
import TextInput from '../input/textInput/textInput'

export default function LoginModal() {
  const auth = useAuth()
  const searchParams = useSearchParams()
  const { submit, reset, formState: { errors }} = useForm<User>([
    ['email', 'isPattern:^[^\\s@]+@[^\\s@]+\.[^\\s@]+$:Email is incorrect!'],
    ['name', ['isMax:12:Name is to long!', 'isMin:3:Name is to short!']],
    ['password', 'isMin:8:Password is to short!'],
  ])

  const isOpenLog: boolean = JSON.parse(searchParams.get('login-modal') || 'false')

  const login = (user: User): void => {
    auth.create({ apiURL: '/login', body: user, redirectURL: '/', setToken: true })
    reset()
  }

  auth.clearError()

  return(
    <div className={isOpenLog ? scss.authorization_modal_container : scss.authorization_modal_container_hidden}>
      <FormWrapper errors={auth.error?.message ? [auth.error.message] : []} className={scss.authorization_modal_body} onSubmit={submit(login)} isPending={auth.isLoading} buttonLabel='Log in'>
        <TextInput name='name' errors={errors} placeholder='Write you name here...'/>
        <TextInput name='email' type='email' errors={errors} placeholder='Write you email here...'/>
        <TextInput name='password' type='password' errors={errors} placeholder='Write you password here...'/>
      </FormWrapper>
    </div>
  )
}