import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFormData, submitMovieForm } from "../../redux/reducer/movieSlice";

const AddMoviePage = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.movie);
  const { loading, error } = formData;

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ name, value }));
  };

  // Handle checkbox changes for categories and genres
  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    dispatch(
      setFormData({
        name: field,
        value: checked
          ? [...formData[field], value]
          : formData[field].filter((item) => item !== value),
      })
    );
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    dispatch(setFormData({ name, value: files[0] }));
  };

  // Handle form submission (API call)
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitMovieForm(formData));
  };

  return (
    <div className="mt-7 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-medium">Add Movie</h1>
      <form
        onSubmit={handleSubmit}
        className="mt-5 max-w-3xl mx-auto p-8 bg-gray-100 shadow-lg rounded-lg space-y-6"
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
            value={formData.movieName}
            onChange={handleInputChange}
            required
            className="mt-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2"
          />
        </div>

        {/* Categories (Checkboxes for multiple selections) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Categories
          </label>
          <div className="mt-2 space-y-2">
            <div>
              <input
                type="checkbox"
                id="hollywood"
                value="Hollywood"
                checked={formData.categories.includes("Hollywood")}
                onChange={(e) => handleCheckboxChange(e, "categories")}
                className="mr-2"
              />
              <label htmlFor="hollywood" className="text-sm text-gray-700">
                Hollywood
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="bollywood"
                value="Bollywood"
                checked={formData.categories.includes("Bollywood")}
                onChange={(e) => handleCheckboxChange(e, "categories")}
                className="mr-2"
              />
              <label htmlFor="bollywood" className="text-sm text-gray-700">
                Bollywood
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="south"
                value="South"
                checked={formData.categories.includes("South")}
                onChange={(e) => handleCheckboxChange(e, "categories")}
                className="mr-2"
              />
              <label htmlFor="south" className="text-sm text-gray-700">
                South
              </label>
            </div>
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
            value={formData.summary}
            onChange={handleInputChange}
            required
            className="mt-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2"
          />
        </div>

        {/* Cast Members */}
        <div>
          <label
            htmlFor="castMembers"
            className="block text-sm font-medium text-gray-700"
          >
            Cast Members
          </label>
          <input
            type="text"
            id="castMembers"
            name="castMembers"
            value={formData.castMembers}
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
          <input
            type="text"
            id="supportingLanguages"
            name="supportingLanguages"
            value={formData.supportingLanguages}
            onChange={handleInputChange}
            className="mt-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2"
          />
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
            type="file"
            id="thumbnailImage"
            name="thumbnailImage"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-2 block w-full text-sm text-gray-500 border border-gray-300 rounded-lg p-2"
          />
        </div>

        {/* Genres (Checkboxes for multiple selections) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Genres
          </label>
          <div className="mt-2 space-y-2">
            <div>
              <input
                type="checkbox"
                id="actionGenre"
                value="Action"
                checked={formData.genres.includes("Action")}
                onChange={(e) => handleCheckboxChange(e, "genres")}
                className="mr-2"
              />
              <label htmlFor="actionGenre" className="text-sm text-gray-700">
                Action
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="comedyGenre"
                value="Comedy"
                checked={formData.genres.includes("Comedy")}
                onChange={(e) => handleCheckboxChange(e, "genres")}
                className="mr-2"
              />
              <label htmlFor="comedyGenre" className="text-sm text-gray-700">
                Comedy
              </label>
            </div>
          </div>
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
  );
};

export default AddMoviePage;
