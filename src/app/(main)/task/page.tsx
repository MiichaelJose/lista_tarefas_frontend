export default function Page() {
    return (
        <>
          <h1 className=" text-2xl text-white/80">Task</h1>
          <div className="w-full h-5/6 my-5 rounded-sm">
            <div className="flex align-middle items-end">
              <div className="w-28 h-10 bg-gray-500/50 content-center text-center rounded-md">
                <h4 className="text-white/80 text-sm">/workspace</h4>
              </div>
            </div>
            <div className="w-full h-full bg-gray-600/10 p-3 ">
              <div className="flex size-28 justify-center items-center bg-gray-700 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-20 text-gray-800/60">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
            </div>
          </div>
        </>
    )
}   