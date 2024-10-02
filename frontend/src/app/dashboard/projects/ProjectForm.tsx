"use client";
import SelectUser from "@/components/shared/SelectUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { DatePicker } from "@/components/ui/date-picker";
import api from "@/lib/api";
import { toast } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PROJECT_STATUS } from "@/constant";
import { useTeamMembers } from "@/lib/services/user";
import { useSWRConfig } from "swr";
import { Project } from "@/index";
interface AddNewProjectFormProps {
  isUpdate: boolean;
  setIsOpen: (isOpen: boolean) => void;
  project?: Project;
}
interface FormData {
  title: string;
  desc: string;
  members: string[];
  dueDate: Date;
  status?: string;
}
const initialFormData: FormData = {
  title: "",
  desc: "",
  members: [],
  dueDate: new Date(),
  status: PROJECT_STATUS.ACTIVE,
};
const ProjectForm: React.FC<AddNewProjectFormProps> = ({ isUpdate, setIsOpen, project }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const { users, isLoading } = useTeamMembers({});
  const [pending, setPending] = useState<boolean>(false);
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (isUpdate) {
      setFormData({
        title: project?.title!,
        desc: project?.desc!,
        members: project?.members.map(member => member._id)!,
        dueDate: project?.dueDate!,
        status: project?.status!,
      });
    }

    console.log(formData);
  }, [isUpdate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    setPending(true);
    try {
      if (isUpdate) {
        console.log(formData)
        console.log(project?._id)
        await api.put(`/projects/${project?._id}`, formData);
      } else {
        await api.post("/projects", formData);
        toast.success("Project created successfully");
      }
      mutate("/projects");
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setPending(false);
      setIsOpen(false);
    }
  };

  return (
    <div>
      <form onSubmit={e => e.preventDefault()} className="space-y-4 max-h-[500px] overflow-y-auto">
        <div>
          <Label htmlFor="title">Project Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter project title"
          />
        </div>
        <div>
          <Label htmlFor="desc">Project Description</Label>
          <Textarea
            id="desc"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            placeholder="Enter project description"
          />
        </div>
        <div>
          <Label htmlFor="assignedTo">Assigned To</Label>
          <SelectUser
            users={users}
            selectedUsers={formData.members}
            onSelectUser={selUsers => setFormData({ ...formData, members: selUsers })}
          />
        </div>
        <div>
          <Label htmlFor="dueDate">Due Date</Label>
          <DatePicker
            className="w-full"
            date={formData.dueDate}
            onDateChange={date => setFormData({ ...formData, dueDate: date })}
          />
        </div>
        {isUpdate && (
          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={val => setFormData({ ...formData, status: val })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(PROJECT_STATUS).map(status => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <Button onClick={handleSubmit} className="mt-4 w-full" pending={pending}>
          {isUpdate ? "Save" : "Add Project"}
        </Button>
      </form>
    </div>
  );
};

export default ProjectForm;
