"use client"

import { useEffect, useState } from "react"

async function getData() {
  const res = await fetch('http://localhost:3002/workspace/all/')
  const data = await res.json()

  return data
}



export default function Page() {
  const [data, setData] = useState([]) // Estado inicial como array vazio
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)

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
      <div className="w-full h-full z-10 absolute top-0 left-0 bg-gradient-to-r from-gray-900/70 via-gray-800/15 to-gray-900/70 flex justify-center items-center">
        <div className="w-5/6 md:w-4/12 h-4/6 md:h-2/4 bg-gray-500 rounded-md shadow-2xl shadow-gray-900 flex p-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-9 ml-auto cursor-pointer text-white" onClick={() => statusModal()}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
    )
  }
    
  return (
    <>
      {modal ? getModal() : ''}
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
            <div>Carregando...</div>
          )}
        </div>
      </div>
    </>
  )
}   