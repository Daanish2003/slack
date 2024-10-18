"use client"

import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { usePanel } from "@/hooks/use-panel";
import { Loader } from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";
import { Threads } from "@/features/messages/components/threads";

export const WorkspaceThreadPanel = () => {
    const { parentMessageId, onClose } = usePanel();


    const showPanel = !!parentMessageId;

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
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <Loader className="animate-spin size-5 text-muted-foreground" />
                    </div>
                )}
            </ResizablePanel>
        </>
    )
}