"use client"

import { useState, useEffect } from 'react'
import Image from "next/image"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Bird,
  Book,
  Bot,
  Code2,
  CornerDownLeft,
  LifeBuoy,
  Mic,
  Paperclip,
  Rabbit,
  Settings,
  Settings2,
  Share,
  SquareTerminal,
  SquareUser,
  Triangle,
  Turtle,
  Instagram,
  Twitter,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { CustomField } from './CustomField'
import { debounce, AspectRatioKey, deepMergeObjects } from '@/lib/utils'
import { aspectRatioOptions, generationTypes } from '@/constants'
import GeneratedImage from './GeneratedImage'
import { text2ImageWithLCM } from '@/lib/actions/novita/txt2img.action'

export const formSchema = z.object({
  aspectRatio: z.string().optional(),
  prompt: z.string().optional(),
  imageNum: z.number().optional(),
  steps: z.number().optional(),
  guidanceScale: z.number().optional(),
  seed: z.number().optional(),
})

export function Txt2ImgForm({ action, data = null, userId, type, config = null } : Text2ImageFormProps) {
  const generationType = generationTypes[type];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [image, setImage] = useState(data);
  const [newGeneration, setNewGeneration] = useState<Generations | null>(null);
  const [generationConfig, setGenerationConfig] = useState(config);

  const defaultValues: Image = {
    prompt: "",
    aspectRatio: "1:1",
    width: 512,
    height: 512,
    imageNum: 1,
    steps: 20,
    guidanceScale: 3,
    seed: -1,
  };

  const initialValues = data ? {
    prompt: data?.prompt,
    aspectRatio: data?.aspectRatio,
    imageNum: data?.imageNum,
    steps: data?.steps,
    guidanceScale: data?.guidanceScale,
    seed: data?.seed,
  } : defaultValues

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    const res = await text2ImageWithLCM({
      prompt: values.prompt as string,
      height: 512,
      width: 512,
      image_num: values.imageNum as number,
      steps: values.steps as number,
      guidance_scale: values.guidanceScale as number,
    });

    if (res && res.images.length > 0) {
      setImage((prevState: any) => ({
        ...prevState,
        base64: "data:image/png;base64," + res.images[0].image_file,
      }))
    }

    setIsSubmitting(false);
  }

  const onInputChangeHandler = (fieldName: string, value: string | number, type: string,  
    onChangeField: (value: string | number) => void) => {
    debounce(() => {
      setNewGeneration((prevState: any) => ({
        ...prevState,
        [type]: {
          ...prevState?.[type],
          fieldName: value
        }
      }))
    }, 1000)();
      
    return onChangeField(value)
  }

  const onSelectFieldHandler = (value: string, onChangeField: (value: string) => void) => {
    const imageSize = aspectRatioOptions[value as AspectRatioKey]

    setImage((prevState: any) => ({
      ...prevState,
      aspectRatio: imageSize.aspectRatio,
      width: imageSize.width,
      height: imageSize.height,
    }))

    setNewGeneration(generationType.config);

    return onChangeField(value)
  }

  const onGenerateHandler = async () => {
    setIsGenerating(true)

    setGenerationConfig(
      deepMergeObjects(newGeneration, generationConfig)
    )

    setNewGeneration(null)

    // startTransition(async () => {
    //   await updateCredits(userId, creditFee)
    // })
  }

  useEffect(() => {
    if(image) {
      setNewGeneration(generationType.config)
    }
  }, [image, generationType.config])
  
  return (
    <div className="grid h-screen w-full pl-[53px]">
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent">Text to Image</h1>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1.5 text-sm"
          >
            <Share className="size-3.5" />
            Share
          </Button>
        </header>
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div
            className="relative hidden flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0"
          >
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full items-start gap-6">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Settings
                </legend>
                <div className="grid gap-3">
                  <CustomField
                    control={form.control}
                    name="aspectRatio"
                    formLabel="Aspect Ratio"
                    className="w-full"
                    render={({ field }) => (
                      <Select
                        onValueChange={(value) => onSelectFieldHandler(value, field.onChange)}
                        value={field.value}
                      >
                        <SelectTrigger
                          id="model"
                          className="items-start [&_[data-description]]:hidden"
                        >
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(aspectRatioOptions).map((key) => (
                            <SelectItem key={key} value={key} className="select-item">
                              <div className="flex items-start gap-3 text-muted-foreground">
                              <Twitter className="size-5" />
                              <div className="grid gap-0.5">
                                <p>
                                  <span className="font-medium text-foreground">
                                    {aspectRatioOptions[key as AspectRatioKey].label}
                                  </span>
                                </p>
                                {/* <p className="text-xs" data-description>
                                  Our fastest model for general use cases.
                                </p> */}
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}  
                  />
                </div>
                <div className="grid gap-3">
                  <CustomField 
                    control={form.control}
                    name="imageNum"
                    formLabel="Image Num"
                    className="w-full"
                    render={({ field }) => (
                      <Input 
                        value={field.value}
                        type="number"
                        className="input-field"
                        onChange={(e) => onInputChangeHandler(
                          'imageNum',
                          Number(e.target.value),
                          "txt2img",
                          field.onChange
                        )}
                      />
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {/* <div className="grid gap-3">
                    <CustomField 
                      control={form.control}
                      name="steps"
                      formLabel="Steps"
                      className="w-full"
                      render={({ field }) => <Input {...field} type="number" placeholder="20" />}
                    />
                  </div> */}
                  {/* <div className="grid gap-3">
                    <Label htmlFor="top-k">Top K</Label>
                    <Input id="top-k" type="number" placeholder="0.0" />
                  </div> */}
                </div>
              </fieldset>
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Content
                </legend>
                {/* <div className="grid gap-3">
                  <Label htmlFor="role">Role</Label>
                  <Select defaultValue="system">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system">System</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="assistant">Assistant</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}
                <div className="grid gap-3">
                  <CustomField 
                    control={form.control}
                    name="prompt"
                    formLabel="Prompt"
                    className="w-full"
                    render={({ field }) => (
                      <Textarea
                        value={field.value}
                        placeholder="Description of what you want to generate..."
                        className="min-h-[9.5rem]"
                        onChange={(e) => onInputChangeHandler(
                          'prompt',
                          e.target.value,
                          "txt2img",
                          field.onChange
                        )}
                      />
                    )}
                  />
                </div>
                <Button 
                  type="button"
                  className="submit-button capitalize"
                  disabled={isGenerating || newGeneration === null}
                  onClick={onGenerateHandler}
                >
                  {isGenerating ? 'Generating...' : 'Start Generate'}
                </Button>
                <Button 
                  type="submit"
                  className="submit-button capitalize"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Save Image'}
                </Button>
              </fieldset>
            </form>
            </Form>
          </div>
          <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
            <Badge variant="outline" className="absolute right-3 top-3">
              {
                <button 
                  className="download-btn" 
                  // onClick={downloadHandler}
                >
                  <Image 
                    src="/assets/icons/download.svg"
                    alt="Download"
                    width={24}
                    height={24}
                    className="pb-[6px]"
                  />
                </button>
              }
            </Badge>
            <div className="flex flex-1 items-center justify-center">
              <GeneratedImage
                image={image}
                type={type}
                title={"xxxxx"}
                isTransforming={isGenerating}
                setIsTransforming={setIsGenerating}
                transformationConfig={generationConfig}
              />
            </div>
            {/* <form
              className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring" x-chunk="dashboard-03-chunk-1"
            >
              <Label htmlFor="message" className="sr-only">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
              />
              <div className="flex items-center p-3 pt-0">
                <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Paperclip className="size-4" />
                      <span className="sr-only">Attach file</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Attach File</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Mic className="size-4" />
                      <span className="sr-only">Use Microphone</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Use Microphone</TooltipContent>
                </Tooltip>
                </TooltipProvider>
                <Button type="submit" size="sm" className="ml-auto gap-1.5">
                  Send Message
                  <CornerDownLeft className="size-3.5" />
                </Button>
              </div>
            </form> */}
          </div>
        </main>
      </div>
    </div>
  )
}