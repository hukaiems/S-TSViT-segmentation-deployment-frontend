import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ReadImageName } from "@/actions/get_image_names";

export function HomeStatic() {
  const imageNames = ReadImageName();

  return (
    <div className="flex flex-col gap-5 justify-center items-center text-center m-2 w-full">
      {/* Hero header section */}
      <div className="mt-8">
        <h1 className="font-bold text-4xl">S-TSViT Satellite Segmentation</h1>
        <p className="text-xl">
          A State-of-the-Art Spiking Neural Network demo by{" "}
          <span className="underline"> Nguyen Le</span>.
        </p>
      </div>

      {/* Explanation */}
      <Card className="text-base w-5xl">
        <CardHeader>
          <CardTitle className="text-2xl">Model Capabilities</CardTitle>
          <CardDescription className="text-base">
            Our model perform high-precision semantic segmentation to classify
            agricutural parcel types using time-series data.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
            {/* feature 1 */}
            <div className="flex gap-3 bg-slate-100 p-4 rounded-xl hover:scale-105 transition-transform">
              <div className="flex bg-blue-100 w-10 h-10 rounded-full justify-center items-center">
                📅
              </div>
              <div>
                <h3 className="font-semibold mb-1">
                  Understand irregular data
                </h3>{" "}
                <p className="text-sm">
                  Analyzes a full 1-year span of irregular data to capture
                  seasonal changes.
                </p>
              </div>
            </div>

            {/* feature 2 */}
            <div className="flex gap-3 bg-slate-100 p-4 rounded-xl hover:scale-105 transition-transform">
              <div className="flex bg-green-100 w-10 h-10 rounded-full justify-center items-center">
                ⚡
              </div>
              <div>
                <h3 className="font-semibold mb-1">Energy Efficiency</h3>{" "}
                <p className="text-sm">
                  Energy consumption rate is 85 times lower than equivalent ANNs
                  model in theory.
                </p>
              </div>
            </div>

            {/* feature 3 */}
            <div className="flex gap-3 bg-slate-100 p-4 rounded-xl hover:scale-105 transition-transform">
              <div className="flex bg-purple-100 w-10 h-10 rounded-full justify-center items-center">
                👍
              </div>
              <div>
                <h3 className="font-semibold mb-1">State-of-the-art</h3>{" "}
                <p className="text-sm">Achieved SOTA in the PASTIS dataset.</p>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="m-4 flex justify-center">
          <CardDescription className="text-lg text-black font-bold">
            Click on 1 of the picture location below to begin semantic
            segmentation on that location.
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
