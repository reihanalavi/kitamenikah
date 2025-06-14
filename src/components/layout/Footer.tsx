
const Footer = () => {
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                <span className="text-sm font-bold text-gray-900">K</span>
              </div>
              <span className="text-xl font-bold text-white">KitaMenikah</span>
            </div>
            <p className="text-sm leading-6 text-gray-300">
              Platform terdepan untuk membuat undangan pernikahan digital yang personal dan berkesan. 
              Wujudkan hari bahagia Anda dengan undangan yang tak terlupakan.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Layanan</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a href="#" className="text-sm leading-6 text-gray-300 hover:text-white">
                      Template Undangan
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm leading-6 text-gray-300 hover:text-white">
                      Custom Design
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm leading-6 text-gray-300 hover:text-white">
                      Galeri Foto & Video
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm leading-6 text-gray-300 hover:text-white">
                      RSVP Management
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold leading-6 text-white">Kontak</h3>
              <ul role="list" className="mt-6 space-y-4">
                <li>
                  <span className="text-sm leading-6 text-gray-300">
                    Email: hello@kitamenikah.com
                  </span>
                </li>
                <li>
                  <span className="text-sm leading-6 text-gray-300">
                    WhatsApp: +62 812-3456-7890
                  </span>
                </li>
                <li>
                  <span className="text-sm leading-6 text-gray-300">
                    Instagram: @kitamenikah
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400">
            &copy; 2024 KitaMenikah. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
