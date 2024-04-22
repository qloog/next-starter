"use client"

import { dataUrl, debounce, download, getImageSize } from '@/lib/utils'
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import React from 'react'

const GeneratedImage = ({ image, type, title, transformationConfig, isTransforming, 
  setIsTransforming, hasDownload = false }: GeneratedImageProps) => {
  const downloadHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    download("", title)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex-between">
        {/* <h3 className="h3-bold text-dark-600">
          Generated
        </h3> */}

        {hasDownload && (
          <button 
            className="download-btn" 
            onClick={downloadHandler}
          >
            <Image 
              src="/assets/icons/download.svg"
              alt="Download"
              width={24}
              height={24}
              className="pb-[6px]"
            />
          </button>
        )}
      </div>

      {image?.base64 ? (
        <div className="relative">
          <Image 
            src={image.base64}
            alt="generated image"
            width={500}
            height={500}
          />
          {isTransforming && (
            <div className="transforming-loader">
              <Image 
                src="/assets/icons/spinner.svg"
                width={50}
                height={50}
                alt="spinner"
              />
              <p className="text-white/80">Please wait...</p>
            </div>
          )}
        </div>
      ): (
        <div className="transformed-placeholder">
          Generated Image
        </div>
      )}
    </div>
  )
}

export default GeneratedImage