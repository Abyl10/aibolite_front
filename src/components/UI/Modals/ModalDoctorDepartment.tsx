import React, { useState } from 'react';
import { IDoctor } from '../../../ts/types';
import ModalPortal from '../ModalPortal';
import classes from './ModalDoctorDepartment.module.scss';
import modalClasses from '../../../assets/sass/components/_modal.scss';
import { Search } from '../Search';
import { IconUserCircle } from '@tabler/icons';

interface IProps {
  handleToggle: () => void;
  values: IDoctor[];
}

const ModalDoctorDepartment: React.FC<IProps> = ({ handleToggle, values }) => {
  const [query, setQuery] = useState<string>('');
  return (
    <main className={classes['modal']}>
      <React.Fragment key={'modal'}>
        <ModalPortal open={true} handleClose={handleToggle} targetId={'modal__header'}>
          {values && (
            <div className={classes['doctor']}>
              <div className={modalClasses['modal__header']}>
                <div className={modalClasses['modal__header__title']}>Doctors</div>
                <img
                  src={'../../../assets/icons/x.svg'}
                  alt={'close'}
                  className={modalClasses['modal__header__close']}
                  onClick={handleToggle}
                />
              </div>
              <div className={classes['search']}>
                <Search onChange={setQuery} />
              </div>
              {values.length > 0 ? (
                <div className={classes['doctor__list']}>
                  {values
                    .filter((item: any) => {
                      if (query === '') {
                        return item.name;
                      } else if (item.name.toLowerCase().includes(query.toLowerCase())) {
                        return item.name.toLowerCase().includes(query.toLowerCase());
                      }
                    })
                    .map((doctor) => (
                      <div key={doctor.id}>
                        {doctor.name ? (
                          <div className={classes['doctor__list__item']} key={doctor.id}>
                            <div className={classes['doctor__list__icon']}>
                              <IconUserCircle size={70} />
                            </div>
                            <div>
                              <div className={classes['doctor__list__item__header']}>
                                <div className={classes['doctor__list__item__name']}>
                                  {doctor.name}
                                </div>
                                <div className={classes['doctor__list__item__surname']}>
                                  {doctor.surname}
                                </div>
                              </div>
                              <div className={classes['doctor__list__item__body']}>
                                <div className={classes['info']}>Degree: {doctor.degree}</div>
                                <div className={classes['info']}>
                                  Experience years: {doctor.experience_years}
                                </div>
                                <div className={classes['info']}>Rating: {doctor.rating}</div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div>No doctors found... Choose another department</div>
                        )}
                      </div>
                    ))}
                </div>
              ) : (
                <div className={classes['no-doctor']}>
                  No doctors found... Choose another department
                </div>
              )}
            </div>
          )}
        </ModalPortal>
      </React.Fragment>
    </main>
  );
};

export default ModalDoctorDepartment;
