import React, { useContext, useState, useEffect, useCallback } from 'react';

import Swal from 'sweetalert2';
import { divlection, addDoc } from "firebase/firestore";
import { doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Form, Button } from 'react-bootstrap';
import '../styles/profile.css';
import { db } from '../firebase.js'
import { AuthContext } from '../context/AuthContext';
import { gsap } from "gsap";
import Add from "../img/addAvatar.png";



const ProfileForms = ({ users, setUsers, getUsers }) => {
    const { currentUser } = useContext(AuthContext);

    const [setChats, setMessages] = useState([]);


    //const [firstName, setFirstName] = useState('');
    //const [lastName, setLastName] = useState('');
    //const [email, setEmail] = useState('');
    //const [displayName, setUsername] = useState('');
    //const [location, setLocation] = useState('');
    //const [university, setUniversity] = useState('');
    //const [uniType, setuniType] = useState('');
    //const [photoURL, setImage] = useState('');
    //const [birthday, setBirthday] = useState('');
    //const [workplace, setworkplace] = useState('');
    //const [workTypeFull, setworkTypeFull] = useState('');
    //const [workTypePart, setworkTypePart] = useState('');
    const ProfileForm = async (e) => {

        const docRef = doc(db, "profile", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    }


    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {

                
                document.getElementById("displayName").value = doc.data().displayName
                document.getElementById("email2").value = doc.data().email
                document.getElementById("firstName2").value = doc.data().displayName
                document.getElementById("firstName").value = doc.data().firstName
                document.getElementById("lastName").value = doc.data().lastName
                document.getElementById("email").value = doc.data().email
                document.getElementById("location").value = doc.data().location
                document.getElementById("university").value = doc.data().university
                document.getElementById("uniType").value = doc.data().uniType
                document.getElementById("birthday").value = doc.data().birthday
                document.getElementById("workplace").value = doc.data().workplace
                document.getElementById("workTypeFull").value = doc.data().workTypeFull
                document.getElementById("workTypePart").value = doc.data().workTypePart

            });

            return () => {
                unsub();
            };



        };

        currentUser.uid && getChats();
    }, [currentUser.uid]);



    const handleInputChange = (e) => {
        const docRef = doc(db, "profile", currentUser.uid);
        const docSnap = getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    };


    const handleAdd = async (e) => {
        e.preventDefault();

        //const displayName = e.target[0].value;
        //const email = e.target[1].value;

        //await setDoc(doc(db, "users"), {

        //    displayName,
        //    email,

        //});
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const email = document.getElementById("email").value;
        const displayName = document.getElementById("displayName").value;
        const location = document.getElementById("location").value;
        const university = document.getElementById("university").value;
        const uniType = document.getElementById("uniType").value;
        const birthday = document.getElementById("birthday").value;
        const workplace = document.getElementById("workplace").value;
        const workTypeFull = document.getElementById("workTypeFull").value;
        const workTypePart = document.getElementById("workTypePart").value;

        await setDoc(doc(db, "users", currentUser.uid), {
            firstName,
            lastName,
            email,
            displayName,
            location,
            university,
            uniType,
            birthday,
            workplace,
            workTypeFull,
            workTypePart
        });



        Swal.fire({
            icon: 'success',
            title: 'Added!',
            text: `${firstName} ${lastName}'s data has been Added.`,
            showConfirmButton: false,
            timer: 1500,
        });
    };



    //const [formData, setFormData] = useState({
    //    username: '',
    //    firstName: '',
    //    lastName: '',
    //    location: '',
    //    email: '',
    //    birthDate: '',
    //    profileImage: '',
    //    university: '',
    //    workplace: '',
    //    workType: [],
    //});

    //const handleInputChange = (e) => {
    //    const { name, value } = e.target;
    //    setFormData((prevData) => ({
    //        ...prevData,
    //        [name]: value,
    //    }));
    //};

    //const handleCheckboxChange = (e) => {
    //    const { name, checked } = e.target;
    //    setFormData((prevData) => ({
    //        ...prevData,
    //        [name]: checked ? [...prevData[name], e.target.value] : prevData[name].filter(option => option !== e.target.value),
    //    }));
    //};

    //const handleSaveChanges = () => {
    //    console.log('Güncellenen Kullanýcý Bilgileri:', formData);
    //};

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleUpload = () => {
        if (selectedFile) {
            console.log('Profil Resmi Deðiþtirildi:', selectedFile);
        } else {
            console.log('Lütfen bir dosya seçin.');
        }
    };
    
    return (

       
        <div class="container rounded bg-white mt-5 mb-5">
            <form onSubmit={handleAdd}>
            <div class="row">
                <div class="col-md-3 border-right">
                    <div class="card text-center">
                        <div class="card-body">
                            <img class="rounded-circle mt-5" id="myImg" width="150px"
                                    src={currentUser.photoURL}
                                alt="Profil Resmi"></img>
                                <h5 class="font-weight-bold mt-3">
                                    <input type="text" class="form-control" id="firstName2" style={{
                                        borderColor: "transparent", textAlign: "center"
                                    }} disabled/>
</h5>

                                <input type="text" class="form-control" id="email2" style={{
                                    borderColor: "transparent", textAlign: "center"
                                }} disabled />
                                

                            
                        </div>
                    </div>
                </div>
                <div class="col-md-9 border-right">
                    <div class="p-3 py-5">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h4 class="text-right">Account Details</h4>
                        </div>
                        <div class="mt-2">
                            <label for="username">Username</label>
                                <input type="text" class="form-control" id="displayName" placeholder="Enter your username"/>
                        </div>
                        <div class="row mt-2">
                            <div class="col-md-6">
                                <label for="firstName">Firstname</label>
                                <input type="text" class="form-control" id="firstName" placeholder="Enter your firstname"/>
                            </div>
                            <div class="col-md-6">
                                <label for="lastName">Lastname</label>
                                <input type="text" class="form-control" id="lastName" placeholder="Enter your lastname"/>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-md-6">
                                <label for="location">Location</label>
                                <input type="text" class="form-control" id="location" placeholder="Enter your Location"/>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-md-12">
                                <label for="email">E-mail</label>
                                <input type="text" class="form-control" id="email" placeholder="Enter your E-Mail Adress"/>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-md-6">
                                <label for="birthDate">Birthday</label>
                                    <input type="date" class="form-control" id="birthday" />
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-md-6">
                                <label for="university">University</label>
                                <input type="text" class="form-control" id="university" placeholder="Enter your university" />

                                <input class="form-check-input" type="radio" name="uniType" id="uniType"/>
                                    <label class="form-check-label">I don't attend university</label>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-md-6">
                                <label for="workplace">Workplace</label>
                                <input type="text" class="form-control" id="workplace" placeholder="Enter your workplace"/>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-md-6">
                                <label>Work Type</label>
                                <div>
                                    <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="workTypeFull" name="workType" value="fullTime"/>
                                            <label class="form-check-label" for="fullTime">Full Time</label>
                                    </div>
                                    <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="workTypePart" name="workType" value="partTime"/>
                                            <label class="form-check-label" for="partTime">Part Time</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-5 text-center">
                            <button class="btn btn-primary">Save Profile</button>
                        </div>
                    </div>
                    </div>
                
                </div>
            </form>
        </div>


        //<div className="formContainer rounded bg-white mt-5 mb-5">
        //    <div className="formWrapper row">
        //        <form onSubmit={handleAdd}>
        //            <div className=" border-right">
        //                <div className="p-3 py-5">
        //                    <div className="d-flex justify-content-between align-items-center mb-3">
        //                        <h4 className="text-right">Account Details</h4>
        //                    </div>
        //                </div>
        //                <div className="mt-2">
        //                    <div className="col-md-12">
        //                        <label>Username</label>
        //                        <input type="text" name="username" placeholder="Enter your username"></input>
        //                    </div>
        //                </div>
                    
                    
        //            {/*<input id="lastName" type="email" />*/}
        //            {/*<input id="email" type="text" />*/}
        //            {/*<input id="displayName" type="text" />*/}
        //            {/*<input id="location" type="text" />*/}
        //            {/*<input id="university" type="text" />*/}
        //            {/*<input id="uniType" type="text" />*/}
        //            {/*<input  type="file" id="photoURL" />*/}
        //            {/*<label htmlFor="file">*/}
        //            {/*    <img src={Add} alt="" />*/}
        //            {/*    <span>Add an avatar</span>*/}
        //            {/*</label>*/}
        //            {/*<input id="birthday" type="text" />*/}
        //            {/*<input id="workplace" type="text" />*/}
        //            {/*<input id="workTypeFull" type="text" />*/}
        //            {/*<input id="workTypePart" type="text" />*/}

        //            {/*    <button >Sign up</button>*/}
        //            </div>
        //        </form>

        //    </div>
        //</div>





    );
};

export default ProfileForms;
