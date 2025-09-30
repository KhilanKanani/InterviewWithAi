import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { SERVER_URL } from '../main';
import { setHistorydata } from '../redux/InterviewSlice';

const FindUserHistory = (id) => {

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchFindUserHistory = async () => {
            try {
                const res = await axios.get(`${SERVER_URL}/api/interview/history/${id}`, { withCredentials: true });
                dispatch(setHistorydata(res.data));
            }

            catch (err) {
                console.log("fetchFindUserHistory Error : ", err.message);
            }
        }

        fetchFindUserHistory();

    }, []);
}

export default FindUserHistory
