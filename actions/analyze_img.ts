"use server"

export interface HfAnalysisResult {
  status: "success";
  filename: string;
  miou: number;
  oa: number;
  time: number;
  plot: string; // base64 string or URL
}

export async function callHf(imageNames: string): Promise<HfAnalysisResult> {
  const url = `${process.env.HF_URL}/predict/${encodeURIComponent(imageNames)}`;
  const response = await fetch(url, {
    headers: {
      authorization: "Bearer " + process.env.HF_API_TOKEN_SECRET,
    },
  });

  if (!response.ok) {
    throw new Error(`HF API fetching failed: ${response.status}`);
  }

  return response.json();
}
