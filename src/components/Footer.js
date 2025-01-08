const Footer = () => {
  return (
    <footer className="py-4 text-white bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="flex justify-between mx-7">
        <div className="flex flex-col">
          <p className="mb-2">
            Designed and Developed by John Linthicum © Sep. 2024
          </p>
          <div className="flex items-center">
            <button
              onClick={() => (window.location.href = "https://johnlinth.dev")}
              className="px-2 py-1 font-bold text-black rounded-md bg-slate-300 hover:underline"
            >
              johnlinth.dev
            </button>
          </div>
        </div>
        <div className="flex flex-col space-x-4">
          <p className="text-right">Created with</p>
          <div className="flex flex-row justify-end">
            <p>React JS, Tailwind CSS</p>
            {/* Icons 
      <ReactIcon className="w-6 h-6" />
      <TailwindIcon className="w-6 h-6" />
      <NodeJSIcon className="w-6 h-6" />
      */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
