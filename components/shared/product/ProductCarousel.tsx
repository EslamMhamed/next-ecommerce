"use client";

import { CardContent } from "@/components/ui/card";
import { Carousel, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Product } from "@/types";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";

function ProductCarousel({ data }: { data: Product[] }) {
  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 10000,
          stopOnInteraction: true,
          stopOnMouseEnter: true,
        }),
      ]}
      className="w-full mb-12"
    >
      <CardContent>
        {data.map((product: Product) => (
          <CarouselItem key={product.id}>
            <Link href={`/product/${product.slug}`}>
              <div className="relative mx-auto">
                <Image
                  src={product.banner!}
                  alt={product.name}
                  width="0"
                  height="0"
                  sizes="100vh"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 flex items-end justify-center">
                <h2 className="bg-gray-900 opacity-50 font-bold text-2xl px-2 text-white">
                    {product.name}
                </h2>
              </div>
              </div>
              
            </Link>
          </CarouselItem>
        ))}
      </CardContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default ProductCarousel;
