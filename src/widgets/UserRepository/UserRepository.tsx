import { FC, ReactElement } from 'react';
import { IUserRepository } from 'shared/interfaces';
import s from './userRepository.module.sass';
import { Link } from 'react-router-dom';
import { useGetBranches } from 'shared/hooks/useQuery';

export const UserRepository: FC<IUserRepository> = ({ repo, username }): ReactElement => {
    const { branches, isLoading: isBranchesLoading, isError: isBranchesError } = useGetBranches(username!, repo);

    if (isBranchesLoading) {
        return <div>Loading...</div>;
    }

    if (isBranchesError) {
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
                {branches!.map((branch) => (
                    <p key={branch.name}>{branch.name}</p>
                ))}
            </div>
        </div>
    );
};