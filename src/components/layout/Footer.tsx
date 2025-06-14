
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h3 className="text-2xl font-bold mb-4">KitaMenikah</h3>
            <p className="text-gray-300 mb-4">
              Platform terdepan untuk membuat undangan pernikahan digital yang personal dan berkesan. 
              Wujudkan hari bahagia Anda dengan undangan yang tak terlupakan.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Template Undangan</li>
              <li>Custom Design</li>
              <li>Galeri Foto & Video</li>
              <li>RSVP Management</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Email: hello@kitamenikah.com</li>
              <li>WhatsApp: +62 812-3456-7890</li>
              <li>Instagram: @kitamenikah</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 KitaMenikah. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
