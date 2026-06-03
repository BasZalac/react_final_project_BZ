import Swal from "sweetalert2";
import Card from "../wrappers/Card";
import styles from "./WebshopItem.module.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/loginContext";

const WebshopItem = ({ product, deleteProduct }) => {
  const { isLogged } = useAuth();
  console.log(product.id);
  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Biztosan törölni szeretnéd a terméket?",
      text: "Ez a művelet nem visszavonható!",
      icon: "warning",
      showCancelButton: true,
    });
    if (confirmDelete.isConfirmed) {
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Sikeres törlés",
          text: "A termék sikeresen törölve lett!",
        });
        deleteProduct(id);
      } else {
        Swal.fire({
          icon: "error",
          title: "Hiba",
          text: "A termék törlése nem sikerült!",
        });
      }
    }
  };
  return (

    <Card>
      <div className={styles.container}>
        <h3 className={styles.destination}>{product.name}</h3>
      </div>
      {isLogged && (
        <button onClick={() => handleDelete(product.id)}>Törlés</button>
      )}
      <NavLink to={`/details/${product.id}`}>
        <button>Részletek</button>
      </NavLink>
    </Card>
  );
};

export default WebshopItem;
