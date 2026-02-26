"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { callHf } from "@/actions/analyze_img";
import { useState } from "react";
import { HfAnalysisResult } from "@/actions/analyze_img";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Spinner } from "./ui/spinner";

export function CarouselHome({ imageNames }: { imageNames: string[] }) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<HfAnalysisResult | null>();
  const [isOpen, setIsOpen] = useState(false);

  // function to call HF
  const handleAnalyze = async (name: string) => {
    setIsLoading(true);
    setIsOpen(true);
    setResult(null);
    try {
      const pickle_name = name.replace(/\.png$/, ".pickle");
      const response = await callHf(pickle_name);
      setResult(response);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="flex justify-center items-center">
      {/* The Carousel function */}
      <Carousel
        opts={{ align: "center", loop: true }}
        className="w-full max-w-5xl"
      >
        <CarouselContent>
          {imageNames.map((name) => (
            <CarouselItem key={name} className="basis-1/3">
              <Card
                className="h-95 overflow-hidden"
                onClick={() => handleAnalyze(name)}
              >
                <CardContent className="h-full cursor-pointer hover:scale-105 group relative p-0">
                  <img
                    src={`/show_img/${name}`}
                    alt="Satellite image in RGB band only"
                  />
                  {/* Overlay on hover */}
                  <div className="opacity-0 group-hover:opacity-100 absolute inset-0 flex justify-center items-center bg-black/40 text-white rounded-sm">
                    <p>Analyze Location</p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* the MODAL */}
      {/* set open hook to controll the modal */}
      {/* onOpenChange so it can stay sync */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="!max-w-6xl">
          <DialogHeader>
            <DialogTitle>Analysis Results</DialogTitle>
            <DialogDescription>
              Temporal segmentation results for a 1-year span. <br></br>
              <span className="block text-xs font-mono text-muted-foreground mt-1">
                Backend: CPU Inference (~10s latency)
              </span>
            </DialogDescription>
          </DialogHeader>
          {isLoading && <Spinner />}
          {result != null && (
            <div >
              <Card>
                <CardContent className="flex flex-col gap-5">
                  <div className="flex gap-3">
                    {" "}
                    <CardDescription><span className=" uppercase font-bold text-slate-500">Mean IoU:</span> {(result.miou *100).toFixed(2)}%</CardDescription>
                    <CardDescription><span className=" uppercase font-bold text-slate-500">Overall Accuracy: </span> {(result.oa *100).toFixed(2)}%</CardDescription>
                    <CardDescription>
                      <span className=" uppercase font-bold text-slate-500">Inference time: </span>{(result.time).toFixed(2)}s
                    </CardDescription>
                  </div>
                  <CardDescription>
                    <img src={`data:image/png;base64,${result.plot}`} className="w-full w-96" />
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
