import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ReadImageName } from "@/actions/get_image_names";

export function HomeUi() {
  const imageNames = ReadImageName();

  return (
    <div className="flex flex-col gap-5 justify-center items-center h-[100vh] text-3xl text-center">
      <Card className="w-full max-w-[70rem]">
        <CardContent>
          {" "}
          <h1>
            Demo website to perform satellite image segmentation using our
            proposed S-TSViT model by Nguyen Le.
          </h1>
        </CardContent>
      </Card>

      {/* The Carousel function */}
      <Carousel
        opts={{ align: "center", loop: true }}
        className="w-full max-w-[70rem]"
      >
        <CarouselContent>
          {imageNames.map((name) => (
            <CarouselItem key={name} className="basis-1/3">
              <Card className="h-90">
                <CardContent>
                  <img
                    src={`/show_img/${name}`}
                    alt="Satellite image in RGB band only"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
