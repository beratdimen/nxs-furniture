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
          <h1>The New Pandora</h1>
          <p>
            Add elegance to your living space with a modern design that combines
            functionality and style through its modular wardrobe.
          </p>
          <a href="#" className="ctaButton">
          Discover Now &gt;
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
