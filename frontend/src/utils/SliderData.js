const sliderArray = [
  {
    index: 0,
    img: "https://m.media-amazon.com/images/M/MV5BNDc0MGVmMDMtNmE3NC00ZjZmLWE5ZTEtYzEwN2JjNWZlMmRmXkEyXkFqcGc@._V1_QL75_UX820_.jpg",
    vedioSrc: "https://www.youtube.com/watch?v=1kVK0MZlbI4",
  },
  {
    index: 1,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu99LnlHit8u1oZopdTINDdpkqSg_X-PDZtA&s",
    vedioSrc: "https://www.youtube.com/embed/oelsxH0orHI?si=fSxTom85sQQvY3Z6",
  },
  {
    index: 2,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRib3F-hKYGKcCV_rfLvKNp3MEZybw04PQE8w&s",
    vedioSrc:
      "https://www.youtube.com/embed/8FkLRUJj-o0?si=XVe4THKUoLxQIiHn&amp;controls=0",
  },
  {
    index: 3,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9AmZXWZHrWZ6iGTr5N_meEmFpdvtScQFXEw&s",
    vedioSrc: "https://www.youtube.com/embed/COv52Qyctws?si=20MePdujz7YQAIdm",
  },
  {
    index: 4,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVp1tuRyKSZZJyaYTQe2CZeohZx2Q-ZWhpQg&s",
    vedioSrc: "https://www.youtube.com/embed/KVnheXywIbY?si=OFaX8WrDg7zR5GT7",
  },
];

// Debugging: Check the video source URLs before and after updating
sliderArray.forEach((item) => {
  // If the video URL is in the "watch?v=" format, convert it to "embed"
  if (item.vedioSrc.includes("youtube.com/watch?v=")) {
    const videoId = item.vedioSrc.split("v=")[1].split("&")[0]; // Extract video ID
    item.vedioSrc = `https://www.youtube.com/embed/${videoId}`;
  }
});

export default sliderArray;
