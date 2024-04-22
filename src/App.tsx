import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Register} from "./pages/Register/Register";
import {Home} from "./pages/Home/Home";
import {
    Login,
    ConsultOffers,
    NewOffer,
    MyProfile,
    EditProfile,
    RequestCourse,
    RegisterCourse,
    SeeOffer,
    MyPublishedOffers,
    CandidatesJobOffer,
} from "./pages";
import Private from "./pages/Private/Private";
import PrivateHome from "./pages/Private/PrivateHome/PrivateHome"

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/newOffer" element={<NewOffer/>}/>
                    <Route path="/myProfile" element={<MyProfile/>}/>
                    <Route path="/editProfile" element={<EditProfile/>}/>
                    <Route path="/consultOffers" element={<ConsultOffers/>}/>
                    <Route path="/requestCourse" element={<RequestCourse/>}/>
                    <Route path="/registerCourse" element={<RegisterCourse/>}/>
                    <Route path="/seeOffer" element={<SeeOffer/>}/>
                    <Route path="/myPublishedOffers" element={<MyPublishedOffers/>}/>
                    <Route
                        path="/myPublishedOffers/:title"
                        element={<CandidatesJobOffer/>}
                    />
                    <Route path="/private" element={<Private/>}>
                        <Route path={"/private/private-home"} element={<PrivateHome/>}/>
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
