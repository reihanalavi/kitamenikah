
import { Mail, Instagram } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppContact = () => {
    const whatsappUrl = `https://wa.me/6285700397919`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailContact = () => {
    window.location.href = 'mailto:undangansekapursirihid@gmail.com';
  };

  const handleInstagramContact = () => {
    window.open('https://www.instagram.com/sekapursirihid/', '_blank');
  };

  return (
    <motion.footer 
      className="bg-gray-900" 
      aria-labelledby="footer-heading"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2">
              <img 
                src="https://jjpfoguzwsoweehfzmxi.supabase.co/storage/v1/object/sign/kitamenikah/sekapursirih-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80MWJkZjViNS0zNDZkLTQyYWQtOTg5ZS1iMTI0NDgxYzIxY2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJraXRhbWVuaWthaC9zZWthcHVyc2lyaWgtbG9nby5wbmciLCJpYXQiOjE3NTEyMjMxNTMsImV4cCI6MTc4Mjc1OTE1M30.Q2C1Zhm-4GeCdwx_vLw2_oM0oKh4vwoi9AAbcZTw3fc" 
                alt="SekapurSirih"
                className="h-8 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-sm leading-6 text-gray-300">
              Platform terdepan untuk membuat undangan pernikahan digital yang personal dan berkesan. 
              Wujudkan hari bahagia Anda dengan undangan yang tak terlupakan.
            </p>
          </motion.div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-sm font-semibold leading-6 text-white">Layanan</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <button 
                      onClick={() => scrollToSection('templates')}
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Template Undangan
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('features')}
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Fitur
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('pricing')}
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Biaya
                    </button>
                  </li>
                </ul>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm font-semibold leading-6 text-white">Kontak</h3>
              <ul role="list" className="mt-6 space-y-4">
                {/* <li>
                  <button 
                    onClick={handleEmailContact}
                    className="flex items-center gap-2 text-sm leading-6 text-gray-300 hover:text-white"
                  >
                    <Mail className="h-4 w-4" />
                    undangansekapursirihid@gmail.com
                  </button>
                </li> */}
                <li>
                  <button 
                    onClick={handleWhatsAppContact}
                    className="flex items-center gap-2 text-sm leading-6 text-gray-300 hover:text-white"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z"/>
                    </svg>
                    +62 857‑0039‑7919
                  </button>
                </li>
                <li>
                  <button 
                    onClick={handleInstagramContact}
                    className="flex items-center gap-2 text-sm leading-6 text-gray-300 hover:text-white"
                  >
                    <Instagram className="h-4 w-4" />
                    @sekapursirihid
                  </button>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
        <motion.div 
          className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-xs leading-5 text-gray-400">
            &copy; 2025 SekapurSirih. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
