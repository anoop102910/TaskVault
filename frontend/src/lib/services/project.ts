import { Project } from "@/index";
import { toast } from "@/lib/utils";
import { fetcher, useSWRWithParams } from "./util";
import api from "@/lib/api";
import { useState } from "react";

interface ProjectsParams {
  _id?: string;
  status?: string;
  search?: string;
}

export const filterProjects = (projects: Project[], params?: ProjectsParams) => {
  return projects.filter(project => {
    if (params?.status && project.status !== params.status) {
      return false;
    }
    if (params?.search && !project.title.includes(params.search)) {
      return false;
    }
    if (params?._id && project._id !== params._id) {
      return false;
    }
    return true;
  });
};

export const useProjects = (params?: ProjectsParams) => {
  const { data, error, isLoading, mutate } = useSWRWithParams<Project[]>("/projects", fetcher);
  console.log("data", data);
  const filteredProjects = data ? filterProjects(data, params) : undefined;
  return { projects: filteredProjects, error, isLoading, mutate };
};

export const useCreateProject = () => {
  const [pending, setPending] = useState(false);

  const createProject = async (project: Project) => {
    setPending(true);
    try {
      const res = await api.post("/projects", project);
      toast.success("Project created successfully");
      return res.data;
    } catch (error) {
      toast.error(error);
      setPending(false);
      throw error;
    } finally {
      setPending(false);
    }
  };
  return { createProject, pending };
};

export const updateProject = async (project: Project) => {
  try {
    const res = await api.put(`/projects/${project._id}`, project);
    toast.success("Project updated successfully");
    return res.data;
  } catch (error) {
    toast.error(error);
    throw error;
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    await api.delete(`/projects/${projectId}`);
    toast.success("Project deleted successfully");
  } catch (error) {
    toast.error(error);
    throw error;
  }
};
