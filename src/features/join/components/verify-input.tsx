"use client"
import { cn } from '@/lib/utils'
import { Loader } from 'lucide-react'
import React from 'react'
import VerificationInput from 'react-verification-input'

interface VerifyInputProps {
  handleComplete: (value: string) => void
  isPending: boolean
}

const VerifyInput = ({handleComplete, isPending}: VerifyInputProps) => {
  return (
    <VerificationInput
                onComplete={handleComplete}
                length={6}
                classNames={{
                    container: cn("flex gap-x-2", isPending && "opacity-50 cursor-not-allowed"),
                    character: "uppercase h-auto rounded-md border-gray-300 flex items-center justify-center text-lg font-medium text-gray-500",
                    characterInactive: "bg-muted",
                    characterSelected: "bg-white text-black",
                    characterFilled: "bg-white text-black",
                }}
                autoFocus
                />
  )
}

export default VerifyInput