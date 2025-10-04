import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nasir All Fabrics | Clothing Store",
  description: "Discover premium fabrics and clothing at Nasir All Fabrics.",
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
