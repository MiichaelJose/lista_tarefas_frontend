"use client"
import { useRouter } from 'next/navigation'
import { useState } from "react"
import { environment } from './config'

type User = {
  email: string
  password: string
}

async function postSingIn(base: any) {
  const res = await fetch(`${environment.URL_SERVER_AUTH}/singin`, {
    method: 'POST',
    headers: {'content-type':'application/json'},
    body: JSON.stringify(base)
  })
  const data = await res.json()
  return data
}

export default function Home() {
  const [user, setUser] = useState<User>({email: '', password: ''})
  const [isSpinner, setIsSpinner] = useState(false)
  const router = useRouter()

  const handleEmailUser = (event: any) => {
    setUser({ ...user, email: event.target.value })
  }

  const handlePasswordUser = (event: any) => {
    setUser({ ...user, password: event.target.value })
  }

  async function handleSubmit() {
    setIsSpinner(true)
    try {
      const rest = await postSingIn(user)
      
      if(rest.msg) {
        throw new Error('Usuario não encontrado.');
      }
      localStorage.setItem('data', JSON.stringify(rest));
      router.push(`/workspace`)
    } catch (error) {
      console.log(error);
      setIsSpinner(true)
    } finally {
      setIsSpinner(false)
    }
  }

  return (
    <div className="flex h-screen w-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900 tex">
      {
        isSpinner &&
        <>
          <div className="w-full h-full absolute top-0 left-0 bg-gray-900/90 blur-2xl z-10"></div>
          <div role="status" className="absolute  -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 z-20">
              <svg aria-hidden="true" className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
              <span className="sr-only">Loading...</span>
          </div>
        </>
      }
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white ">Sign in</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label  className="block text-sm font-medium leading-6 text-white">Email address</label>
            <div className="mt-2">
              <input onChange={handleEmailUser} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none pl-3" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label  className="block text-sm font-medium leading-6 text-white outline-none ">Password</label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
              </div>
            </div>
            <div className="mt-2">
              <input onChange={handlePasswordUser} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3" />
            </div>
          </div>

          <div>
            <button onClick={() => handleSubmit()} type="button" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have a registration?
          <br></br>
          <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">register</a>
        </p>
      </div>
    </div>
  )
}
