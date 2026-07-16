import React, { useState } from "react";

const TicketBox = ({ booking, onClose, onCancel }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [reason, setReason] = useState("");

  if (!booking) {
    return null;
  }

  const showStart = booking.showId ? new Date(booking.showId.showStart) : null;
  const now = new Date();
  const isCancelled = booking.bookingStatus === "Cancelled" || booking.status === "CANCELLED";
  const isShowStarted = showStart ? now >= showStart : false;

  // Formatting dates and times
  const formatShowDate = (dateObj) => {
    if (!dateObj) return "N/A";
    return dateObj.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatShowTime = (dateObj) => {
    if (!dateObj) return "N/A";
    return dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatBookingDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleCancelClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmCancel = () => {
    if (onCancel) {
      onCancel(booking._id, reason);
    }
    setShowConfirm(false);
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-65 flex justify-center items-center p-4 z-[9999]">
      <div className="bg-white p-6 rounded-xl shadow-2xl max-w-lg w-full relative overflow-y-auto max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold text-gray-800">🎟️ Ticket Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-xl">&times;</button>
        </div>

        {/* Cancelled watermark / alert */}
        {isCancelled && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center font-semibold">
            🚫 THIS BOOKING HAS BEEN CANCELLED
          </div>
        )}

        {/* Show Completed Info */}
        {!isCancelled && isShowStarted && (
          <div className="mb-4 bg-gray-50 border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-center font-medium">
            ✅ Show Completed / In Progress
          </div>
        )}

        {/* Info Grid */}
        <div className="space-y-3 text-sm sm:text-base text-gray-700">
          <div>
            <span className="font-semibold text-gray-500 block text-xs uppercase">Booking ID</span>
            <span className="font-mono text-gray-800">{booking._id}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-semibold text-gray-500 block text-xs uppercase">Movie</span>
              <span className="font-bold text-blue-600">{booking.showId?.movieId?.movieName || "N/A"}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-500 block text-xs uppercase">Cinema</span>
              <span className="font-bold text-blue-600">{booking.showId?.cinemaId?.cinemaName || "N/A"}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-semibold text-gray-500 block text-xs uppercase">Screen</span>
              <span className="font-medium text-gray-800">{booking.showId?.screenId ? "Screen 1" : "Screen 1"}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-500 block text-xs uppercase">Timing</span>
              <span className="font-medium text-green-600 font-semibold">{booking.showId?.timing || "N/A"}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-semibold text-gray-500 block text-xs uppercase">Show Date</span>
              <span className="font-medium text-gray-800">{formatShowDate(showStart)}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-500 block text-xs uppercase">Show Time</span>
              <span className="font-medium text-gray-800">{formatShowTime(showStart)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-semibold text-gray-500 block text-xs uppercase">Booking Date & Time</span>
              <span className="font-medium text-gray-800">{formatBookingDate(booking.bookingDate || booking.createdAt)}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-500 block text-xs uppercase">Ticket Amount</span>
              <span className="font-semibold text-rose-600">Rs. {booking.totalAmount}</span>
            </div>
          </div>

          <div>
            <span className="font-semibold text-gray-500 block text-xs uppercase">Seats</span>
            <span className="font-medium text-gray-800 bg-gray-100 px-2.5 py-1 rounded inline-block mt-1 font-mono">
              {booking.bookedSeats?.map((s) => s.seatId?.seatNumber).join(", ") || "N/A"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-semibold text-gray-500 block text-xs uppercase">Payment Status</span>
              <span className={`font-semibold ${isCancelled ? "text-red-500" : "text-green-600"}`}>
                {isCancelled ? "Refunded / Cancelled" : "Paid"}
              </span>
            </div>
            <div>
              <span className="font-semibold text-gray-500 block text-xs uppercase">Booking Status</span>
              <span className={`font-bold px-2 py-0.5 rounded text-xs inline-block ${
                isCancelled ? "bg-red-100 text-red-800" : isShowStarted ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
              }`}>
                {isCancelled ? "Cancelled" : isShowStarted ? "Completed" : "Booked"}
              </span>
            </div>
          </div>
        </div>

        {/* QR Code section */}
        {!isCancelled && booking.qrImage && (
          <div className="mt-5 flex flex-col items-center justify-center border-t pt-4">
            <span className="font-semibold text-gray-500 text-xs uppercase mb-2">Entry QR Code</span>
            <img
              src={booking.qrImage}
              alt="Booking QR Code"
              className="w-36 h-36 border border-gray-200 rounded p-1 shadow-sm"
            />
          </div>
        )}

        {/* Cancellation Section */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 border-t pt-4 justify-end">
          {!isCancelled && (
            isShowStarted ? (
              <button
                disabled
                className="bg-gray-200 text-gray-400 py-2.5 px-5 rounded-lg cursor-not-allowed font-semibold w-full sm:w-auto"
              >
                Cancellation Closed
              </button>
            ) : (
              <button
                onClick={handleCancelClick}
                className="bg-red-500 hover:bg-red-600 text-white py-2.5 px-5 rounded-lg font-semibold transition-all w-full sm:w-auto"
              >
                Cancel Ticket
              </button>
            )
          )}
          
          <button
            onClick={onClose}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 px-5 rounded-lg font-semibold transition-all w-full sm:w-auto"
          >
            Close
          </button>
        </div>

        {/* Cancellation Confirmation Dialog Overlay */}
        {showConfirm && (
          <div className="absolute inset-0 bg-white bg-opacity-95 flex flex-col justify-center items-center p-6 rounded-xl z-50">
            <div className="text-center space-y-4 max-w-sm">
              <span className="text-4xl">⚠️</span>
              <h3 className="text-lg font-bold text-gray-800">Confirm Ticket Cancellation</h3>
              <p className="text-gray-600 text-sm">
                Are you sure you want to cancel this ticket? This action is permanent and will release your reserved seats.
              </p>
              
              <div className="text-left">
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Reason for cancellation (optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Change of plans"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="flex gap-4 justify-center pt-2">
                <button
                  onClick={handleConfirmCancel}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-all text-sm"
                >
                  Confirm
                </button>
                <button
                  onClick={handleCloseConfirm}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg transition-all text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default TicketBox;
