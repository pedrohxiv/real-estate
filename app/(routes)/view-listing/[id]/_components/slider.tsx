import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface SliderProps {
  imageList?: { listing_id: number; url: string }[];
}

export const Slider = ({ imageList }: SliderProps) => {
  return imageList ? (
    <Carousel>
      <CarouselContent>
        {imageList.map((image, index) => (
          <CarouselItem key={index}>
            <Image
              src={image.url}
              height={360}
              width={800}
              alt="Listing image"
              className="rounded-b-lg object-cover h-[360px] w-full"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  ) : (
    <div className="w-full h-[360px] bg-slate-200 animate-pulse rounded-b-lg" />
  );
};
