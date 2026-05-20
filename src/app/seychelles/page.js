import Image from 'next/image';
import Link from 'next/link';
import { FaUmbrellaBeach, FaFish, FaHiking, FaTree, FaSun, FaHeart, FaCamera, FaShip, FaMountain, FaCar, FaLeaf } from 'react-icons/fa';

export default function SeychellesPage() {
  const sections = [
    { title: "History of Seychelles", icon: FaHeart, bg: "bg-gradient-to-r from-amber-900/40 to-red-900/40", text: "Seychelles was uninhabited until the 18th century when French settlers arrived with slaves. The islands became a British colony in 1814 and gained independence in 1976. Today, it's a vibrant Creole nation known for its unique blend of African, European, and Asian influences." },
    { title: "Creole Culture", icon: FaCamera, bg: "bg-gradient-to-r from-blue-900/40 to-teal-900/40", text: "The Seychellois Creole culture is a beautiful fusion of African, French, British, Chinese, and Indian traditions. Music like Séga and Moutya, dance, colorful festivals like Festival Kreol (October), and delicious cuisine like fish curry, octopus curry, and ladob are central to island life." },
    { title: "Pristine Beaches", icon: FaUmbrellaBeach, bg: "bg-gradient-to-r from-cyan-900/40 to-emerald-900/40", text: "Seychelles is home to some of the world's most beautiful beaches. Anse Source d'Argent (La Digue) with its pink granite boulders, Anse Lazio (Praslin) consistently ranked top 10 globally, and Beau Vallon (Mahé) perfect for swimming and snorkeling." },
    { title: "Marine Life", icon: FaFish, bg: "bg-gradient-to-r from-indigo-900/40 to-purple-900/40", text: "The waters around Seychelles are teeming with life. Snorkel or dive with whale sharks (October-March), sea turtles, manta rays, tropical fish, and explore coral reefs. Sainte Anne Marine National Park and Aldabra Atoll (UNESCO site) are must-visits." },
    { title: "Hiking Trails", icon: FaHiking, bg: "bg-gradient-to-r from-green-900/40 to-lime-900/40", text: "For nature lovers, Seychelles offers incredible hiking. Morne Seychellois National Park (Mahé) has trails through lush forests to the highest peak. Copolia Trail offers panoramic views, while Anse Major combines hiking with a beautiful beach reward." },
    { title: "Unique Flora & Fauna", icon: FaLeaf, bg: "bg-gradient-to-r from-yellow-900/40 to-orange-900/40", text: "Seychelles is a biodiversity hotspot with endemic species like the Coco de Mer (world's largest nut), giant Aldabra tortoises, black parrots, and the jellyfish tree. Vallée de Mai Nature Reserve (Praslin) is a UNESCO World Heritage site." }
  ];

  const islands = [
    { name: "Mahé", desc: "The largest island, home to the capital Victoria, Morne Seychellois National Park, and beautiful beaches like Beau Vallon.", image: "/images/mahe.jpg" },
    { name: "Praslin", desc: "Famous for Vallée de Mai (Coco de Mer forest) and Anse Lazio, one of the world's most beautiful beaches.", image: "/images/praslin.jpg" },
    { name: "La Digue", desc: "Known for its timeless beauty, granite boulders at Anse Source d'Argent, and traditional ox-cart transport.", image: "/images/ladigue.jpg" }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-20">
      {/* Hero */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image src="/images/seychelles-hero.jpg" alt="Seychelles Paradise" fill className="object-cover opacity-40" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">Seychelles<span className="text-yellow-400"> Paradise</span></h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">115 islands in the Indian Ocean • UNESCO World Heritage • Pristine beaches • Unique culture</p>
        </div>
      </div>

      {/* Introduction */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Welcome to <span className="text-yellow-400">Seychelles</span></h2>
          <p className="text-gray-300">An archipelago of breathtaking beauty where granite boulders meet turquoise waters, and where a unique Creole culture welcomes you with warmth and hospitality. Let Valmont Car Rent be your guide to explore this tropical paradise.</p>
        </div>

        {/* Islands */}
        <h3 className="text-2xl font-bold text-center mb-8">Explore Our Main <span className="text-yellow-400">Islands</span></h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {islands.map((island, i) => (
            <div key={i} className="bg-gray-800/50 rounded-xl overflow-hidden border border-yellow-400/20 hover:border-yellow-400/50 transition-all">
              <div className="relative h-48 w-full">
                <Image src={island.image} alt={island.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-yellow-400 mb-2">{island.name}</h4>
                <p className="text-gray-300">{island.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Culture Sections */}
        <h3 className="text-2xl font-bold text-center mb-8">Discover <span className="text-yellow-400">Seychellois Culture</span></h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {sections.map((section, i) => (
            <div key={i} className={`${section.bg} rounded-xl p-6 border border-yellow-400/20 hover:border-yellow-400/40 transition-all group`}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-yellow-400/20 rounded-full group-hover:scale-110 transition-transform">
                  <section.icon className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold text-white">{section.title}</h3>
              </div>
              <p className="text-gray-200 leading-relaxed">{section.text}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center py-12 bg-yellow-400/10 rounded-2xl border border-yellow-400/20">
          <h3 className="text-2xl font-bold mb-4">Ready to Explore Seychelles?</h3>
          <p className="text-gray-300 mb-6">Rent a car with Valmont Car Rent and discover paradise at your own pace.</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-all">
            <FaCar /> Book Your Vehicle Now
          </Link>
        </div>
      </div>
    </main>
  );
}