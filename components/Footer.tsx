import Image from "next/image";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-light-800/20 pt-12">
      <div className="max-w-7xl mx-auto px-16 max-sm:px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="JobPsych Logo" width={32} height={28} />
            <div>
              <h3 className="text-primary-100 font-bold text-lg">JobPsych</h3>
              <p className="text-light-400 text-xs">
                Career Intelligence Assistant
              </p>
            </div>
          </div>
          <div className="flex-1 max-w-md text-center md:text-left">
            <p className="text-light-100 text-sm leading-relaxed">
              Empowering careers with AI-driven insights, interview preparation,
              and professional development tools.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://jobpsych.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm px-6 py-2 hover:scale-105 transition-transform"
            >
              Visit JobPsych
            </a>
          </div>
        </div>
        <div className="border-t border-light-800/20 mt-8 pt-6 text-center">
          <p className="text-light-400 text-xs">
            © {new Date().getFullYear()} JobPsych. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
