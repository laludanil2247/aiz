onload = () =>{
        document.body.classList.remove("container");
};

document.addEventListener("DOMContentLoaded", () => {
  const arrow = document.getElementById("nextArrow");
  const slideshow = document.getElementById("slideshow");
  const slides = document.querySelectorAll(".slideshow img");
  let index = 0;

  // Munculkan panah setelah animasi bunga selesai
  setTimeout(() => {
    arrow.classList.remove("hidden");
    arrow.classList.add("show");
  }, 6000); // Sesuaikan dengan durasi animasi bunga kamu

  // Saat panah diklik → hilangkan panah → tampilkan slideshow
  arrow.addEventListener("click", () => {
    arrow.classList.remove("show");
    setTimeout(() => {
      arrow.classList.add("hidden");
      slideshow.classList.remove("hidden");
      slideshow.classList.add("show");
    }, 600); // efek halus sedikit delay

    // Jalankan slideshow berganti gambar
    setInterval(() => {
      slides[index].classList.remove("active");
      index = (index + 1) % slides.length;
      slides[index].classList.add("active");
    }, 3000);
  });
});
