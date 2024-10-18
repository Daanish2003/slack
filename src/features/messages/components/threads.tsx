"use client"

import { Button } from "@/components/ui/button";
import { Id } from "../../../../convex/_generated/dataModel";
import { AlertTriangle, Loader, XIcon } from "lucide-react";
import { useGetMessage } from "../api/use-get-message";
import { Message } from "@/components/message";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useState } from "react";


interface ThreadsProps {
    messageId: Id<"messages">;
    onClose: () => void
}

export const Threads = ({ messageId, onClose }: ThreadsProps) => {
    const workspaceId = useWorkspaceId();

    const [editingId, setEditingId] = useState<Id<"messages"> | null>(null)

    const { data: currentMember } = useCurrentMember({ workspaceId });
    const { data: message, isLoading: loadingMessage } = useGetMessage({ id: messageId })

    if (loadingMessage) {
        return (
            <div className="h-full flex flex-col">
                <div className="flex justify-between items-center px-4 h-[49px] border-b">
                    <p className="text-lg font-bold">Threads</p>
                    <Button
                        onClick={onClose}
                        size={"iconSm"}
                        variant={"ghost"}
                    >
                        <XIcon className="size-5 stroke-[1.5]" />
                    </Button>
                </div>
                <div className="flex flex-col gap-y-2 h-full items-center justify-center">
                    <Loader className="size-5 animate-spin text-muted-foreground" />
                </div>
            </div>
        );
    }

    if (!message) {
        return (
            <div className="h-full flex flex-col">
                <div className="flex justify-between items-center px-4 h-[49px] border-b">
                    <p className="text-lg font-bold">Threads</p>
                    <Button
                        onClick={onClose}
                        size={"iconSm"}
                        variant={"ghost"}
                    >
                        <XIcon className="size-5 stroke-[1.5]" />
                    </Button>
                </div>
                <div className="flex flex-col gap-y-2 h-full items-center justify-center">
                    <AlertTriangle className="size-5 animate-spin text-muted-foreground" />
                    <p className="text-sn text-muted-foreground">Message not found</p>
                </div>
            </div>
        )
    }
    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center px-4 h-[49px] border-b">
                <p className="text-lg font-bold">Threads</p>
                <Button
                    onClick={onClose}
                    size={"iconSm"}
                    variant={"ghost"}
                >
                    <XIcon className="size-5 stroke-[1.5]" />
                </Button>
            </div>
            <div>
                <Message
                    hideThreadsButton
                    memberId={message.memberId}
                    authorImage={message.user.image}
                    authorName={message.user.name}
                    isAuthor={message.memberId === currentMember?._id}
                    image={message.image}
                    body={message.body}
                    createdAt={message._creationTime}
                    updatedAt={message.updatedAt}
                    id={message._id}
                    reactions={message.reactions}
                    isEditing={editingId === messageId}
                    setEditingId={setEditingId}
                />
            </div>
        </div>
    )
}