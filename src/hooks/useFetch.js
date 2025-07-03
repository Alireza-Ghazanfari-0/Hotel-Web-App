import axios from "axios";
import { useEffect, useState } from "react";
import {toast} from "react-hot-toast";


const useFetch=function(url, query=''){
const[data,setData]=useState([])
const[isLoading,setIsLoading]=useState(false)

useEffect(()=>{
     async function fetchData(){
        try {
            setIsLoading(true)
            const response=await axios.get(`${url}?${query}`);
            setData(response.data) ;            
        } catch (error) {
            setData([]);
            toast.error(error.message)   
        }finally{setIsLoading(false)}
    }
    fetchData();
    
},[url, query])
    
return {data,isLoading};


}
export default useFetch;