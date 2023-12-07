import { FC, ReactElement } from 'react';
import s from './contacts.module.sass';

export const Contacts: FC = (): ReactElement => {
    return (
        <div className={s.root}>
            Contacts
        </div>
    );
};