// define constants about the app

export const generationTypes = {
  txt2img: {
    type: "txt2img",
    title: "Text to Image",
    subTitle: "--",
    config: { 
      txt2img: {
        prompt: "", imageNum: 1,
      },
    },
    icon: "image.svg",
  },
  lcmTxt2img: {
    type: "lcm-txt2img",
    title: "Text to image with LCM",
    subTitle: "--",
    config: { 
      lcmTxt2img: {
        prompt: "", imageNum: 1,
      },
    },
    icon: "camera.svg",
  },
};

export const aspectRatioOptions = {
  "1:1": {
    aspectRatio: "1:1",
    label: "Square (1:1)",
    width: 1000,
    height: 1000,
  },
  "3:4": {
    aspectRatio: "3:4",
    label: "Standard Portrait (3:4)",
    width: 1000,
    height: 1334,
  },
  "9:16": {
    aspectRatio: "9:16",
    label: "Phone Portrait (9:16)",
    width: 1000,
    height: 1778,
  },
};