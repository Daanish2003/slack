"use client"

import { useGetWorkspaceInfo } from '@/features/workspaces/api/use-get-workspace-info';
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { Loader } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useMemo } from 'react'
import VerifyInput from './verify-input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useJoin } from '@/features/workspaces/api/use-join';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const JoinContent = () => {
    const router = useRouter()
    const workspaceId = useWorkspaceId();
    
    const { mutate, isPending } = useJoin();
    const { data, isLoading} = useGetWorkspaceInfo({id: workspaceId});

    const isMember = useMemo(() => data?.isMember, [data?.isMember])

    useEffect(() => {
        if(isMember) {
            router.push(`/workspace/${workspaceId}`);
        }

    }, [isMember, router, workspaceId])

    const handleComplete = (value: string) => {
        mutate({
            workspaceId,
            joinCode: value
        }, {
            onSuccess: (id) => {
              router.replace(`/workspace/${id}`)
              toast.success("Workspace joined")
            },
            onError: () => {
              toast.error("Failed to join workspace")
            }
        })
    }

    if(isLoading) {
        return (
            <div className="flex items-center justify-center">
                <Loader className="size-6 animate-spin text-muted-foreground" />
            </div>
        )
    }
  return (
    <>
        <Image 
            src={"/hash.svg"}
            width={60}
            height={60}
            alt={"logo"}
        />

        <div className="flex flex-col gap-y-4 items-center justify-center max-w-md">
            <div className="flex flex-col gap-y-2 items-center justify-center">
                <h1 className="text-2xl font-bold">
                  Join {data?.name}
                </h1>
                <p className="text-md text-muted-foreground">
                  Enter the workspace code to join
                </p>
            </div>
        </div>
        <VerifyInput handleComplete={handleComplete} isPending={isPending}/>
            <div className="flex gap-x-4">
                <Button
                size={"lg"}
                variant={"outline"}
                asChild
                >
                <Link href={"/"}>
                Back to home
                </Link>
                </Button>
        </div>
    </>
  )
}

export default JoinContent