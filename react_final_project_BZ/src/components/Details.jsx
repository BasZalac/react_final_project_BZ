import { useParams, useNavigate } from "react-router-dom";
import classes from "./Details.module.css";
function Details({ products }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return <h1>Nincs ilyen termék</h1>;
  }
console.log(product);
  return (
    <div>
      <h1>{product.name}</h1>

      <img src={product.img_url} alt={product.name} className={classes.image} />

      <p>
        <strong>Leírás:</strong> {product.description}
      </p>

      <p>
        <strong>Ár:</strong> {product.price} Ft
      </p>

      <p>
        <strong>Raktáron lévő mennyiség:</strong> {product.stock} db
      </p>

      <button onClick={() => navigate(-1)}>Vissza</button>
    </div>
  );
}

export default Details;
