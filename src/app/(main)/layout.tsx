import { NavLinks } from "@/app/ui/nav"

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="md:flex h-screen w-screen">
      <div className="flex md:w-1/5 md:h-full md:flex-col w-screen h-1/6  bg-gray-900 content-center justify-between md:justify-normal md:items-center p-3">
        <NavLinks />
      </div>
      <div className="md:w-4/5 md:h-full w-full h-5/6 p-2 md:p-6 bg-slate-800/100">
        <div className="w-full h-full p-5 rounded-md bg-gray-900">
          {children}
        </div>
      </div>
    </div>
  )
}
