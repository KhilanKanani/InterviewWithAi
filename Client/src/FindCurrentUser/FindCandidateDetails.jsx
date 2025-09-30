import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { SERVER_URL } from '../main';
import { setInterviewdata } from '../redux/InterviewSlice';

const FindCandidateDetails = (id) => {

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCandidateDetails = async () => {
            try {
                const result = await axios.get(`${SERVER_URL}/api/interview/details/${id}`, { withCredentials: true });
                dispatch(setInterviewdata(result.data));
            }

            catch (err) {
                console.log("FetchCandidateUser Error : ", err.message);
            }
        }

        fetchCandidateDetails();

    }, []);
}

export default FindCandidateDetails
