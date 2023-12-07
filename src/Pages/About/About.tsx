import { FC, ReactElement } from 'react';
import s from './about.module.sass';

export const About: FC = (): ReactElement => {
    return (
        <div className={s.root}>
            About
        </div>
    );
};