"use client"

import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { usePanel } from "@/hooks/use-panel";
import { Loader } from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";
import { Threads } from "@/features/messages/components/threads";
import { Profile } from "@/features/members/components/profile";

export const WorkspaceThreadPanel = () => {
    const { parentMessageId, onClose, profileMemberId } = usePanel();


    const showPanel = !!parentMessageId || !!profileMemberId;

    if (!showPanel) {
        return null
    }

    return (
        <>

            <ResizableHandle withHandle />
            <ResizablePanel minSize={20} defaultSize={29}>
                {parentMessageId ? (
                    <Threads
                        messageId={parentMessageId as Id<"messages">}
                        onClose={onClose}
                    />
                ) : profileMemberId ? (
                     <Profile 
                     memberId = {profileMemberId as Id<"members">}
                     onClose={onClose}
                     />
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <Loader className="animate-spin size-5 text-muted-foreground" />
                    </div>
                )}
            </ResizablePanel>
        </>
    )
}