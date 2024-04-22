import { NextResponse } from 'next/server';
import { Txt2ImgV3Request, LcmTxt2ImgRequest } from "novita-sdk";
import { text2ImageWithLCM, getTaskResultV3 } from '@/lib/actions/novita/txt2img.action';
export async function GET(req: Request) {
  const params: LcmTxt2ImgRequest = {
        prompt: "Glowing jellyfish floating through a foggy forest at twilight",
        width: 512,
        height: 512,
        guidance_scale: 3, // [1, 3]
        image_num: 1,
        steps: 5,
    }
  const res = await text2ImageWithLCM(params);

  // const res = await getTaskResultV3("79025c3d-227a-4902-b97e-bd5fc9e3b043")
    
  return NextResponse.json(res)
}
