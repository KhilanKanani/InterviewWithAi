import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { SERVER_URL } from '../main';
import { setAllInterview } from '../redux/InterviewSlice';

const GetAllInterviewData = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllInterview = async () => {
            try {
                const result = await axios.get(`${SERVER_URL}/api/interview/otherUser`, { withCredentials: true });
                dispatch(setAllInterview(result.data));
            }

            catch (err) {
                console.log("AllInterviewData Error : ", err.message);
            }
        }

        fetchAllInterview();

    }, []);
}

export default GetAllInterviewData
