const Footer = () => {
  return (
    <div className="flex w-full flex-col items-center justify-between px-1 pb-8 pt-3 lg:px-8 xl:flex-row">
      <p className="mb-4 text-center text-sm font-medium text-gray-600 sm:!mb-0 md:text-lg">
        <span className="mb-4 text-center text-sm text-gray-600 sm:!mb-0 md:text-base">
          ©{new Date().getFullYear()} VeriGrant. All Rights Reserved.
        </span>
      </p>
      <div>
        <ul className="flex flex-wrap items-center gap-3 sm:flex-nowrap md:gap-10">
          <li>
            <a
              target="blank"
              href="https://github.com/ronitjain7/VeriGrant-_AI-Powered-Transparent-Scholarship-Aid-Distribution"
              className="text-base font-medium text-gray-600 hover:text-gray-600"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="/admin/apply"
              className="text-base font-medium text-gray-600 hover:text-gray-600"
            >
              Apply Now
            </a>
          </li>
          <li>
            <a
              href="/admin/public-audit"
              className="text-base font-medium text-gray-600 hover:text-gray-600"
            >
              Transparency
            </a>
          </li>
          <li>
            <a
              target="blank"
              href="https://algorand.com"
              className="text-base font-medium text-gray-600 hover:text-gray-600"
            >
              Powered by Algorand
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
