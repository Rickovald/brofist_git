import { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import s from './navigation.module.sass';

export const Navigation: FC = (): ReactElement => {
    return (
        <div className={s.root}>
            <div className={s.wrapper}>
                <div className={s.links}>
                    <NavLink className={s.link} to='/'>Main</NavLink>
                    {/* COMPONENT LINKS */}
                </div>
            </div>
        </div>
    );
};