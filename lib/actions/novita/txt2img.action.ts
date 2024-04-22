import { NovitaSDK, Txt2ImgV3Request, LcmTxt2ImgRequest } from "novita-sdk";

const novitaClient = new NovitaSDK("7ef578fc-7de1-44b3-986f-5dfcc7b68515");

export async function getTaskResultV3(taskId: string) {
  try {
    const res = await novitaClient.progressV3({task_id: taskId});
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getTaskResult(taskId: string) {
  try {
    const res = await novitaClient.progress({task_id: taskId});
    
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Txt2img request with normal parameter
export async function text2Image(req: Txt2ImgV3Request) {
  try {
   
    const params = {
      request: {
        model_name: req.request.model_name,
        prompt: req.request.prompt,
        negative_prompt: req.request.negative_prompt,
        width: req.request.width,
        height: req.request.height,
        steps: req.request.steps,
        guidance_scale: req.request.guidance_scale,
        seed: req.request.seed,
        image_num: req.request.image_num,
        sampler_name: req.request.sampler_name,
      },
      extra: req.extra
    };
    
    const res = await novitaClient.txt2ImgV3(params);
    
    return res;

  } catch (error) {
    console.log(error);
    return null;
  }
}

// Txt2img request with lora
export async function text2ImageWithLora(req: Txt2ImgV3Request) {
  try {
    const params: Txt2ImgV3Request = {
      request: {
        model_name: req.request.model_name,
        prompt: req.request.prompt,
        negative_prompt: req.request.negative_prompt,
        width: req.request.width,
        height: req.request.height,
        steps: req.request.steps,
        guidance_scale: req.request.guidance_scale,
        seed: req.request.seed,
        image_num: req.request.image_num,
        sampler_name: req.request.sampler_name,
        // "loras": [
        //   {
        //       "model_name": "MS_Real_AssSpread",
        //       "strength": 0.7
        //   },
        //   {
        //       "model_name": "MS_Real_Cameltoe_Lite",
        //       "strength": 0.9
        //   }
        // ]
        loras: req.request.loras // focus this
      },
      extra: req.extra
    };

    const res = await novitaClient.txt2ImgV3(params);
    
    return res;

  } catch (error) {
    console.log(error);
    return null;
  }
}

// Txt2img request with upscale
export async function text2ImageWithUpscale(req: Txt2ImgV3Request) {
  try {
    const params: Txt2ImgV3Request = {
      request: {
        model_name: req.request.model_name,
        prompt: req.request.prompt,
        negative_prompt: req.request.negative_prompt,
        width: req.request.width,
        height: req.request.height,
        steps: req.request.steps,
        guidance_scale: req.request.guidance_scale,
        seed: req.request.seed,
        image_num: req.request.image_num,
        sampler_name: req.request.sampler_name,
        //   "hires_fix": {
        //     "target_width": 1024,
        //     "target_height": 1024,
        //     "strength": 0.8,
        //     "upscaler": "Latent"
        // }
        hires_fix: req.request.hires_fix // focus this
      },
      extra: req.extra
    };

    const res = await novitaClient.txt2ImgV3(params);
    
    return res;

  } catch (error) {
    console.log(error);
    return null;
  }
}

// Txt2img request with SDXL 1.0
export async function text2ImageWithSDXL(req: Txt2ImgV3Request) {
  try {
    const params: Txt2ImgV3Request = {
      request: {
        model_name: "sd_xl_base_1.0.safetensors", // foucu this
        prompt: req.request.prompt,
        negative_prompt: req.request.negative_prompt,
        width: req.request.width,
        height: req.request.height,
        steps: req.request.steps,
        guidance_scale: req.request.guidance_scale,
        seed: req.request.seed,
        image_num: req.request.image_num,
        sampler_name: req.request.sampler_name,
      },
      extra: req.extra
    };

    const res = await novitaClient.txt2ImgV3(params);
    
    return res;

  } catch (error) {
    console.log(error);
    return null;
  }
}

// Txt2img request with Textual Inversion(embedding)
export async function text2ImageWithEmbedding(req: Txt2ImgV3Request) {
  try {
    const params: Txt2ImgV3Request = {
      request: {
        model_name: req.request.model_name, // foucu this
        prompt: req.request.prompt,
        negative_prompt: req.request.negative_prompt,
        width: req.request.width,
        height: req.request.height,
        steps: req.request.steps,
        guidance_scale: req.request.guidance_scale,
        seed: req.request.seed,
        image_num: req.request.image_num,
        sampler_name: req.request.sampler_name,
        // "embeddings": [
        //   {
        //       "model_name": "badhandv4_16755.pt"
        //   },
        //   {
        //       "model_name": "BadDream_53202.pt"
        //   }
        // ]
        embeddings: req.request.embeddings
      },
      extra: req.extra
    };

    const res = await novitaClient.txt2ImgV3(params);
    
    return res;

  } catch (error) {
    console.log(error);
    return null;
  }
}

// Txt2img request with LCM
// 10x faster image generation with latent consistency models, 
// synthesizing High-Resolution images with few-step inference.
// 基本上可以实时返回图片， base64
export async function text2ImageWithLCM(req: LcmTxt2ImgRequest) {
  try {
    const params: LcmTxt2ImgRequest = {
        prompt: req.prompt,
        width: req.width,
        height: req.height,
        steps: req.steps, // must be [1, 8]
        guidance_scale: req.guidance_scale, // must be [0, 3]
        image_num: req.image_num,
    };

    const res = await novitaClient.lcmTxt2Img(params);
    
    return res;

  } catch (error) {
    console.log(error);
    return null;
  }
}
