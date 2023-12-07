import { FC, ReactElement } from 'react';
import s from './main.module.sass';

export const Main: FC = (): ReactElement => {
    return (
        <div className={s.root}>
            Main
        </div>
    );
};