import {baseUrl} from "./base_url";
import { redirect } from "react-router-dom";
import axios from 'axios';

const authCheck = () => {
    const loggedIn = localStorage.getItem('loggedIn')
    if(!loggedIn){
        return false
    }
    return true
}

export const placesLoader = async () => {

    if (!authCheck()){
        return redirect('/login')
    }

    const response = await axios.get(`${baseUrl}/places`, {
        withCredentials: true
    })
    const places = await response.json()
    return places
}

export const placeLoader = async ({params}) => {

    if (!authCheck()){
        return redirect('/login')
    }

    const id = params.id
    const response = await fetch(`${baseUrl}/places/${id}`, {
        credentials: "include"
    })
    const place = await response.json()
    return place
}

export const mainLoader = async () => {
    if(authCheck()){
        return redirect("/dashboard")
    }
    return {}
}
