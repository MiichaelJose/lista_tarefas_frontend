export default function Page() {
  return (
    <div className="md:flex h-screen w-screen">
      <div className="flex md:w-1/5 md:h-full w-screen h-1/6  bg-slate-900 justify-center align-middle">
        <h2 className="text-white">TaskMax</h2>
      </div>
      <div className="md:w-4/5 md:h-full w-full h-5/6 p-6 bg-slate-800">
        <div className="w-full h-full p-5 rounded-md bg-slate-400">
          <h3 tex>Dashboard</h3>
          <div></div>
        </div>
      </div>
    </div>
  )
}
