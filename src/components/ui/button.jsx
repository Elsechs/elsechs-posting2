
export function Button({ children, ...props }) {
  return (
    <button
      className="px-4 py-2 rounded-xl shadow-sm text-white bg-[#69B63F] hover:bg-[#1F8743] transition"
      {...props}
    >
      {children}
    </button>
  );
}
