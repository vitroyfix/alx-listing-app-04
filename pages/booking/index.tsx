import { useState } from "react";
import axios from "axios";
import BookingForm from "@/components/booking/BookingForm";
import OrderSummary from "@/components/booking/OrderSummary";
import CancellationPolicy from "@/components/booking/CancellationPolicy";

export default function BookingPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hardcoded for UI display, but the submission will be dynamic
  const bookingDetails = {
    propertyName: "Villa Arrecife Beach House",
    price: 7500,
    bookingFee: 65,
    totalNights: 3,
    startDate: "24 August 2024",
  };

  const handleConfirmBooking = async (formData: any) => {
    setLoading(true);
    setError(null);

    try {
      // POST the form data + booking summary details to the API
      const response = await axios.post("/api/bookings", {
        ...formData,
        ...bookingDetails,
      });

      if (response.status === 200 || response.status === 201) {
        alert("Booking confirmed successfully!");
      }
    } catch (err) {
      setError("Failed to submit booking. Please try again.");
      console.error("Booking Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          {/* Pass the submission handler to the form component */}
          <BookingForm onSubmit={handleConfirmBooking} loading={loading} />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <CancellationPolicy />
        </div>
        <OrderSummary bookingDetails={bookingDetails} />
      </div>
    </div>
  );
}