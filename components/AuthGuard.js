import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Redirector from './Redirector';

function AuthGuard(Component) {

  function AuthGuardComponent(props) {

    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    useEffect(() => {
      let _isAuthenticated = localStorage.getItem('token') !== null
      setIsAuthenticated(_isAuthenticated) // 假設登入狀態儲存在 localStorage
    }, []);

    if (!isAuthenticated) { return <Redirector href={`/login?redirect=${router.asPath}`}></Redirector> }
    return <Component {...props} />
  }

  AuthGuardComponent.displayName = `AuthGuard(${Component.displayName || Component.name})`
  return AuthGuardComponent

};

export default AuthGuard