import React, { FC, ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import s from './main.module.sass';

export const Main: FC = (): ReactElement => {
    const [username, setUsername] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    return (
        <div className={s.root}>
            <div>
                <p className={s.label}>Найти пользователя: </p>
                <input className={s.input} type="text" value={username} onChange={handleChange} />
                <Link className={s.button} to={`/repos/${username}`}>Перейти</Link>
            </div>
        </div>
    );
};