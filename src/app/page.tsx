export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <div className=" py-44 text-center">
        <h1 className="font-bold text-7xl mb-8">
          Gérez Vos Stocks Comme Jamais! <br /> <span className="gradient-text">Inventorly</span>
        </h1>
        <p className="text-lg text-gray-100 mb-12">
          Optimisation en Temps Réel, Réduction des Coûts et Plus Encore !
        </p>
        <button className="text-xl bg-indigo-500 py-3 px-8 rounded-sm">Essayer</button>
      </div>
      <div className="w-1/2 h-96 border border-gray-200 mx-auto rounded-lg flex items-start bg-slate-300 shadow-md shadow-indigo-800">
        <div className="w-full py-3 rounded-lg">
          <div className="px-6 flex gap-2 justify-between items-center">
            <div>
              <h2 className="font-medium gradient-text cursor-pointer">Inventorly</h2>
            </div>
            <div className="flex gap-2 text-xs text-stone-900 cursor-pointer">
              <p>Profile</p>
              <p>Dashboard</p>
              <p>Products</p>
              <p>Settings</p>
            </div>
          </div>
          <div className="mt-10 px-10 flex gap-4">
            <div className="w-1/3 h-40 bg-white rounded-md flex flex-col justify-center items-center">
              <p className="text-black text-start text-xs">Statistics</p>
              <div className="p-4 rounded-full bg-fuchsia-500"><div className="p-8 rounded-full bg-white"></div></div>
            </div>
            <div className="w-2/3 h-40 bg-white rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
