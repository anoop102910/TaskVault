"use client";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Dropdown } from "@/components/ui/dropdown-menu";
import { PencilIcon, TrashIcon } from "lucide-react";
import { DialogForm } from "@/components/ui/dialog";
import { DeleteAlert } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { AvatarGroup } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Project } from "@/index";
import { cn } from "@/lib/utils";
import StatusBadge from "./StatusBadge";
import ProjectForm from "./ProjectForm";
import api from "@/lib/api";
import { toast } from "@/lib/utils";
import { useSWRConfig } from "swr"

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const { title, desc, dueDate, status, members, progress } = project;
  const { mutate } = useSWRConfig()

  const handleProjectDelete = async () => {
    setPending(true);
    try {
      const res = await api.delete(`/projects/${project._id}`);
      mutate("/projects")
      console.log(res);
      toast.success("Project deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setPending(false);
    }
  };


  return (
    <div
      className={cn(
        "rounded-xl border p-4 dark:bg-gray-800",
        "dark:text-white bg-white "
      )}
    >
      <div className="flex justify-between items-center mb-2 ">
        <StatusBadge status={status} />
        <Dropdown
          items={[
            {
              label: "Edit",
              renderItem: () => (
                <>
                  <div className="flex items-center gap-2">
                    <PencilIcon className="w-4 h-4" />
                    Edit
                  </div>
                </>
              ),
              icon: <PencilIcon className="w-4 h-4" />,
              onClick: () => setIsEditDialogOpen(true),
            },
            {
              label: "Delete",
              renderItem: () => (
                <>
                  <TrashIcon className="w-4 h-4" />
                  Delete
                </>
              ),
              icon: <TrashIcon className="w-4 h-4" />,
              onClick: () => setIsDeleteAlertOpen(true),
            },
          ]}
        >
          <DotsVerticalIcon className="w-4 h-4" />
        </Dropdown>
      </div>
      <h3 className="text-semibold ">{title}</h3>
      <span className="text-xs text-slate-700 dark:text-slate-300 mb-4 block">
        Due Date: {new Date(dueDate).toLocaleDateString()}
      </span>
      <p className="text-sm text-slate-700 dark:text-slate-300">{desc}</p>
      <Separator className="my-4" />
      <div className="flex items-center justify-between gap-4 ">
        <Progress value={progress} />
        <AvatarGroup users={members.slice(0, 3)} size="sm" />
      </div>

      <>
        <DialogForm open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <ProjectForm isUpdate={true} setIsOpen={setIsEditDialogOpen} project={project} />
        </DialogForm>
        <DeleteAlert
          title="Delete Project"
          desc="Are you sure you want to delete this project?"
          onDelete={handleProjectDelete}
          onCancel={() => {}}
          open={isDeleteAlertOpen}
          setOpen={setIsDeleteAlertOpen}
          pending={pending}
        />
      </>
    </div>
  );
};

export default ProjectCard;
