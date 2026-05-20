import WebshopItem from "./WebshopItem";

const WebshopList = ({ products = [], deleteProduct }) => {
  return (
    <div className="webshop-list">
      {products.map((product) => (
        <WebshopItem key={product.id} product={product} deleteProduct={deleteProduct} />
      ))}
    </div>
  );
};

export default WebshopList;