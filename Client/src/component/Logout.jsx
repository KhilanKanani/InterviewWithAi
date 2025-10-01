import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { setIsLoading, setUserdata } from '../redux/UserSlice';
import { useEffect } from 'react';
import { SERVER_URL } from '../main';
import { setAllInterview } from '../redux/InterviewSlice';

const Logout = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const logout = async () => {
            try {
                dispatch(setIsLoading(true));
                await axios.post(`${SERVER_URL}/api/auth/logout`, {}, { withCredentials: true });
                dispatch(setUserdata(null));
                dispatch(setAllInterview(null));
                dispatch(setIsLoading(false));

                toast.success("Logout Successful...");
                navigate("/login");
            }

            catch (err) {
                console.log(err.message);
            }
        }

        logout();
    }, [dispatch])
}

export default Logout
