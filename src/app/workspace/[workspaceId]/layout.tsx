import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import Sidebar from "@/features/workspaces/components/sidebar"
import Toolbar from "@/features/workspaces/components/toolbar"
import { WorkspaceThreadPanel } from "@/features/workspaces/components/workspace-thread-panel"
import WorkspaceSidebar from "@/features/workspaces/components/workspaceSidebar"
import { usePanel } from "@/hooks/use-panel"

interface WorkspaceIdLayoutProps {
    children: React.ReactNode
}

const WorkspaceLayout = ({children}: WorkspaceIdLayoutProps) => {


  return (
    <div className="h-full">
        <Toolbar />
        <div className="flex h-[calc(100vh-40px)]">
        <Sidebar />
        <ResizablePanelGroup
        direction="horizontal"
        autoSaveId={"channel-layout"}
        >
        <ResizablePanel
        defaultSize={20}
        minSize={11}
        className="bg-[#5e2c5f]"
        >
        <WorkspaceSidebar />
        </ResizablePanel>
        <ResizableHandle withHandle/>
        <ResizablePanel minSize={20}>
           {children}
        </ResizablePanel>
        <WorkspaceThreadPanel />
        </ResizablePanelGroup>
        </div>
    </div>
  )
}

export default WorkspaceLayout