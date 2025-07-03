
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";

interface CheckoutFormProps {
  formData: {
    nama: string;
    email: string;
    phone: string;
    alamat: string;
    catatan: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isPendingTransaction: boolean;
}

const CheckoutForm = ({ formData, onInputChange, isPendingTransaction }: CheckoutFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Informasi Pemesanan
        </CardTitle>
        <CardDescription>
          {isPendingTransaction 
            ? "Data yang tersimpan dari transaksi sebelumnya"
            : "Isi data Anda dengan lengkap dan benar"
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nama">Nama Lengkap *</Label>
          <Input
            id="nama"
            name="nama"
            type="text"
            placeholder="Masukkan nama lengkap"
            value={formData.nama}
            onChange={onInputChange}
            required
            disabled={isPendingTransaction}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="nama@email.com"
            value={formData.email}
            onChange={onInputChange}
            required
            disabled={true}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">No. WhatsApp *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="08xxxxxxxxxx"
            value={formData.phone}
            onChange={onInputChange}
            required
            disabled={isPendingTransaction}
          />
        </div>

        {!isPendingTransaction && (
          <>
            <div className="space-y-2">
              <Label htmlFor="alamat">Alamat *</Label>
              <Textarea
                id="alamat"
                name="alamat"
                placeholder="Masukkan alamat lengkap"
                value={formData.alamat}
                onChange={onInputChange}
                className="min-h-[80px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="catatan">Catatan Tambahan</Label>
              <Textarea
                id="catatan"
                name="catatan"
                placeholder="Catatan khusus untuk pesanan Anda (opsional)"
                value={formData.catatan}
                onChange={onInputChange}
                className="min-h-[80px]"
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CheckoutForm;
