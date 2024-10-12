import UserButton from "@/features/auth/components/user-button";
import { Workspace } from "@/features/workspaces/components/workspace";

export default function Home() {
  
  return (
    <div>
      <UserButton />
      <Workspace />
    </div>
  );
}
