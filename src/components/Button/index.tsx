export default function Button({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="ml-4 font-semibold text-l text-gray-600 text-nowrap pl-4 pr-4 pt-1.5 pb-1.5 rounded-4xl bg-slate-300 h-fit"
      onClick={() => {
        onClick();
      }}
    >
      View Details
    </button>
  );
}
