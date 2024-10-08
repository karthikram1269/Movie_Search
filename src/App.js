import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage";
import Movie from "./Pages/Movie";
import MovieDb from "./Components/MovieDb";

export default function App(){

    return(
        <BrowserRouter >
            <Routes>
                <Route path="/" element={<MovieDb />}/>
                <Route path="/movie" element={<Movie />}/>
                <Route path = "*" element={<ErrorPage />}/> 
                <Route />
            </Routes>
        </BrowserRouter >
    )
}


