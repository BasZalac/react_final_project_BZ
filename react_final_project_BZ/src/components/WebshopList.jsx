import WebshopItem from "./WebshopItem";

const WebshopList = ({ products = [], deleteProduct }) => {
  if (products.length === 0) {
    return <h1>Nincsenek termékek</h1>;
  } else {
    return (
      <div className="webshop-list">
        {products.map((product) => (
          <WebshopItem
            key={product.id}
            product={product}
            deleteProduct={deleteProduct}
          />
        ))}
      </div>
    );
  }
};

export default WebshopList;
