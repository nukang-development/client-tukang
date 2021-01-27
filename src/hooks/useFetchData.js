import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'

export default function useFetchData (url) {
    const token = useSelector(state => state.token)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        axios({
            method: 'GET',
            url: url,
            headers: {access_token : token }
        })
        .then(({data}) => {
            
            setData(data)
            setLoading(false)

        })
        .catch((err) => {
            setError(err)
        })
    }, [url]);

    return {
        data, setData, loading, error 
    }
}