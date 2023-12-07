import { FC, ReactElement } from 'react';
import s from './error404.module.sass';

export const Error404: FC = (): ReactElement => {
    return (
        <div className={s.root}>
            Ой, а такой странички не существует :(
        </div>
    );
};