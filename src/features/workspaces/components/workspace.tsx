"use client"

import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal"
import { useGetWorkspaces } from "../api/use-get-workspaces"
import { useRouter } from "next/navigation"
import { useEffect, useMemo } from "react"

export const Workspace = () => {
    const router = useRouter()
    const [open, setOpen] = useCreateWorkspaceModal()
    const { data, isLoading } = useGetWorkspaces()

    const workspacesId = useMemo(() => data?.[0]?._id, [data])

    useEffect(() => {
       if(isLoading) return;

       if(workspacesId) {
          router.replace(`/workspace/${workspacesId}`);
       } else if(!open) {
            setOpen(true)
       }
    }, [workspacesId, isLoading, open, setOpen, router])

    return (
        <>
        </>
    )
}