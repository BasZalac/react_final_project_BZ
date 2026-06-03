import { useRef } from "react";
import Card from "../wrappers/Card";
import Swal from "sweetalert2";
import styles from "./WebshopForm.module.css";

const WebshopForm = ({ sendDataToApp }) => {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const img_urlRef = useRef();
  const priceRef = useRef();
  const stockRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    summarizeWebshopData();
  };

  const summarizeWebshopData = async () => {
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    const img_url = img_urlRef.current.value;
    const price = priceRef.current.value;
    const stock = stockRef.current.value;

    if (!name || !description || !img_url || !price || !stock) {
      Swal.fire({
        icon: "error",
        title: "Hiányzó adatok",
        text: "Kérlek tölts ki minden kötelező mezőt!",
      });
      return;
    }

    if (isNaN(price) || price <= 0) {
      Swal.fire({
        icon: "error",
        title: "Hibás ár",
        text: "Az árnak pozitív számnak kell lennie!",
      });
      return;
    }

    if (isNaN(stock) || stock < 0) {
      Swal.fire({
        icon: "error",
        title: "Hibás készlet",
        text: "A készletnek 0 vagy annál nagyobb számnak kell lennie!",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name,
          description,
          img_url,
          price,
          stock,
        }),
      });

      if (response.ok) {
        sendDataToApp();
        Swal.fire({
          icon: "success",
          title: "Siker",
          text: "A termék sikeresen hozzáadva!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Hiba",
          text: "A termék mentése nem sikerült!",
        });
      }
    } catch (error) {
      console.error("Hiba:", error);
    }
  };

  return (
    <Card>
      <div className={styles.container}>
        <h2 className={styles.title}>Termék hozzáadása</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="name">
              Név*
            </label>
            <input
              className={styles.input}
              type="text"
              id="name"
              ref={nameRef}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="description">
              Leírás*
            </label>
            <textarea
              className={styles.input}
              id="description"
              ref={descriptionRef}
            ></textarea>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="img_url">
              Kép URL*
            </label>
            <input
              className={styles.input}
              type="url"
              id="img_url"
              ref={img_urlRef}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="price">
              Ár*
            </label>
            <input
              className={styles.input}
              type="number"
              id="price"
              ref={priceRef}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="stock">
              Raktáron lévő mennyiség*
            </label>
            <input
              className={styles.input}
              type="number"
              id="stock"
              ref={stockRef}
            />
          </div>

          

          <button className={styles.button} type="submit">
            Küldés
          </button>
        </form>
      </div>
    </Card>
  );
};

export default WebshopForm;
