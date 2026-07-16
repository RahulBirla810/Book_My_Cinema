import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import {
  setFormData,
  resetFormData,
  addMovie,
} from "../../redux/reducer/movieSlice";
import NavBar from "../common/NavBar";
import HomeSlider from "../common/HomeSlider";
import ChipInput from "./ChipInput";

const AddMoviePage = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.movie);
  const { loading, error } = formData;

  const isMobile = useMediaQuery({ query: "(max-width: 400px)" });

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ name, value }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    const updatedList = checked
      ? [...formData[field], value]
      : formData[field].filter((item) => item !== value);

    dispatch(setFormData({ name: field, value: updatedList }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.genres.length === 0 ||
      formData.supportingLanguages.length === 0 ||
      formData.cast.length === 0
    ) {
      alert("Please select all fields");
      return;
    }

    // Dispatch the form data to Redux for API submission
    try {
      await dispatch(addMovie(formData));
      dispatch(resetFormData());
    } catch (err) {
      console.error("Error while adding movie: ", err);
    }
  };

  useEffect(() => {
    dispatch(resetFormData());
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="custom-loader"></div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-100">
      <NavBar />
      <div className="hidden sm:block">
        <HomeSlider isShow={false} />
      </div>
      <div className="mt-5 flex flex-col justify-center items-center">
        <h1 className="text-2xl sm:text-[26px] lg:text-[34px] text-rose-500 font-medium">
          Add Movie
        </h1>
        <form
          onSubmit={handleSubmit}
          style={{
            width: isMobile ? "85%" : "0%",
            minWidth: isMobile ? "0px" : "400px",
            padding: isMobile ? "22px" : "32px",
          }}
          className="mx-auto my-3 sm:my-5 bg-gray-200 shadow-lg rounded-lg space-y-5"
        >
          {/* Movie Name */}
          <div>
            <label
              htmlFor="movieName"
              className="block text-sm font-medium text-gray-700"
            >
              Movie Name
            </label>
            <input
              type="text"
              id="movieName"
              name="movieName"
              placeholder="Enter movie name"
              value={formData.movieName}
              onChange={handleInputChange}
              required
              className="w-full mt-2 p-2 text-sm text-gray-700 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Categories
            </label>
            <div className="mt-2 space-y-2">
              {["Hollywood", "Bollywood", "South"].map((category) => (
                <div key={category}>
                  <input
                    type="checkbox"
                    id={category}
                    value={category}
                    checked={formData.categories.includes(category)}
                    onChange={(e) => handleCheckboxChange(e, "categories")}
                    className="mr-2"
                  />
                  <label htmlFor={category} className="text-sm text-gray-700">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Release Date */}
          <div>
            <label
              htmlFor="releaseDate"
              className="block text-sm font-medium text-gray-700"
            >
              Release Date
            </label>
            <input
              type="date"
              id="releaseDate"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleInputChange}
              required
              className="mt-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* Summary */}
          <div>
            <label
              htmlFor="summary"
              className="block text-sm font-medium text-gray-700"
            >
              Summary
            </label>
            <textarea
              id="summary"
              name="summary"
              placeholder="Enter movie summary"
              value={formData.summary}
              onChange={handleInputChange}
              required
              className="mt-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* Genres */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Genres
            </label>
            <div className="mt-2 grid grid-cols-2 gap-1">
              {[
                "Action",
                "Adventure",
                "Comedy",
                "Drama",
                "Family",
                "Horror",
                "Romantic",
                "Sci-Fi",
                "Sports",
                "Thriller",
              ].map((genre) => (
                <div key={genre}>
                  <input
                    type="checkbox"
                    id={genre}
                    value={genre}
                    checked={formData.genres.includes(genre)}
                    onChange={(e) => handleCheckboxChange(e, "genres")}
                    className="mr-2"
                  />
                  <label htmlFor={genre} className="text-sm text-gray-700">
                    {genre}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Cast Members */}
          <ChipInput
            label="Cast Members"
            name="cast"
            editCast={false}
            disabled={loading}
          />

          {/* Crew Members */}
          <div>
            <label
              htmlFor="crew"
              className="block text-sm font-medium text-gray-700"
            >
              Crew Members
            </label>
            <input
              type="text"
              id="crew"
              name="crew"
              value={formData.crew}
              onChange={handleInputChange}
              className="mt-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* Supporting Languages */}
          <div>
            <label
              htmlFor="supportingLanguages"
              className="block text-sm font-medium text-gray-700"
            >
              Supporting Languages
            </label>
            <div className="mt-2 grid grid-cols-2 gap-1">
              {["English", "Hindi", "Kannada", "Telugu", "Tamil"].map(
                (supportingLanguage) => (
                  <div key={supportingLanguage}>
                    <input
                      type="checkbox"
                      id={supportingLanguage}
                      value={supportingLanguage}
                      checked={formData.supportingLanguages.includes(
                        supportingLanguage
                      )}
                      onChange={(e) =>
                        handleCheckboxChange(e, "supportingLanguages")
                      }
                      className="mr-2"
                    />
                    <label
                      htmlFor={supportingLanguage}
                      className="text-sm text-gray-700"
                    >
                      {supportingLanguage}
                    </label>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Thumbnail Image */}
          <div>
            <label
              htmlFor="thumbnailImage"
              className="block text-sm font-medium text-gray-700"
            >
              Thumbnail Image
            </label>
            <input
              type="text"
              id="thumbnailImage"
              name="thumbnailImage"
              placeholder="Enter movie thumbnail image"
              value={formData.thumbnailImage}
              onChange={handleInputChange}
              required
              className="w-full mt-2 p-2 text-sm text-gray-700 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Banner Image */}
          <div>
            <label
              htmlFor="bannerImage"
              className="block text-sm font-medium text-gray-700"
            >
              Banner Image
            </label>
            <input
              type="text"
              id="bannerImage"
              name="bannerImage"
              placeholder="Enter movie banner image"
              value={formData.bannerImage}
              onChange={handleInputChange}
              required
              className="w-full mt-2 p-2 text-sm text-gray-700 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition"
          >
            {loading ? "Submitting..." : "Submit Movie"}
          </button>

          {error && <div className="mt-4 text-red-500">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default AddMoviePage;
