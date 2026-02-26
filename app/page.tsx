import { HomeStatic } from "./home_static";
import { ReadImageName } from "@/actions/get_image_names";
import { CarouselHome } from "@/components/carousel_home";

export default async function Home() {
  const imageNames = await ReadImageName();
  return (
    <div>
      <HomeStatic />

      {/* the Carousel section */}
      <CarouselHome imageNames={imageNames} />
    </div>
  );
}
