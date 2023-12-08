import { FC, ReactElement } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams, useSearchParams } from 'react-router-dom';
import s from './userRepositories.module.sass';
import { RepoList } from 'widgets/RepoList';
import { Repository } from 'shared/interfaces';
import { UserRepository } from 'widgets/UserRepository';
import { gitTokenConfig } from 'shared/configs';
interface User {
    login: string;
    avatar_url: string;
}

export const UserRepositories: FC = (): ReactElement => {
    const params = useParams();
    const [queryParameters] = useSearchParams();
    const repo = queryParameters.get('repo');
    const owner = queryParameters.get('owner');

    const username = params.username;

    const { data: user, isLoading: isUserLoading, isError: UserError } = useQuery<User>({
        queryKey: ['user', username],
        staleTime: 60000,
        queryFn: async () => axios.get(`https://api.github.com/users/${username}`, gitTokenConfig).then((response) => response.data)
    });

    const { data: repositories, isLoading: areRepositoriesLoading, isError: RepoError } = useQuery<Repository[]>({
        queryKey: ['repositories', username],
        staleTime: 60000,
        queryFn: async () => axios.get(`https://api.github.com/users/${username}/repos`, gitTokenConfig).then((response) => response.data.slice(0, 10))
    });

    const { data: starredRepositories, isLoading: areStarRepositoriesLoading, isError: StarRepoError } = useQuery<Repository[]>({
        queryKey: ['starredRepositories', username],
        staleTime: 60000,
        queryFn: async () => axios.get(`https://api.github.com/users/${username}/starred`, gitTokenConfig).then((response) => response.data)
    });

    if (UserError || RepoError || StarRepoError) {
        return <div>Error loading repositories</div>;
    }

    if (isUserLoading || areRepositoriesLoading || areStarRepositoriesLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={s.userRepository}>
            <div className={s.info}>
                <img className={s.info_img} src={user?.avatar_url} alt="Avatar" />
                <h1>{user?.login}</h1>
            </div>
            {/* <RepoList username={username} repositories={repositories} starredRepositories={starredRepositories} /> */}
            {
                owner && repo
                    ? <UserRepository username={owner} repo={repo} />
                    : <RepoList username={username} repositories={repositories} starredRepositories={starredRepositories} />
            }
        </div>
    );
};