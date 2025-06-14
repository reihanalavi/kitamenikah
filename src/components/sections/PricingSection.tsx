
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const pricingPlans = [
  {
    name: "Basic",
    price: "Rp 199.000",
    description: "Perfect untuk acara intimate",
    features: [
      "1 Template pilihan",
      "Halaman cover custom",
      "Info acara lengkap",
      "Galeri foto (max 10)",
      "Support WhatsApp"
    ],
    popular: false
  },
  {
    name: "Premium",
    price: "Rp 299.000",
    description: "Paling populer untuk pernikahan",
    features: [
      "3 Template pilihan",
      "Halaman cover custom",
      "Nama tamu personal",
      "Custom musik backsound",
      "Galeri foto & video unlimited",
      "Custom quotes",
      "Support prioritas"
    ],
    popular: true
  },
  {
    name: "Exclusive",
    price: "Rp 499.000",
    description: "Fitur terlengkap untuk acara mewah",
    features: [
      "All templates available",
      "Custom design request",
      "Nama tamu personal",
      "Multiple musik pilihan",
      "Galeri foto & video unlimited",
      "Live streaming integration",
      "RSVP management",
      "Analytics dashboard",
      "Dedicated support"
    ],
    popular: false
  }
];

const PricingSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Pilih Paket Sesuai Kebutuhan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dapatkan undangan pernikahan digital terbaik dengan harga yang terjangkau
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-pink-500 border-2 shadow-xl scale-105' : 'shadow-lg'}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Paling Populer
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                </div>
                <CardDescription className="text-lg mt-2">{plan.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full py-3 text-lg ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700' 
                      : ''
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  Pilih Paket
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
