import axios from "axios";
import { useEffect, useState } from "react";
import PropertyCard from "@/components/property/PropertyCard";
import Hero from "@/components/common/Hero"; // Assuming you have a Hero component

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        // Task 0: Fetch the list of properties
        const response = await axios.get("/api/properties");
        setProperties(response.data);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to load listings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-2xl font-bold">Loading amazing stays...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <main>
      <Hero />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Explore Properties</h1>
        
        {/* Task 0: Grid display of dynamic data */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property: any) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        
        {properties.length === 0 && (
          <p className="text-center text-gray-500">No properties found.</p>
        )}
      </div>
    </main>
  );
}