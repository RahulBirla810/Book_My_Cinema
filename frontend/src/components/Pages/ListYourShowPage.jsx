import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitListing } from "../../redux/reducer/categorySlice";
import NavBar from "../common/NavBar";
import HomeSlider from "../common/HomeSlider";

const ListYourShowPage = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.category);

  const [formData, setFormData] = useState({
    title: "",
    type: "Movie",
    description: "",
    contactName: "",
    contactEmail: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(submitListing(formData));
    if (submitListing.fulfilled.match(result)) {
      setFormData({
        title: "",
        type: "Movie",
        description: "",
        contactName: "",
        contactEmail: "",
      });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      <NavBar />
      <div className="hidden sm:block">
        <HomeSlider isShow={false} />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-6">
        {/* Banner */}
        <div className="w-full h-[150px] sm:h-[180px] bg-gradient-to-r from-rose-500 to-red-600 rounded-xl flex items-center justify-between p-6 sm:p-10 text-white shadow mb-8">
          <div className="space-y-1.5 max-w-xl">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              📣 List Your Show
            </h1>
            <p className="text-xs sm:text-sm opacity-90">
              Are you a producer, director, host, or venue manager? Submit your listing request to showcase your events with us!
            </p>
          </div>
          <div className="hidden sm:block text-6xl opacity-20 transform rotate-12 select-none">
            📢
          </div>
        </div>

        {/* Submission Form */}
        <div className="bg-white rounded-xl shadow border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-3">
            Listing Proposal Form
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Show/Event Title
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. Local Music Festival, Indore Premier"
                className="w-full text-sm h-10 px-3 border border-gray-300 rounded-lg outline-none focus:border-rose-500 font-sans"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Listing Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full text-sm h-10 px-2 border border-gray-300 rounded-lg outline-none focus:border-rose-500 font-sans"
                >
                  <option value="Movie">Movie</option>
                  <option value="Stream">Stream</option>
                  <option value="Event">Live Event</option>
                  <option value="Play">Play / Theater</option>
                  <option value="Sport">Sport Match</option>
                  <option value="Activity">Activity / Experience</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Contact Person Name
                </label>
                <input
                  type="text"
                  name="contactName"
                  required
                  value={formData.contactName}
                  onChange={handleInputChange}
                  placeholder="e.g. John Doe"
                  className="w-full text-sm h-10 px-3 border border-gray-300 rounded-lg outline-none focus:border-rose-500 font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Contact Email Address
              </label>
              <input
                type="email"
                name="contactEmail"
                required
                value={formData.contactEmail}
                onChange={handleInputChange}
                placeholder="e.g. contact@example.com"
                className="w-full text-sm h-10 px-3 border border-gray-300 rounded-lg outline-none focus:border-rose-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Proposal Description / Pitch
              </label>
              <textarea
                name="description"
                required
                rows="4"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your show, expected pricing, venues, artists, and dates..."
                className="w-full text-sm p-3 border border-gray-300 rounded-lg outline-none focus:border-rose-500 font-sans resize-none"
              ></textarea>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-rose-500 hover:bg-rose-600 disabled:bg-gray-400 text-white font-bold rounded-lg shadow-sm hover:shadow transition-all text-sm"
              >
                {loading ? "Submitting..." : "Submit Listing Proposal"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListYourShowPage;
