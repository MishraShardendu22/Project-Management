/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const api = axios.create({ baseURL: "/api" });

export const useFetchTasks = () => {
    const { data, error, isPending, isError, isFetching } = useQuery(
        { 
            queryKey: ["tasks"], 
            queryFn: () => api.get("/tasks").then(res => res.data),
        }
    );
    return { data, error, isPending, isError, isFetching };
};

export const useCreateTask = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: (task: any) => api.post("/tasks", task).then(res => res.data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
    });
    return { mutate, isPending, isError, error };
};

export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: ({ projectId, updates }: { projectId: string; updates: any }) =>
            api.put(`/tasks/${projectId}`, updates).then(res => res.data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
    });
    return { mutate, isPending, isError, error };
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: (projectId: string) => api.delete(`/tasks?projectId=${projectId}`).then(res => res.data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
    });
    return { mutate, isPending, isError, error };
};

export const useFetchProjects = () => {
    const { data, error, isPending, isError, isFetching } = useQuery({
        queryKey: ["projects"],
        queryFn: () => api.get("/projects").then(res => res.data),
    });
    return { data, error, isPending, isError, isFetching };
};

export const useCreateProject = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: (project: any) => api.post("/projects", project).then(res => res.data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
    });
    return { mutate, isPending, isError, error };
};

export const useUpdateProject = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: ({ projectId, updates }: { projectId: string; updates: any }) =>
            api.put(`/projects/${projectId}`, updates).then(res => res.data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
    });
    return { mutate, isPending, isError, error };
};

export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: (projectId: string) => api.delete(`/projects?projectId=${projectId}`).then(res => res.data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
    });
    return { mutate, isPending, isError, error };
};

export const useFetchCategories = () => {
    const { data, error, isPending, isError, isFetching } = useQuery({
        queryKey: ["categories"],
        queryFn: () => api.get("/categories").then(res => res.data),
    });
    return { data, error, isPending, isError, isFetching };
};

export const useCreateCategory = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: (category: any) => api.post("/categories", category).then(res => res.data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
    });
    return { mutate, isPending, isError, error };
};

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: ({ categoryId, name }: { categoryId: string; name: string }) =>
            api.put(`/categories/${categoryId}`, { name }).then(res => res.data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
    });
    return { mutate, isPending, isError, error };
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: (categoryId: string) => api.delete(`/categories/${categoryId}`).then(res => res.data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
    });
    return { mutate, isPending, isError, error };
};
