import React, { useCallback, useMemo, useState } from 'react';
import { HomeButtons } from '../components/home/HomeButtons';
import { Button } from '../components/UI/Button';
import { Dropdown } from '../components/UI/Dropdown';
import { Input } from '../components/UI/Input';
import { List } from '../components/UI/List';
import { ListItem } from '../components/UI/ListItem';
import { useTranslations } from '../hooks/useTranslations';
import { addUser, getUserList } from '../requests/admin';
import { IAddUser, IUser, Role } from '../ts/types';
import classes from './AddUser.module.scss';
import globalClasses from '../assets/sass/base/_base.scss';

interface IFormValues {
  firstName: string;
  lastName: string;
  iin: string;
  phoneNumber: string;
  email: string;
}

export const AddUser = () => {
  const { t } = useTranslations();
  const [values, setValues] = useState<IFormValues>({
    firstName: '',
    lastName: '',
    iin: '',
    phoneNumber: '',
    email: '',
  });
  const [userList, setUserList] = useState<IUser[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role>(Role.STOREKEEPER);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const options: string[] = ['STOREKEEPER', 'MAIN_STOREKEEPER', 'AUDITOR', 'ACCOUNTANT', 'GUEST'];

  const getUsers = useCallback((page = 0) => {
    return getUserList(page).then(({ data }) => {
      data.length && setUserList((prev) => [...prev, ...data]);
      return data.length;
    });
  }, []);

  const getAllUsers = useMemo(
    () =>
      userList.map((u) => (
        <ListItem
          key={u.id}
          title={`${u.firstName} ${u.lastName}`}
          action={handleUserAction}
          icon="../assets/icons/profile-header.svg"
          actionFav={handleEditAction}
          actionIcon="../../assets/icons/edit-icon.svg"
        />
      )),
    [userList]
  );

  const handleUserAction = () => {
    return;
  };

  const handleEditAction = () => {
    return;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddClick = () => {
    const { firstName, lastName, email, phoneNumber, iin } = values;
    if (
      firstName.length &&
      lastName.length &&
      email.length &&
      phoneNumber.length &&
      iin.length &&
      selectedRole
    ) {
      setError(false);
      const param: IAddUser = {
        active: true,
        email: values.email,
        firstName: values.firstName,
        id: 0,
        iin: values.iin,
        lastName: values.lastName,
        orgId: 0,
        phoneNumber: values.phoneNumber,
        role: selectedRole,
      };
      addUser(param)
        .then((res) => {
          setSuccess(res.success);
        })
        .catch((err) => console.log(err));
    } else {
      setError(true);
    }
  };

  return (
    <main className={classes['user']}>
      <HomeButtons />
      <div className={classes['user__body']}>
        <div className={classes['user__left']}>
          <List title="Администраторы" data={getAllUsers} getData={getUsers} />
        </div>
        <div className={classes['user__right']}>
          <Input
            className={classes['user__input']}
            value={values.firstName}
            name={'firstName'}
            label={t('name')}
            onChange={handleInputChange}
          />
          <Input
            className={classes['user__input']}
            value={values.lastName}
            name={'lastName'}
            label={t('surname')}
            onChange={handleInputChange}
          />
          <Input
            className={classes['user__input']}
            value={values.iin}
            name={'iin'}
            label={t('iin')}
            onChange={handleInputChange}
          />
          <Input
            className={classes['user__input']}
            value={values.phoneNumber}
            name={'phoneNumber'}
            label={t('phone-number')}
            onChange={handleInputChange}
          />
          <Input
            className={classes['user__input']}
            value={values.email}
            onChange={handleInputChange}
            name={'email'}
            label={t('email')}
          />
          <p className={classes['user__label']}>{t('choose_role')}</p>
          <div className={classes['user__dropdown']}>
            <Dropdown
              options={options}
              placeholder={'choose role'}
              withSearch={false}
              classname={'diff-border'}
              onChange={setSelectedRole}
              valueKey={'name'}
            />
          </div>
          {error && <p className={globalClasses['error']}>Заполните все поля</p>}
          {success && <p className={globalClasses['success']}>Пользователь успешно добавлен</p>}
          <Button variant={'primary'} className={classes['add_button']} onClick={handleAddClick}>
            {t('add')}
          </Button>
        </div>
      </div>
    </main>
  );
};
