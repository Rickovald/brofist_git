import { FC, ReactElement, useState } from 'react';
import s from './repoList.module.sass';
import { Repository } from 'shared/interfaces';
import { NavLink } from 'react-router-dom';
interface IRepoList {
    repositories: Repository[] | undefined;
    starredRepositories: Repository[] | undefined;
    username: string | undefined;
}

export const RepoList: FC<IRepoList> = ({
    repositories,
    starredRepositories,
    username
}): ReactElement => {
    const [isStarred, switchStarred] = useState<boolean>(false);
    const [pageNumber, setPageNumber] = useState<number>(1);
    console.log(
        starredRepositories?.length &&
            pageNumber * 10 >= starredRepositories.length
    );

    return (
        <div className={s.repos_wrap}>
            <div className={s.repos_head}>
                <h2>Repositories:</h2>

                <div
                    className={s.starSwitch}
                    onClick={() => switchStarred(!isStarred)}
                >
                    {!isStarred
                        ? 'Show Starred Repositories'
                        : 'Show All Repositories'}
                </div>
            </div>
            <div className={s.repos}>
                {!isStarred
                    ? repositories?.map((repo: any) => (
                        <NavLink
                            to={`/repos/${username}?repo=${repo.name}&owner=${repo.owner.login}`}
                            className={s.repo}
                            key={repo.id}
                        >
                            <p>{repo.name}</p>
                        </NavLink>
                    ))
                    : starredRepositories
                        ?.slice((pageNumber - 1) * 10, pageNumber * 10)
                        .map((repo: any) => (
                            <NavLink
                                to={`/repos/${username}?repo=${repo.name}&owner=${repo.owner.login}`}
                                className={s.repo}
                                key={repo.id}
                            >
                                <p>Название: {repo.owner.login}</p>
                                <p>Название: {repo.name}</p>
                            </NavLink>
                        ))}
                {isStarred
                    ? (
                        <div>
                            <button
                                disabled={!starredRepositories || pageNumber <= 1}
                                onClick={() => setPageNumber(pageNumber - 1)}
                            >
                            Previous
                            </button>

                            <button
                                disabled={
                                    !starredRepositories ||
                                pageNumber * 10 >= starredRepositories.length
                                }
                                onClick={() => setPageNumber(pageNumber + 1)}
                            >
                            Next
                            </button>
                        </div>
                    )
                    : (
                        ''
                    )}
            </div>
        </div>
    );
};