"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal"
import { DialogDescription } from "@radix-ui/react-dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useCreateWorkspace } from "../api/use-create-workspace"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const CreateWorkSpaceModal = () => {
    const router = useRouter()
    const [name, setName] = useState("")
    const [open, setOpen] = useCreateWorkspaceModal()

    const { mutate , isPending } = useCreateWorkspace()

    const handleClose = () => {
        setOpen(false);
        setName("")
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
      mutate({ name}, {
        onSuccess(id) {
            toast.success("Workspace created successfully")
            router.push(`/workspace/${id}`)
            handleClose()
        }
      })
      }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Add a workspace
                    </DialogTitle>
                    <DialogDescription>
                        Create a new workspace to start collaborating with your team
                    </DialogDescription>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input 
                         value={name}
                         disabled={isPending}
                         required
                         autoFocus
                         minLength={3}
                         onChange={(e) => setName(e.target.value)}
                         placeholder="Workspace name e.g. 'Work', 'Personal', 'Home'"
                        />
                        <div className="flex justify-end">
                            <Button disabled={isPending}>
                                Create
                            </Button>
                        </div>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}