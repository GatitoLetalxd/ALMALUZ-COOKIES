"use client";

import { useState } from "react";
import { CartProvider } from "@/store/CartContext";
import Header from "./Header";
import Hero from "./Hero";
import FlavorGrid from "./FlavorGrid";
import BoxMixer from "./BoxMixer";
import Showcase from "./Showcase";
import Story from "./Story";
import HowItWorks from "./HowItWorks";
import Footer from "./Footer";
import CartBar from "./CartBar";
import CartSheet from "./CartSheet";

export default function Tienda() {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <CartProvider>
      <Header onOpenCart={() => setCartOpen(true)} />
      <main className="pb-24">
        <Hero />
        <FlavorGrid />
        <BoxMixer onAdded={() => setCartOpen(true)} />
        <Showcase />
        <Story />
        <HowItWorks />
      </main>
      <Footer />
      <CartBar onOpen={() => setCartOpen(true)} />
      <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} />
    </CartProvider>
  );
}
