import { FC } from 'react';
import { IError } from './interfaces';

export const Error: FC<IError> = ({ data }) => {
    return (
        <div>Error loading {data}</div>
    );
};

export const Loading = () => {
    return (
        <div>Loading...</div>
    );
};