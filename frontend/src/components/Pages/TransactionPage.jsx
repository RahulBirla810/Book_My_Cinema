import React, { useEffect, useState } from "react";
import TicketBox from "../common/TicketBox";
import { fetchAllBookings, cancelBooking } from "../../redux/reducer/bookingSlice";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../common/NavBar";
import HomeSlider from "../common/HomeSlider";
import { toast } from "react-hot-toast";

const TransactionPage = () => {
  const dispatch = useDispatch();
  const { bookings, loading } = useSelector((state) => state.book);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid Date";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const formatShowDateTime = (showStartStr) => {
    if (!showStartStr) return { date: "N/A", time: "N/A" };
    const date = new Date(showStartStr);
    return {
      date: date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
  };

  const formatBookingDate = (bookingDateStr) => {
    if (!bookingDateStr) return "N/A";
    const date = new Date(bookingDateStr);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const ticketClickHandler = (booking) => {
    setSelectedBooking(booking);
  };

  const handleCancelTicket = async (bookingId, reason) => {
    try {
      const resultAction = await dispatch(cancelBooking({ bookingId, reason }));
      if (cancelBooking.fulfilled.match(resultAction)) {
        toast.success("Ticket cancelled successfully!");
        setSelectedBooking(null); // Close modal if open
      } else {
        toast.error(resultAction.payload || "Failed to cancel ticket");
      }
    } catch (err) {
      toast.error("An unexpected error occurred during cancellation");
    }
  };

  const getStatusBadge = (booking) => {
    const isCancelled = booking.bookingStatus === "Cancelled" || booking.status === "CANCELLED";
    if (isCancelled) {
      return (
        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 border border-red-200">
          Cancelled
        </span>
      );
    }
    const now = new Date();
    const showStart = booking.showId ? new Date(booking.showId.showStart) : null;
    if (showStart && now >= showStart) {
      return (
        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 border border-gray-200">
          Completed
        </span>
      );
    }
    return (
      <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 border border-green-200">
        Booked
      </span>
    );
  };

  useEffect(() => {
    dispatch(fetchAllBookings());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <div className="custom-loader"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <NavBar />
      <div className="hidden sm:block">
        <HomeSlider isShow={false} />
      </div>
      <div className="mt-6 mb-5 flex flex-col justify-center items-center">
        <h1 className="text-2xl sm:text-[26px] lg:text-[34px] text-rose-500 font-bold tracking-tight">
          🎟️ Booking History
        </h1>
        <div className="mt-8 px-4 sm:px-8 max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!bookings || bookings.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              No bookings found.
            </div>
          ) : (
            bookings.map((booking) => {
              const isCancelled = booking.bookingStatus === "Cancelled" || booking.status === "CANCELLED";
              const showStart = booking.showId ? new Date(booking.showId.showStart) : null;
              const now = new Date();
              const isShowStarted = showStart ? now >= showStart : false;
              const { date: showDateStr, time: showTimeStr } = formatShowDateTime(booking.showId?.showStart);

              return (
                <div
                  key={booking._id}
                  className={`bg-white rounded-xl shadow-md border overflow-hidden transition-all duration-200 hover:shadow-lg flex flex-col justify-between ${
                    isCancelled ? "opacity-60 border-red-200 bg-red-50/10" : "border-gray-200"
                  }`}
                >
                  <div>
                    {/* Header Image Banner or Placeholder */}
                    <div className="h-44 bg-gray-100 relative overflow-hidden flex items-center justify-center">
                      {booking.showId?.movieId?.thumbnail ? (
                        <img
                          src={booking.showId.movieId.thumbnail}
                          alt="Movie Poster"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-gray-400 font-semibold text-lg">Movie Poster</div>
                      )}
                      <div className="absolute top-3 right-3">
                        {getStatusBadge(booking)}
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <h2 className="text-lg font-bold text-gray-800 line-clamp-1">
                        {booking.showId?.movieId?.movieName || "N/A"}
                      </h2>

                      <div className="space-y-1.5 text-sm text-gray-600">
                        <p>
                          <span className="font-semibold text-gray-500">Cinema:</span>{" "}
                          <span className="text-gray-800 font-medium">
                            {booking.showId?.cinemaId?.cinemaName || "N/A"}
                          </span>
                        </p>
                        <p>
                          <span className="font-semibold text-gray-500">Show Date:</span>{" "}
                          <span className="text-gray-800 font-medium">{showDateStr}</span>
                        </p>
                        <p>
                          <span className="font-semibold text-gray-500">Show Time:</span>{" "}
                          <span className="text-gray-800 font-medium">{showTimeStr}</span>
                        </p>
                        <p>
                          <span className="font-semibold text-gray-500">Seats:</span>{" "}
                          <span className="text-gray-800 font-mono font-medium">
                            {booking.bookedSeats?.map((s) => s.seatId?.seatNumber).join(", ") || "N/A"}
                          </span>
                        </p>
                        <p>
                          <span className="font-semibold text-gray-500">Amount Paid:</span>{" "}
                          <span className="text-rose-600 font-semibold">Rs. {booking.totalAmount}</span>
                        </p>
                        <p>
                          <span className="font-semibold text-gray-500">Booking Date:</span>{" "}
                          <span className="text-gray-800 font-medium">
                            {formatBookingDate(booking.bookingDate || booking.createdAt)}
                          </span>
                        </p>
                        <p className="text-xs text-gray-400 truncate mt-1">
                          ID: {booking._id}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="p-5 bg-gray-50 border-t flex items-center justify-between gap-3">
                    <button
                      onClick={() => ticketClickHandler(booking)}
                      className="flex-1 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-semibold transition-all text-sm text-center"
                    >
                      View Ticket
                    </button>
                    
                    {!isCancelled && (
                      isShowStarted ? (
                        <button
                          disabled
                          className="flex-1 py-2 rounded-lg bg-gray-200 text-gray-400 font-semibold text-sm cursor-not-allowed"
                        >
                          Cancellation Closed
                        </button>
                      ) : (
                        <button
                          onClick={() => ticketClickHandler(booking)}
                          className="flex-1 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 font-semibold transition-all text-sm text-center"
                        >
                          Cancel Ticket
                        </button>
                      )
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {selectedBooking && (
        <TicketBox
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onCancel={handleCancelTicket}
        />
      )}
    </div>
  );
};

export default TransactionPage;
