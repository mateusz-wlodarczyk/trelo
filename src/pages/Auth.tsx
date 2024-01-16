import { Link } from 'react-router-dom';

import { ROUTES } from '../utils/constans';

export const Auth = () => {
  return (
    <>
      <div>
        no account? <Link to={ROUTES.register}>register</Link>
      </div>

      <div>
        has account? <Link to={ROUTES.login}>login</Link>
      </div>
    </>
  );
};
