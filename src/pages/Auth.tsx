import { Link } from 'react-router-dom';

import { ROUTES_ZESTAW3 } from '../_zestaw3/utils/constans';
import { ROUTES_ZESTAW4 } from '../_zestaw4/utils/constans';
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

      <div>
        <p>ZESTAWY:</p>
        <Link to={ROUTES_ZESTAW3.home}>Zestaw 3</Link>
        <Link to={ROUTES_ZESTAW4.home}>Zestaw 4</Link>
      </div>
    </>
  );
};
