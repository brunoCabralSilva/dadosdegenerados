import contexto from "@/context/context";
import Image from "next/image";
import { useContext } from "react";

interface ImageGridProps {
  folderPath: string;
  totalImages: number;
  oddImagesLandscape: boolean;
}

export default function ImageGrid(
  { folderPath, totalImages, oddImagesLandscape }: ImageGridProps,
) {
  const { setImageZoom } = useContext(contexto);
  const images = Array.from({ length: totalImages }, (_, index) => totalImages - index);
  return (
    <div className="columns-2 sm:columns-3 md:columns-4 gap-4 p-4 space-y-4">
      {images.map((num) => {
        const isOdd = num % 2 !== 0;
        const aspectClass = isOdd
          ? (oddImagesLandscape ? "h-auto" : "h-auto")
          : "h-auto";

        return (
          <div key={num} className={`break-inside-avoid ${aspectClass} overflow-hidden rounded-lg`}>
            <Image
              src={`${folderPath}/${num}.png`}
              alt={`Imagem ${num}`}
              onClick={ () => setImageZoom(`${folderPath}/${num}.png`) }
              width={1000}
              height={1000}
              className="w-full h-auto object-cover rounded-lg cursor-pointer"
            />
          </div>
        );
      })}
    </div>
  );
}
