import { FC, ReactElement } from 'react';
import s from './userRepository.module.sass';

interface IUserRepository {

};

export const UserRepository: FC<IUserRepository> = (): ReactElement => {
    return (
        <div className = { s.userRepository }>
            userRepository
        </div>
    );
};