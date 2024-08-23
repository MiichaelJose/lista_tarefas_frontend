"use client"
import { Suspense, useEffect, useState } from "react"
import Loading from "./loading"

type Workspace = {
  name: string
}

async function getData() {
  const res = await fetch('http://localhost:3002/workspace/all/')
  const data = await res.json()
  return data
}

async function postWorkspace(base: any) {
  console.log(base);
  const res = await fetch('http://localhost:3002/workspace', {
    method: 'POST',
    headers: {'content-type':'application/json'},
    body: JSON.stringify(base)
  })
  console.log(res);
  const data = await res.json()
  return data
}

export default function Page() {
  const [data, setData] = useState([]) // Estado inicial como array vazio
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [nameWorkspace, setNameWorkspace] = useState<Workspace>({name: ''})
  const [isSpinner, setIsSpinner] = useState(false)
  const [isNotification, setIsNotification] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getData()
        setData(result)
      } catch (error) {
        console.error('Erro ao buscar os dados:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleChange = (event: any) => {
    setNameWorkspace({ name: event.target.value })
  }
  
  const handleSubmit = async () => {
    setIsSpinner(true)

    try {
      const result = await postWorkspace(nameWorkspace)
      if(!result.ok) {
        throw new Error('Erro ao cadastrar workspace.');
      }
    } catch (error) {
      console.log(error);
      setIsSpinner(false)
      statusModal()
      setIsNotification(true)
    } finally {
      setIsSpinner(false)
    }
  }

  if (loading) {
    return <div>Carregando...</div>
  }

  function statusModal() {
    if(!modal) {
      setModal(true)
    }else {
      setModal(false)
    }
  }

  function getModal() {
    return(
      <div className="w-full h-full z-10 absolute top-0 left-0 bg-gradient-to-r from-gray-900/50 via-gray-900/80 to-gray-900/50 flex justify-center items-center">
        <div className="relative w-5/6 md:w-3/12  rounded-md  flex flex-col p-3 items-start ">
          <label htmlFor="name" className="text-white/80">Nome</label>
          <input name="name" type="text" className="w-full h-10 rounded-md outline-none p-3 bg-gray-600 text-white mt-3" onChange={handleChange}/>
          <div className="flex">
            <div className="flex justify-around items-center mt-3 w-28 h-10 bg-gray-700 rounded-md text-white">
              <button  onClick={handleSubmit}>criar</button>
            </div>
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
            
            <button className="flex justify-around items-center mt-3 w-28 h-10 bg-gray-700 rounded-md text-white ml-3" onClick={() => statusModal()}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
              <p>cancelar</p>
            </button>
          </div>
        </div>
      </div>
    )
  }
    
  return (
    <>
      {modal && getModal()}
      {isNotification && 
        <>
          <div id="toast-warning" className="fixed top-10 right-10 flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-700" role="alert">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
                </svg>
                <span className="sr-only">Warning icon</span>
            </div>
            <div className="ms-3 text-sm font-normal">Erro interno</div>
            <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-warning" aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </button>
          </div>
        </>
      }
      <h1 className=" text-2xl text-white/80">Workspace</h1>
      <div className="w-full h-5/6 my-5 rounded-sm">
        <div className="flex align-middle items-end">
          <div className="w-28 h-10 bg-gray-500/50 content-center text-center rounded-md">
            <h4 className="text-white/80 text-sm">/workspace</h4>
          </div>
        </div>
        <div className="grid gap-4 w-full h-full bg-gray-600/10 p-2 grid-cols-3 auto-rows-fr">
          <div className="flex w-full justify-center items-center bg-gray-700 rounded-lg" onClick={() => statusModal()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-20 text-gray-800/60">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          {data.length > 0 ? (
            data.map((item: any, index) => (
              <div key={index} className="flex w-full justify-center items-center bg-gray-700 rounded-lg">
                <h2 className="text-white">{item.name}</h2> {/* Exemplo de uso da propriedade "name" */}
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  )
}   