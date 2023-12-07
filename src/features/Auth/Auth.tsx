import { FC, ReactElement } from 'react';
import s from './auth.module.sass';

interface IAuth {

};

export const Auth: FC<IAuth> = (): ReactElement => {
    return (
        <div className = { s.auth }>
            auth
        </div>
    );
};