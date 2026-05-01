export default function AboutSceneCard() {
  return (
    <div>
      <div className="text-white text-2xl font-stretch-expanded font-bold uppercase">
        <p className="mb-2">From concept to creation</p>
        powered by{" "}
        <span className="bg-slate-600 rounded-md font-stretch-extra-expanded pt-1 pb-1 pr-2 pl-2 justify-center items-center lowercase">
          {"<code/>"}
        </span>
      </div>
      <div className="flex flex-row w-fit mt-6 bg-transparent">
        <div className="border-slate-400 shadow-[0_0_30px_rgba(100,116,139,0.35)] border-l-4" />
        <div className="text-gray-300/80 text-md font-semibold font-stretch-expanded pl-2">
          Full-stack developer crafting end-to-end
          <p>solutions across backend, web, and mobile 🌟</p>
        </div>
      </div>
    </div>
  );
}
