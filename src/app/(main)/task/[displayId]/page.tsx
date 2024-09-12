"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

async function getData(workspaceId: string) {
  const res = await fetch(`http://localhost:3002/display/workspaceid/${workspaceId}`)
  const data = await res.json()
  
  return data
}

export default function Page({params}: any) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)

  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getData(params.workspaceid)
        console.log(result);
        
        setData(result)
        
      } catch (error) {
        console.error('Erro ao buscar os dados:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  function statusModal() {
    if(!modal) {
      setModal(true)
    }else {
      setModal(false)
    }
  }

  function btnDisplay(workspaceId: string) {
    localStorage.setItem('display', JSON.stringify(workspaceId));
    router.push(`/display/${workspaceId}`)
  }

  function getModal() {
    return(
      <div className="w-full h-full z-10 absolute top-0 left-0 bg-gradient-to-r from-gray-900/50 via-gray-900/80 to-gray-900/50 flex justify-center items-center">
        <div className="relative w-5/6 md:w-3/12  rounded-md  flex flex-col p-3 items-start ">
          <label htmlFor="name" className="text-white/80">Nome</label>
          <div className="flex justify-between items-center content-center flex-row">
            <input name="name" type="text" className="w-4/4 h-10 rounded-md outline-none p-3 bg-gray-600 text-white "/>
            <div className="flex items-center justify-center w-10 h-10">
              <label className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8  text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden"/>
              </label>
            </div> 
          </div>
          
          <div className="flex">
            <div className="flex justify-around items-center mt-3 w-28 h-10 bg-gray-700 rounded-md text-white">
              <button>criar</button>
            </div>
            
            <button className="flex justify-around items-center mt-3 w-28 h-10 bg-gray-700 rounded-md text-white ml-3" onClick={() => statusModal()}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
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
      <h1 className=" text-2xl text-white/80">Task</h1>
      <div className="w-full h-5/6 my-5 rounded-sm">
        <div className="flex align-middle items-end">
          <div className="w-auto h-10 bg-gray-700/50 content-center text-center rounded-md p-2">
            <h4 className="text-white/80 text-xs">/display/{params.displayId}</h4>
          </div>
        </div>
        <div className="grid gap-4 w-full h-full bg-gray-600/10 p-2 grid-cols-3 auto-rows-fr">
          <div className="flex w-full justify-center items-center bg-gray-700 rounded-lg" onClick={() => statusModal()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-20 text-gray-800/60" onClick={() => statusModal()}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          {data.length > 0 ? (
            data.map((item: any, index) => (
              <div onClick={() => btnDisplay(item._id)} key={index} className="flex w-full justify-center items-center bg-gray-700 rounded-lg  hover:bg-gray-600/90">
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