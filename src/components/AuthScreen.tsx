import { useState } from 'react'
import { ArrowSmRightIcon } from '@heroicons/react/solid'
import { XCircleIcon } from '@heroicons/react/outline'
import { appWindow } from '@tauri-apps/api/window'
import toast from 'react-hot-toast'

import { sbClient } from '../utils/supabase'
import { LoaderScreen } from './LoaderScreen'
import { classNames } from '../utils/ui-helpers'
import { createHash } from '../utils/string-helpers'
import { AppLogo } from './AppLogo'

export const AuthScreen = () => {
  const [loading, setLoading] = useState(false)
  const [actionIsLogin, setActionIsLogin] = useState(true)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [realname, setRealName] = useState('')

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setRealName('')
  }

  const handleLogin = async () => {
    const { user, error } = await sbClient.auth.signIn({ email, password })
    setLoading(false)

    if (error && !user) {
      return toast.error('You are not registered yet.')
    }

    if (error) return toast.error(error.message)

    setLoading(false)
    resetForm()
  }

  const handleRegister = async () => {
    const passphrase = await createHash(password)
    const { error } = await sbClient.auth.signUp(
      { email, password },
      { data: { realname, passphrase } },
    )

    setLoading(false)
    if (error) return toast.error(error.message)
    toast.success('Check your email to verify your account!')
    setActionIsLogin(true)
    resetForm()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    return actionIsLogin ? handleLogin() : handleRegister()
  }

  if (loading) return <LoaderScreen />

  return (
    <>
      <div className='absolute top-0 right-0 z-40 flex h-14 items-center px-4'>
        <div className='relative'>
          <div>
            <button
              className='-mr-1 flex cursor-pointer items-center justify-center rounded-md p-1.5 outline-none hover:bg-gray-700'
              onClick={() => appWindow.close()}
            >
              <XCircleIcon className='h-6 w-6 text-white' />
            </button>
          </div>
        </div>
      </div>
      <div
        className={classNames(
          actionIsLogin ? 'py-12' : 'py-0',
          'flex min-h-full items-center justify-center px-6',
        )}
      >
        <div className='w-full max-w-sm'>
          <div>
            <AppLogo
              className={classNames(
                actionIsLogin ? 'h-12' : 'h-8',
                'mx-auto w-auto',
              )}
            />
            <h2 className='mt-8 text-center text-xl font-semibold tracking-tight text-white'>
              {actionIsLogin ? 'Sign in to continue' : 'Create account'}
            </h2>
          </div>

          <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
            <input type='hidden' name='remember' defaultValue='true' />
            <div className='-space-y-px rounded-md shadow-sm'>
              <div>
                <label htmlFor='email-address' className='sr-only'>
                  Email address
                </label>
                <input
                  id='email-address'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none'
                  placeholder='Email address'
                  onChange={(e) => setEmail(e.target.value)}
                  defaultValue={email}
                />
              </div>
              {!actionIsLogin && (
                <>
                  <div>
                    <label htmlFor='realname' className='sr-only'>
                      First name
                    </label>
                    <input
                      id='realname'
                      name='realname'
                      type='text'
                      className='relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none'
                      placeholder='Full name'
                      onChange={(e) => setRealName(e.target.value)}
                      defaultValue={realname}
                      required
                    />
                  </div>
                </>
              )}
              <div>
                <label htmlFor='password' className='sr-only'>
                  Password
                </label>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none'
                  onChange={(e) => setPassword(e.target.value)}
                  defaultValue={password}
                  placeholder='Password'
                  required
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='group relative flex w-full justify-center rounded-md border border-transparent bg-primary-600 py-3 px-4 text-sm font-bold uppercase text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
              >
                <span>Continue</span>
                <ArrowSmRightIcon className='ml-2 -mr-1 h-5 w-5 text-primary-100 group-hover:text-primary-200' />
              </button>
            </div>
          </form>

          <div className='absolute left-0 bottom-0 flex w-full flex-col items-center justify-center space-y-3 py-10'>
            {/* <p className='text-center text-sm text-gray-300'>
                        Forgot password?{' '}
                        <a
                            href='https://otentik.app/recovery?ref=authenticator'
                            className='font-medium text-primary-500 hover:text-primary-600'
                            rel='noreferrer noopener'
                            target='_blank'
                        >
                            Reset
                        </a>
                    </p> */}
            <p className='text-center text-sm text-gray-300'>
              {actionIsLogin
                ? "Dont' have account? "
                : 'Already have account? '}
              <button
                type='button'
                className='font-medium text-primary-500 hover:text-primary-600'
                onClick={() => setActionIsLogin(!actionIsLogin)}
              >
                {actionIsLogin ? 'Register' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
