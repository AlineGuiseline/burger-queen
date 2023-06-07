import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeLocalStorageItem } from '../../storage/localStorage';
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
    <button type="submit" onClick={handleLogout} className="logoutIcon"><img className="logoutIcon" src={logoutIcon} alt="ícone-logout" /></button>
  );
}

export default LogoutButton;
