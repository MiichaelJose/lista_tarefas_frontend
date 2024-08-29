"use client"
import CardButton from "@/app/components/card-button";
import { useEffect, useState } from "react";

async function getData(workspaceId: string) {
  const res = await fetch(`http://localhost:3002/display/workspaceId/${workspaceId}`)
  const data = await res.json()
  return data
}

export default function Page({params}: { params: {workspaceId: string} }) {
  const [data, setData] = useState('')
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getData(params.workspaceId)
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

    return (
      <>
        <h1 className=" text-2xl text-white/80">Display</h1>
        <div className="w-full h-5/6 my-5 rounded-sm">
          <div className="flex align-middle items-end">
            <div className="w-28 h-10 bg-gray-500/50 content-center text-center rounded-md">
              <h4 className="text-white/80 text-sm">/workspace</h4>
            </div>
          </div>
          <div className="grid gap-4 w-full h-full bg-gray-600/10 p-2 grid-cols-3 auto-rows-fr">
            <div className="flex w-full justify-center items-center bg-gray-700 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-20 text-gray-800/60" onClick={() => statusModal()}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            
          </div>
        </div>
      </>
    )
}   