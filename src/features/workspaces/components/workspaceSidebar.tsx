"use client"

import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { useGetWorkspace } from "../api/use-get-workspace";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { AlertTriangle, Loader } from "lucide-react";
import WorkspaceHeader from "./workspace-header";

const WorkspaceSidebar = () => {
    const workspaceId = useWorkspaceId();

    const {data: member, isLoading: memberLoading} = useCurrentMember({workspaceId});
    const {data: workspace, isLoading: workspaceLoading} = useGetWorkspace({id: workspaceId});

    if(workspaceLoading || memberLoading) {
        return (
            <div className="flex flex-col bg-[#5E2C5F] justify-center">
                <Loader className="size-5 animate-spin text-white" />
            </div>
        );
    }

    if(!workspace || !member) {
        return (
            <div className="flex flex-col gap-y-2 bg-[#5E2C5F] justify-center items-center h-full">
                <AlertTriangle className="size-5 text-white" />
                <p className="text-white text-sm">
                    Workspace not found
                </p>
            </div>
        );
    }
  return (
    <div className="flex flex-col bg-[#5e2c5f] h-full">
        <WorkspaceHeader workspace={workspace} isAdmin={member.role === "admin"}/>
    </div>
  )
}

export default WorkspaceSidebar