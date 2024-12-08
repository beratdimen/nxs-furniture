import "./style.css";

export default function CategoryDesign() {
  return (
    <div className="container">
      <div className="imageSection">
        <img
          src="/img/mobilya-1.webp"
          alt="Bedroom Design"
          className="mainImage"
        />
        <div className="textContent">
          <h1>Yenilenen Pandora</h1>
          <p>
            Modüler gardırop ile işlevselliği şıklıkla birleştiren modern
            tasarımıyla yaşam alanınıza estetik katıyor.
          </p>
          <a href="#" className="ctaButton">
            Hemen Keşfet&gt;
          </a>

          <div className="thumbnailSection">
            <img
              src="/img/mobilya-2.webp"
              alt="Side Table"
              className="thumbnail"
            />
            <img
              src="/img/mobilya-3.webp"
              alt="Bed Detail"
              className="thumbnail"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
