import { FC, ReactElement } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import s from './userRepositories.module.sass';
import { RepoList } from 'widgets/RepoList';
import { UserRepository } from 'widgets/UserRepository';
import { useGetUserData, useGetUserRepositories, useGetUserStarRepositories } from 'shared/hooks/useQuery';
import { Error, Loading } from 'shared/components';

/**
 * Renders the user repositories component.
 *
 * @return {ReactElement} The rendered user repositories component.
 */
export const UserRepositories: FC = (): ReactElement => {
    const params = useParams();
    const [queryParameters] = useSearchParams();

    const repo = queryParameters.get('repo');
    const owner = queryParameters.get('owner');
    const username = params.username;

    const { user, isLoading: userLoad, isError: userError } = useGetUserData(username!);
    const { repositories, isLoading: repLoad, isError: repError } = useGetUserRepositories(username!);
    const { starredRepositories, isLoading: starLoad, isError: starError } = useGetUserStarRepositories(username!);

    if (userError || repError || starError) {
        return <Error data={'data'}/>;
    }

    if (repLoad || userLoad || starLoad) {
        return <Loading />;
    }

    return (
        <div className={s.userRepository}>
            <div className={s.info}>
                <img className={s.info_img} src={user?.avatar_url} alt="Avatar" />
                <h1 className={s.info_name}>{user?.login}</h1>
            </div>
            {
                owner && repo
                    ? <UserRepository username={owner} repo={repo} />
                    : <RepoList username={username} repositories={repositories} starredRepositories={starredRepositories} />
            }
        </div>
    );
};