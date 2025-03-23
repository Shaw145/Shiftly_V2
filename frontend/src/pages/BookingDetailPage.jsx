import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddressInfo from "../components/myBookings/AddressInfo";
import PriceSection from "../components/myBookings/PriceSection";
import BookingStatusBadge from "../components/myBookings/BookingStatusBadge";
import {
  FaTruck,
  FaBox,
  FaShieldAlt,
  FaClock,
  FaUserCircle,
  FaStar,
  FaTimes,
  FaInfoCircle,
} from "react-icons/fa";
import CancelledBookingInfo from "../components/myBookings/CancelledBookingInfo";
import CancelConfirmationModal from "../components/myBookings/CancelConfirmationModal";
import { format, differenceInHours } from "date-fns";

/**
 * @typedef {Object} DriverBid
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {number} rating
 * @property {number} trips
 * @property {string} vehicle
 * @property {string} [image]
 * @property {Date} bidTime
 * @property {'pending' | 'accepted' | 'rejected'} status
 */

const BookingDetailPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState(null);
  const [cancelReason, setCancelReason] = useState("");

  /** @type {[DriverBid[], Function]} */
  const [driverBids, setDriverBids] = useState([
    {
      id: "1",
      name: "Rahul Singh",
      price: 5500,
      rating: 4.5,
      trips: 120,
      vehicle: "Tata Ace",
      bidTime: new Date(),
      status: "pending",
    },
    {
      id: "2",
      name: "Amit Kumar",
      price: 6000,
      rating: 4.8,
      trips: 200,
      vehicle: "Mahindra Pickup",
      bidTime: new Date(),
      status: "pending",
    },
  ]);

  useEffect(() => {
    fetchBookingDetails();
  }, [bookingId]);

  const fetchBookingDetails = async () => {
    try {
      const response = await fetch(
        `https://shiftly-backend.onrender.com/api/bookings/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setBooking(data.booking);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching booking details:", error);
      setLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    setCancelling(true);
    setCancelError(null);

    try {
      const response = await fetch(
        `https://shiftly-backend.onrender.com/api/bookings/${bookingId}/cancel`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            reason: cancelReason || "Cancelled by user",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to cancel booking");
      }

      setBooking(data.booking);
      setShowCancelModal(false);

      // Show success toast
      const successToast = document.createElement("div");
      successToast.className =
        "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2";
      successToast.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>Booking cancelled successfully</span>
      `;
      document.body.appendChild(successToast);

      setTimeout(() => {
        successToast.remove();
      }, 3000);
    } catch (error) {
      // Show error toast
      const errorToast = document.createElement("div");
      errorToast.className =
        "fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2";
      errorToast.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        <span>${error.message}</span>
      `;
      document.body.appendChild(errorToast);

      setTimeout(() => {
        errorToast.remove();
      }, 3000);
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 p-4 lg:pl-72 mt-20">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="flex-1 p-4 lg:pl-72 mt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Booking Not Found
          </h2>
          <p className="text-gray-600">
            The booking you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 mt-20 md:ml-22 lg:ml-24">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Booking #{bookingId}
              </h1>
              <div className="flex items-center gap-3">
                <BookingStatusBadge status={booking.status} />
                <span className="text-gray-500">
                  Created on {new Date(booking.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            {booking.status === "pending" && (
              <button
                onClick={() => setShowCancelModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors cursor-pointer"
              >
                <FaTimes />
                Cancel Booking
              </button>
            )}
          </div>
        </div>

        {booking.status === "cancelled" && (
          <div className="mb-6">
            <CancelledBookingInfo booking={booking} />
          </div>
        )}

        {/* Move Bidding Section to top for pending bookings */}
        {booking.status === "pending" && (
          <div className="mb-6 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Driver Bidding
                  </h2>
                  <p className="mt-2 text-gray-600">
                    Select from available driver bids for your transport
                  </p>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg">
                  <p className="text-lg font-medium text-gray-900">
                    Estimated Price
                  </p>
                  <p className="text-3xl font-bold text-red-600">
                    ₹{booking.estimatedPrice.min} - ₹
                    {booking.estimatedPrice.max}
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                <div className="flex items-start">
                  <FaInfoCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700 font-medium">
                      Important Notice
                    </p>
                    <p className="mt-1 text-sm text-yellow-600">
                      To ensure timely service, please select your preferred
                      driver at least 24 hours before your scheduled pickup
                      time. If no selection is made, our system will
                      automatically assign the most suitable driver based on
                      rating and price to ensure your booking proceeds smoothly.
                    </p>
                    <p className="mt-2 text-sm font-medium text-yellow-700">
                      Pickup scheduled for:{" "}
                      {format(new Date(booking.schedule.date), "PPP")} at{" "}
                      {booking.schedule.time}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Driver Bids Section */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {driverBids.map((driver) => (
                  <div
                    key={driver.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:border-red-500 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center">
                          <FaUserCircle className="w-12 h-12 text-gray-400" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900">
                          {driver.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <FaStar className="text-yellow-400 mr-1" />
                            {driver.rating}
                          </div>
                          <span>•</span>
                          <span>{driver.trips} trips</span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          <FaTruck className="inline mr-1" />
                          {driver.vehicle}
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <p className="text-2xl font-bold text-gray-900">
                            ₹{driver.price}
                          </p>
                          <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors">
                            Select
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Content Grid - Update the layout structure */}
        <div className="grid grid-cols-1 gap-6">
          {/* Main Column */}
          <div className="w-full">
            {/* Address Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <AddressInfo
                pickup={booking.pickup}
                delivery={booking.delivery}
              />
            </div>

            {/* Schedule Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="space-y-6">
                <div className="border-b pb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Schedule Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                      <FaClock className="text-gray-400 text-xl" />
                      <div>
                        <p className="font-medium text-gray-900">Pickup Time</p>
                        <p className="text-gray-600">
                          {format(new Date(booking.schedule.date), "PPP")} at{" "}
                          {booking.schedule.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                      <FaShieldAlt className="text-gray-400 text-xl" />
                      <div>
                        <p className="font-medium text-gray-900">
                          Service Type
                        </p>
                        <p className="text-gray-600">
                          {booking.schedule.urgency} •{" "}
                          {booking.schedule.insurance} Insurance
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Special Instructions */}
                {booking.schedule.specialInstructions && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <FaInfoCircle className="text-blue-500 mt-1" />
                      <div>
                        <p className="font-medium text-blue-700">
                          Special Instructions
                        </p>
                        <p className="mt-1 text-blue-600">
                          {booking.schedule.specialInstructions}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Goods & Vehicle Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="space-y-8">
                {/* Goods Information */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Goods Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                      <FaBox className="text-gray-400 text-xl" />
                      <span className="font-medium text-gray-900">
                        {booking.goods.type
                          .replace(/_/g, " ")
                          .charAt(0)
                          .toUpperCase() +
                          booking.goods.type.replace(/_/g, " ").slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {booking.goods.items.map((item, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex flex-col">
                            <p className="font-medium text-gray-900">
                              {item.name}
                            </p>
                            <div className="mt-2 space-y-1">
                              <p className="text-sm text-gray-600">
                                Quantity: {item.quantity}
                              </p>
                              {item.weight && (
                                <p className="text-sm text-gray-600">
                                  Weight: {item.weight} kg
                                </p>
                              )}
                              {item.note && (
                                <p className="text-sm text-gray-600 mt-2 italic">
                                  Note: {item.note}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Additional Items Section */}
                {booking.goods.additionalItems && (
                  <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <h4 className="font-medium text-gray-900 mb-1">
                      Additional Items:
                    </h4>
                    <p className="text-gray-600">
                      {booking.goods.additionalItems}
                    </p>
                  </div>
                )}

                {/* Transport Details */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Transport Details
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <FaTruck className="text-gray-400 text-xl" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {booking.vehicle}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Total Distance: {booking.distance} km
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Move Price Section here for non-pending bookings */}
            {booking.status !== "pending" && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <PriceSection booking={booking} />
              </div>
            )}
          </div>
        </div>
      </div>

      <CancelConfirmationModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancelBooking}
        loading={cancelling}
        reason={cancelReason}
        setReason={setCancelReason}
      />
    </div>
  );
};

export default BookingDetailPage;
