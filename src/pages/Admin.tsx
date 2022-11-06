import React, { useCallback, useMemo, useState } from 'react';
import { List } from '../components/UI/List';
import { ListItem } from '../components/UI/ListItem';
import { HomeButtons } from '../components/home/HomeButtons';
import { IUser } from '../ts/types';
import { getUserList } from '../requests/admin';
import classes from './Admin.module.scss';

export const Admin: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  const usersList = useMemo(
    () =>
      users.map((user) => (
        <ListItem
          key={user.id}
          title={`${user.firstName} ${user.lastName}`}
          action={handleUserAction}
          icon="../assets/icons/profile-header.svg"
        />
      )),
    [users]
  );

  const handleUserAction = () => {};

  const getUsers = useCallback((page = 0) => {
    return getUserList(page).then(({ data }) => {
      data.length && setUsers((prev) => [...prev, ...data]);
      return data.length;
    });
  }, []);

  return (
    <main className={classes['admin']}>
      <HomeButtons />
      <div className={classes['users']}>
        <h3 className={classes['list__title']}>Пользователи</h3>
        <List title="Администраторы" data={usersList} getData={getUsers} />
      </div>
    </main>
  );
};
