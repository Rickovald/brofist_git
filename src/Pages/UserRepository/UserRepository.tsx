import { FC, ReactElement } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface User {
    login: string;
    avatar_url: string;
}

interface Repository {
    name: string;
    html_url: string;
    stargazers_count: number;
}

export const UserRepository: FC = (): ReactElement => {
    const params = useParams();
    console.log(params);

    const username = params.username;
    const { isLoading, error, data: user, isLoading: isUserLoading } = useQuery<User>({
        queryKey: ['user', username],
        queryFn: () => axios.get(`https://api.github.com/users/${username}`).then((response) => response.data)
    });

    const { data: repositories, isLoading: areRepositoriesLoading } = useQuery<Repository[]>({
        queryKey: ['repositories', username],
        queryFn: () => axios.get(`https://api.github.com/users/${username}/repos`).then((response) => response.data.slice(0, 10))
    });

    if (isLoading) return <div />;

    if (error) return <div>An error has occurred: + {error.message}</div>;

    if (isUserLoading || areRepositoriesLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{user?.login}</h1>
            <img src={user?.avatar_url} alt="Avatar" />

            <h2>Repositories:</h2>
            <ul>
                {repositories?.map((repo: any) => (
                    <li key={repo.name}>
                        <a href={repo.html_url}>{repo.name}</a>
                    </li>
                ))}
            </ul>

            <a href="/starred-repositories">Starred Repositories</a>
        </div>
    );
};