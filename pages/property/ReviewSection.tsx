import axios from "axios";
import { useState, useEffect } from "react";

interface Review {
  id: string;
  user: string;
  comment: string;
  rating: number;
}

const ReviewSection = ({ propertyId }: { propertyId: string }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!propertyId) return;

      try {
        setLoading(true);
        // Task 3: Fetch reviews for the specific property
        const response = await axios.get(`/api/properties/${propertyId}/reviews`);
        setReviews(response.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [propertyId]);

  if (loading) {
    return <p className="text-gray-500 italic">Loading reviews...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="text-2xl font-bold mb-4">Guest Reviews</h3>
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-lg">{review.user}</span>
                <span className="text-yellow-500">{"★".repeat(review.rating)}</span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No reviews yet for this property.</p>
      )}
    </div>
  );
};

export default ReviewSection;