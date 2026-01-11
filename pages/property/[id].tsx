import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import PropertyDetail from "@/components/property/PropertyDetail";
import ReviewSection from "@/components/property/ReviewSection";

export default function PropertyDetailPage() {
  const router = useRouter();
  const { id } = router.query; // Extracts the dynamic ID from the URL
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      // Don't run the fetch until the router is ready and ID exists
      if (!id) return;

      try {
        setLoading(true);
        const response = await axios.get(`/api/properties/${id}`);
        setProperty(response.data);
      } catch (err) {
        console.error("Error fetching property details:", err);
        setError("Could not load property details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center p-10">
        <p className="text-xl font-semibold">Loading Property Details...</p>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="flex justify-center p-10">
        <p className="text-red-500">{error || "Property not found"}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Pass the dynamic property data to the component */}
      <PropertyDetail property={property} />
      
      {/* Task 3 Integration: Review Section */}
      <ReviewSection propertyId={id as string} />
    </div>
  );
}