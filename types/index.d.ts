// define types

declare type GenerationTypeKey =
  | "txt2img"
  | "lcmTxt2img";

declare type Image = {
  prompt: string,
  aspectRatio: string,
  width: number,
  height: number,
  imageNum: number,
  steps: number,
  guidanceScale: number,
  seed: number,
  base64?: string,
};

declare type Text2ImageFormProps = {
  action: string;
  userId: string;
  type: GenerationTypeKey;
  creditBalance: number;
  data?: Image | null;
  config?: Generations | null;
};

declare type Generations = {
  txt2img?: {
    prompt: string;
    imageNum: number;
  };
  lcmTxt2img?: {
    prompt: string;
    imageNum: number;
  };
};

declare type GeneratedImageProps = {
  image: any;
  type: string;
  title: string;
  transformationConfig: Generations | null;
  isTransforming: boolean;
  hasDownload?: boolean;
  setIsTransforming?: React.Dispatch<React.SetStateAction<boolean>>;
};