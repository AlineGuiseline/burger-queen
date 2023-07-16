import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LogoutButton.module.css';
import { removeLocalStorageItem } from '../../utils/localStorage';
import logoutIcon from '../../assets/logoutIcon.png';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      removeLocalStorageItem('token');
      removeLocalStorageItem('userId');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      type="submit"
      onClick={handleLogout}
      className={styles.logoutIcon}
    >
      <img src={logoutIcon} alt="ícone-logout" />
    </button>
  );
}

export default LogoutButton;
