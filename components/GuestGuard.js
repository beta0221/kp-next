import { useEffect, useState } from 'react';
import Redirector from './Redirector';

function GuestGuard(Component) {

  function GuestGuardComponent(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    useEffect(() => {
      let _isAuthenticated = localStorage.getItem('token') !== null
      setIsAuthenticated(_isAuthenticated) // 假設登入狀態儲存在 localStorage
    }, []);

    if (isAuthenticated) { return <Redirector href="/"></Redirector> }
    return <Component {...props} />
  }

  GuestGuardComponent.displayName = `GuestGuard(${Component.displayName || Component.name})`
  return GuestGuardComponent
}

export default GuestGuard;
