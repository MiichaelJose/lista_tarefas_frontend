"use client"
import { useState } from "react"

type User = {
  email: string
  password: string
}

async function postSingin(base: any) {
  console.log(base);
  
  const res = await fetch('http://localhost:3001/singin', {
    method: 'POST',
    headers: {'content-type':'application/json'},
    body: JSON.stringify(base)
  })
  const data = await res.json()
  return data
}

export default function Home() {
  const [user, setUser] = useState<User>({email: '', password: ''})

  const handleEmailUser = (event: any) => {
    setUser({ ...user, email: event.target.value })
  }

  const handlePasswordUser = (event: any) => {
    setUser({ ...user, password: event.target.value })
  }

  async function handleSubmit() {
    await postSingin(user)
  }

  return (
    <div className="flex h-screen w-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900 tex">
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
            <button onClick={() => handleSubmit()} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
        </p>
      </div>
    </div>
  )
}
