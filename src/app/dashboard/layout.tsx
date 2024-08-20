"use client"
import { usePathname } from "next/navigation"
import { NavLinks } from "../ui/nav"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  function titleSection() {
    if(pathname === '/dashboard') {
      return 'Workspace'
    }
    if(pathname === '/dashboard/display') {
      return 'Display'
    }
    if(pathname === '/dashboard/display/task') {
      return 'Task'
    }
  }

  return (
    <div className="md:flex h-screen w-screen">
      <div className="flex md:w-1/5 md:h-full md:flex-col w-screen h-1/6  bg-gray-900 content-center justify-between md:justify-normal md:items-center p-3">
        <NavLinks />
      </div>
      <div className="md:w-4/5 md:h-full w-full h-5/6 p-6 bg-slate-800/100">
        <div className="w-full h-full p-5 rounded-md bg-gray-900">
          <h1 className=" text-2xl text-white/80">{titleSection()}</h1>
          <div className="w-full h-100 my-5">
            <div className="w-28 h-10 bg-gray-500 content-center text-center rounded-md">
              <h4 className="text-white">workspace</h4>
            </div>
            <div className="w-full h-max bg-gray-200  ">
              <h2>oi</h2>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
