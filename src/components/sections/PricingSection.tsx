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
    <section id="pricing" className="py-24 sm:py-32 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-slate-600">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Pilih Paket Sesuai Kebutuhan
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Dapatkan undangan pernikahan digital terbaik dengan harga yang terjangkau
        </p>
        
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <div key={index} className={`flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 xl:p-10 ${
              plan.popular 
                ? 'ring-2 ring-slate-600 lg:z-10 lg:rounded-b-none' 
                : 'ring-gray-200 lg:mt-8 lg:rounded-t-none'
            }`}>
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3 className="text-lg font-semibold leading-8 text-slate-900">
                    {plan.name}
                  </h3>
                  {plan.popular && (
                    <p className="rounded-full bg-slate-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-slate-600">
                      Paling Populer
                    </p>
                  )}
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">{plan.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">{plan.price}</span>
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex gap-x-3">
                      <span className="text-slate-600">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button 
                className={`mt-8 ${plan.popular ? '' : 'bg-white text-slate-600 ring-1 ring-inset ring-slate-200 hover:ring-slate-300'}`}
                variant={plan.popular ? 'default' : 'outline'}
              >
                Pilih Paket
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
