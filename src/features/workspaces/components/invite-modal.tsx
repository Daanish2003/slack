import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CopyIcon, RefreshCcw } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';
import { useNewJoinCode } from '../api/use-new-join-code';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { useConfrim } from '@/hooks/use-confirm';
import { useRouter } from 'next/navigation';

interface InviteModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    name: string;
    joinCode: string;
}

const InviteModal = ({
    open,
    setOpen,
    name,
    joinCode
}: InviteModalProps) => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const [ConfirmDialog, confirm] = useConfrim(
        "Are you sure?",
        "This will invalidate the current invite code and generate a new one"
    )

    const { mutate, isPending } = useNewJoinCode();

    const handleNewCode = async () => {
        const ok = await confirm();

        if(!ok) return;

        mutate({
            workspaceId
        }
        ,{
            onSuccess: () => {
                toast.success("Invite code regenerated")
                router.refresh("/")

            },
            onError: () => {
                toast.error("Failed to regenerate invite code")
            }
        })
    }
    const handleCopy = () => {
        const inviteLink = `${window.location.origin}/join/${joinCode}`;

        navigator.clipboard.writeText(inviteLink).then(
            () => {
                toast.success("Link copied to clipboard");
            }
        );
    }
  return (
    <>
    <ConfirmDialog />
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Invite people to {name}
                </DialogTitle>
                <DialogDescription>
                    Use the code below to invite people to your workspace
                </DialogDescription>
            </DialogHeader>
            <div className='flex flex-col gap-y-4 items-center justify-center py-10'>
              <p className='text-4xl font-bold tracking-widest uppercase'>
                {joinCode}
              </p>
              <Button
              onClick={handleCopy}
              variant={"ghost"}
              size={"sm"}
              className='focus-visible:ring-0'
              >
                Copy link
                <CopyIcon className="size-4 ml-2" />
              </Button>
            </div>
            <div className='flex items-center justify-between w-full'>
                <Button
                disabled={isPending}
                onClick={handleNewCode}
                variant={"outline"}
                >
                    New Code
                    <RefreshCcw className='size-4 ml-1'/>
                </Button>
                <DialogClose asChild>
                    <Button>Close</Button>
                </DialogClose>
            </div>
        </DialogContent>
    </Dialog>
    </>
  )
}

export default InviteModal