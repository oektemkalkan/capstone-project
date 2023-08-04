import { useRouter } from "next/router";
import Image from "next/image";

export default function ShoppingCart() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };
  return (
    <>
      <h2>Shopping Cart Page</h2>
      <button onClick={goBack}>back</button>
    </>
  );
}
