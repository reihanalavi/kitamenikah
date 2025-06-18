
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Search, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const templatesData = [
  {
    id: 1,
    name: "Elegant Rose",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=400&fit=crop",
    price: "Rp 299.000",
    category: "Premium",
    tags: ["Klasik", "Elegan", "Bunga"]
  },
  {
    id: 2,
    name: "Modern Minimalist",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=400&fit=crop",
    price: "Rp 199.000",
    category: "Lite",
    tags: ["Modern", "Minimalis", "Simple"]
  },
  {
    id: 3,
    name: "Classic Vintage",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=400&fit=crop",
    price: "Rp 249.000",
    category: "Premium",
    tags: ["Vintage", "Klasik", "Retro"]
  },
  {
    id: 4,
    name: "Tropical Garden",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=400&fit=crop",
    price: "Rp 199.000",
    category: "Lite",
    tags: ["Tropical", "Alam", "Hijau"]
  },
  {
    id: 5,
    name: "Royal Gold",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
    price: "Rp 399.000",
    category: "Premium",
    tags: ["Mewah", "Emas", "Royal"]
  },
  {
    id: 6,
    name: "Beach Sunset",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    price: "Rp 179.000",
    category: "Lite",
    tags: ["Pantai", "Sunset", "Romantis"]
  },
  {
    id: 7,
    name: "Floral Paradise",
    image: "https://images.unsplash.com/photo-1464822759844-d150baec7953?w=300&h=400&fit=crop",
    price: "Rp 329.000",
    category: "Premium",
    tags: ["Bunga", "Paradise", "Colorful"]
  },
  {
    id: 8,
    name: "City Lights",
    image: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?w=300&h=400&fit=crop",
    price: "Rp 229.000",
    category: "Lite",
    tags: ["Urban", "Modern", "Malam"]
  }
];

const allTags = Array.from(new Set(templatesData.flatMap(template => template.tags)));

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");

  const filteredTemplates = templatesData.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    const matchesTag = selectedTag === "all" || template.tags.includes(selectedTag);
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-16">
        {/* Header Section */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-6">
              <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                Kembali ke Beranda
              </Link>
            </div>
            
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Koleksi Template Undangan
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
                Temukan template undangan pernikahan yang sempurna untuk hari bahagia Anda. 
                Pilih dari berbagai kategori dan gaya yang tersedia.
              </p>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 bg-white border-b">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Cari template..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <div className="flex gap-4 items-center">
                <span className="text-sm font-medium text-gray-700">Kategori:</span>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua</SelectItem>
                    <SelectItem value="Lite">Lite</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tag Filter */}
              <div className="flex gap-4 items-center">
                <span className="text-sm font-medium text-gray-700">Tag:</span>
                <Select value={selectedTag} onValueChange={setSelectedTag}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Tag</SelectItem>
                    {allTags.map(tag => (
                      <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 text-sm text-gray-600">
              Menampilkan {filteredTemplates.length} dari {templatesData.length} template
            </div>
          </div>
        </section>

        {/* Templates Grid */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {filteredTemplates.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-gray-600">Tidak ada template yang ditemukan dengan filter yang dipilih.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredTemplates.map((template) => (
                  <Card key={template.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="relative overflow-hidden">
                      <img 
                        src={template.image} 
                        alt={template.name}
                        className="aspect-[3/4] w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge 
                          variant={template.category === "Premium" ? "default" : "secondary"}
                          className={template.category === "Premium" ? "bg-amber-500 text-white" : ""}
                        >
                          {template.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {template.name}
                      </h3>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {template.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <p className="text-2xl font-bold text-gray-900 mb-4">
                        {template.price}
                      </p>
                      
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm" className="w-full">
                          Live Preview
                        </Button>
                        <Button size="sm" className="w-full">
                          Beli Sekarang
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Templates;
