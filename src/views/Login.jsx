import { useState } from 'react';
import LoginForm from '../components/LoginForm.jsx';
import RegisterForm from '../components/RegisterForm.jsx';

const Login = () => {
    const [formToggle, setFormToggle] = useState(true);

    const clickHandler = () => {
        setFormToggle(!formToggle);
    };

    return (
        <>
            {formToggle ? <LoginForm /> : <RegisterForm />}
            <button onClick={clickHandler}>
                {formToggle ? 'or Register' : 'or Login'}
            </button>
        </>
    );
};

export default Login;