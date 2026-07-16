import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { setFormData } from "../../redux/reducer/movieSlice";

const ChipInput = ({ name, label, editCast, disabled }) => {
  const dispatch = useDispatch();
  const { movie } = useSelector((state) => state.movie);
  const [tags, setTags] = useState([]);

  const handleAddTag = (newTag) => {
    const updatedTags = [...tags, newTag];
    setTags(updatedTags);
    dispatch(setFormData({ name, value: updatedTags }));
  };

  const handleRemoveTag = (indexToRemove) => {
    const updatedTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(updatedTags);
    dispatch(setFormData({ name, value: updatedTags }));
  };

  useEffect(() => {
    if (editCast) {
      setTags(movie?.cast || []);
    }
  }, [editCast, movie]);

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex flex-wrap gap-2 mt-3 mb-1 mx-1">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="px-2 py-1 text-sm flex items-center justify-center gap-2 rounded-full bg-rose-500 text-white"
          >
            <span>{tag}</span>
            <button
              type="button"
              disabled={disabled}
              onClick={() => handleRemoveTag(index)}
              className="translate-y-[1px]"
            >
              <FaTimes />
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        id={name}
        name={name}
        placeholder="Press Enter or , to add a tag"
        disabled={disabled}
        className="w-full mt-2 p-2 text-sm text-gray-700 border border-gray-300 rounded-lg"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            if (e.target.value.trim()) {
              handleAddTag(e.target.value.trim());
              e.target.value = "";
            }
          }
        }}
      />
    </div>
  );
};

export default ChipInput;
