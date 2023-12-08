import { FC, ReactElement } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Repository } from 'shared/interfaces';
import { gitTokenConfig } from 'shared/configs';
import s from './userRepository.module.sass';
import { Link } from 'react-router-dom';

interface Branch {
    name: string;
};

interface UserRepo {
    repo: string;
    username: string | undefined;
}

export const UserRepository: FC<UserRepo> = ({ repo, username }): ReactElement => {
    const repositoryQuery = useQuery<Repository>({
        queryKey: ['repository'],
        queryFn: async () => axios.get(`https://api.github.com/repos/${username}/${repo}`, gitTokenConfig).then((response) => response.data)
    });
    const { data: branchesQuery, isLoading: branchesLoading, isError: branchesError } = useQuery<Branch[]>({
        queryKey: ['branches'],
        queryFn: async () => axios.get(`https://api.github.com/repos/${username}/${repo}/branches`, gitTokenConfig).then((response) => response.data)
    });

    if (repositoryQuery.isLoading || branchesLoading) {
        return <div>Loading...</div>;
    }

    if (repositoryQuery.error || branchesError) {
        return <div>Error loading data</div>;
    }

    return (
        <div className={s.userRepository}>
            <h1>Repository name: {repo}</h1>

            <div className={s.info}>
                <p>Author: <Link className={s.authorLink} to={`/repos/${username}`}>{username}</Link></p>
                <Link className={s.back} to={window.location.pathname.split('?')[0]}>Назад</Link>
            </div>

            <h2 className={s.branches_header}>Branches:</h2>
            <div className={s.branches}>
                {branchesQuery!.map((branch) => (
                    <p key={branch.name}>{branch.name}</p>
                ))}
            </div>
        </div>
    );
};