import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { IBranch, IRepository, User } from 'shared/interfaces';
import { gitTokenConfig } from '../configs';

export const useGetUserData = (username: string) => {
    const { data: user, isLoading, isError } = useQuery<User>({
        queryKey: ['user', username],
        staleTime: 60000,
        queryFn: async () => await axios.get(`https://api.github.com/users/${username}`, gitTokenConfig).then((response) => response.data)
    });
    return { user, isLoading, isError };
};

export const useGetUserRepositories = (username: string) => {
    const { data: repositories, isLoading, isError } = useQuery<IRepository[]>({
        queryKey: ['repositories', username],
        staleTime: 60000,
        queryFn: async () => await axios.get(`https://api.github.com/users/${username}/repos`, gitTokenConfig).then((response) => response.data.slice(0, 10))
    });
    return { repositories, isLoading, isError };
};

export const useGetUserStarRepositories = (username: string) => {
    const { data: starredRepositories, isLoading, isError } = useQuery<IRepository[]>({
        queryKey: ['starredRepositories', username],
        staleTime: 60000,
        queryFn: async () => await axios.get(`https://api.github.com/users/${username}/starred`, gitTokenConfig).then((response) => response.data)
    });
    return { starredRepositories, isLoading, isError };
};

export const useGetUserRepository = (username: string, repo: string) => {
    const { data: repository, isLoading, isError } = useQuery<IRepository>({
        queryKey: ['repository', repo],
        staleTime: 60000,
        queryFn: async () => await axios.get(`https://api.github.com/repos/${username}/${repo}`, gitTokenConfig).then((response) => response.data)
    });
    return { repository, isLoading, isError };
};

export const useGetBranches = (username: string, repo: string) => {
    const { data: branches, isLoading, isError } = useQuery<IBranch[]>({
        queryKey: ['branches', repo],
        staleTime: 60000,
        queryFn: async () => await axios.get(`https://api.github.com/repos/${username}/${repo}/branches`, gitTokenConfig).then((response) => response.data)
    });
    return { branches, isLoading, isError };
};