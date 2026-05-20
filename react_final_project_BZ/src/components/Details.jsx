import { useParams, useNavigate } from "react-router-dom";

function Details({ products }) {

  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return <h1>Nincs ilyen termék</h1>;
  }

  return (
    <div>
      <h1>{product.name}</h1>

      <img
        src={product.img}
        alt={product.name}
        width="500"
      />

      <p>
        <strong>Leírás:</strong> {product.notes}
      </p>

      <button onClick={() => navigate(-1)}>
        Vissza
      </button>
    </div>
  );
}

export default Details;