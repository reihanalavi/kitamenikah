
import { Button } from "@/components/ui/button";
import { usePricing } from "@/hooks/usePricing";

const PricingSection = () => {
  const { data: pricingData, isLoading, error } = usePricing();

  if (isLoading) {
    return (
      <section id="pricing" className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-slate-600">Pricing</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Pilih Paket Sesuai Kebutuhan
            </p>
          </div>
          <div className="flex justify-center mt-16">
            <p className="text-gray-600">Loading pricing data...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="pricing" className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-slate-600">Pricing</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Pilih Paket Sesuai Kebutuhan
            </p>
          </div>
          <div className="flex justify-center mt-16">
            <p className="text-red-600">Error loading pricing data. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

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
          {pricingData?.map((plan, index) => {
            const isPopular = index === 1; // Make middle plan popular
            return (
              <div key={plan.id} className={`flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 xl:p-10 ${
                isPopular 
                  ? 'ring-2 ring-slate-600 lg:z-10 lg:rounded-b-none' 
                  : 'ring-gray-200 lg:mt-8 lg:rounded-t-none'
              }`}>
                <div>
                  <div className="flex items-center justify-between gap-x-4">
                    <h3 className="text-lg font-semibold leading-8 text-slate-900">
                      {plan.paket}
                    </h3>
                    {isPopular && (
                      <p className="rounded-full bg-slate-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-slate-600">
                        Paling Populer
                      </p>
                    )}
                  </div>
                  <p className="mt-4 text-sm leading-6 text-gray-600">{plan.deskripsi_paket}</p>
                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-gray-900">
                      Rp {plan.harga_paket.toLocaleString('id-ID')}
                    </span>
                  </p>
                  <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                    {plan.PricingBenefit?.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex gap-x-3">
                        <span className="text-slate-600">✓</span>
                        {benefit.benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button 
                  className={`mt-8 ${isPopular ? '' : 'bg-white text-slate-600 ring-1 ring-inset ring-slate-200 hover:ring-slate-300'}`}
                  variant={isPopular ? 'default' : 'outline'}
                >
                  Pilih Paket
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
