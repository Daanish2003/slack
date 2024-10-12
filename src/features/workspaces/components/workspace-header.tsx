import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Doc } from '../../../../convex/_generated/dataModel'
import { ChevronDown, ListFilter, Square, SquarePen } from 'lucide-react'
import { Hint } from '@/components/hint'
import { PreferenceModal } from './preferenceModal'
import { useState } from 'react'

interface WorkspaceHeaderprops {
    workspace: Doc<"workspaces">
    isAdmin: boolean
}


const WorkspaceHeader = ({workspace ,isAdmin}: WorkspaceHeaderprops) => {
    const [preferencesOpen, setPreferencesOpen] = useState(false);
  return (
    <>
    <PreferenceModal 
       open={preferencesOpen} 
       setOpen={setPreferencesOpen} 
       initialValue={workspace.name} 
    />
    <div className='flex items-center px-4 h-[49px] gap-0.5 justify-between'>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                variant={"transparent"}
                className='font-semibold text-lg w-auto p-1.5 overflow-hidden focus-visible:ring-0'
                size={"sm"}
                >
                    <span className='truncate'>{workspace.name}</span>
                    <ChevronDown className='size-4 ml-1' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side='bottom' align='start' className='w-64'>
                <DropdownMenuItem className='cursor-pointer capitalize'>
                    <div className='size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-xl rounded-md flex items-center mr-2 justify-center'>
                        {workspace.name.charAt(0).toUpperCase()}
                    </div>
                    <div className='flex flex-col items-start'>
                        <p className='font-bold'>{workspace.name}</p>
                        <p className='text-xs text-muted-foreground'>Active workspace</p>
                    </div>
                </DropdownMenuItem>
                {
                    isAdmin && (
                        <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                           className='cursor-pointer py-2'
                           onClick={() => {}}
                        >
                        Invite People to {workspace.name}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                           className='cursor-pointer py-2'
                           onClick={() => setPreferencesOpen(true)}
                        >
                        Preferences
                        </DropdownMenuItem>
                        </>
                    )
                }
            </DropdownMenuContent>
        </DropdownMenu>
        <div className='flex items-center gap-0.5'>
            <Hint label='Filter' side="bottom">
            <Button variant={"transparent"} size={"iconSm"}>
                <ListFilter className="size-4" />
            </Button>
            </Hint>
            <Hint label="New messsage" side="bottom">
            <Button variant={"transparent"} size={"iconSm"}>
                <SquarePen className="size-4" />
            </Button>
            </Hint>
        </div>
    </div>
    </>
  )
}

export default WorkspaceHeader