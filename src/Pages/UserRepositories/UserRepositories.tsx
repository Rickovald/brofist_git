import { FC, ReactElement, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import s from './userRepositories.module.sass';
interface User {
    login: string;
    avatar_url: string;
}

interface Repository {
    name: string;
    html_url: string;
    stargazers_count: number;
}

export const UserRepositories: FC = (): ReactElement => {
    const [isStarred, switchStarred] = useState<boolean>(false);
    const params = useParams();

    const config = {
        headers: {
            Authorization: 'Bearer <your token>'
        }
    };

    const username = params.username;

    const { data: user, isLoading: isUserLoading, isError: UserError } = useQuery<User>({
        queryKey: ['user', username],
        staleTime: 60000,
        queryFn: () => axios.get(`https://api.github.com/users/${username}`).then((response) => response.data)
    });

    const { data: repositories, isLoading: areRepositoriesLoading, isError: RepoError } = useQuery<Repository[]>({
        queryKey: ['repositories', username],
        staleTime: 60000,
        queryFn: () => axios.get(`https://api.github.com/users/${username}/repos`).then((response) => response.data.slice(0, 10))
    });

    const { data: starredRepositories, isLoading: areStarRepositoriesLoading, isError: StarRepoError } = useQuery<Repository[]>({
        queryKey: ['starredRepositories', username],
        staleTime: 60000,
        queryFn: () => axios.get(`https://api.github.com/users/${username}/starred`, config).then((response) => response.data.slice(0, 10))
    });

    console.log(repositories, starredRepositories);
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

            <div className={s.repos_wrap}>
                <div className={s.starSwitch} onClick={() => switchStarred(!isStarred)}>
                    {!isStarred
                        ? 'Starred Repositories'
                        : 'All Repositories'
                    }

                </div>

                <h2>Repositories:</h2>

                <div className={s.repos}>
                    {!isStarred
                        ? repositories?.map((repo: any) => (
                            <div className={s.repo} key={repo.name}>
                                <p>{repo.name}</p>
                            </div>
                        ))
                        : starredRepositories?.map((repo: any) => (
                            <div className={s.repo} key={repo.name}>
                                <p>Название: {repo.owner.login}</p>
                                <p>Название: {repo.name}</p>
                            </div>
                        ))

                    }
                </div>
            </div>
        </div>
    );
};