import { FC, ReactElement } from 'react';
import s from './search.module.sass';

interface ISearch {

};

export const Search: FC<ISearch> = (): ReactElement => {
    return (
        <div className = { s.search }>
            search
        </div>
    );
};