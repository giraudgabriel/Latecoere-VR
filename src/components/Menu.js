import React from "react";
import userService from '../services/UserService';
import {useHistory} from "react-router-dom";
const Menu = () => {
    const [user,
        setUser] = React.useState(JSON.parse(sessionStorage.getItem('user')))
    const history = useHistory();

    React.useEffect(() => {
        setUser(JSON.parse(sessionStorage.getItem('user')));
    }, [])

    function handleLogout() {
        if (window.confirm('Deseja realmente sair?')) {
            userService.logout();
            setUser({});
            history.push('/')
        }
    }

    return (
        <ul className="nav mb-3 bg-light">
            <li className="nav-item">
                <h3 className="nav-link active" href="#">
                    Latecoere VR
                </h3>
            </li>
            <li className="nav-item mr-2" hidden={!user || !user.isAdmin}>
                <button
                    className="btn btn-sm mt-2 btn-info"
                    onClick={() => history.push('/dashboard')}>
                    <i className="fa fa-edit"></i>
                    Dashboard
                </button>
            </li>

            <li className="nav-item mr-2" hidden={!user}>
                <button
                    className="btn btn-sm mt-2 btn-warning"
                    onClick={() => history.push('/assembly')}>
                    <i className="fa fa-wrench"></i>
                    Montagens
                </button>
            </li>

            <li className="nav-item" hidden={!user}>
                <button className="btn btn-sm mt-2 btn-danger" onClick={handleLogout}>
                    <i className="fa fa-sign-out"></i>
                    Sair
                </button>
            </li>

        </ul>
    );
};

export default Menu;
