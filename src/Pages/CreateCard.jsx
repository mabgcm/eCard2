import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { collection, addDoc } from 'firebase/firestore';
import { uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, auth, ref, storage } from "../firebase";
import { CgWebsite } from 'react-icons/cg';
import { BsGithub } from 'react-icons/bs';
import { BsTwitter } from 'react-icons/bs';
import { BsInstagram } from 'react-icons/bs';
import { BsFacebook } from 'react-icons/bs';



const initialState = {
    fullname: "",
    company: "",
    title: "",
    photo: "",
    workphone: "",
    homephone: "",
    mobilephone: "",
    workaddress: "",
    homeaddress: "",
    email: "",
    website: "",
    dob: "",
    facebook: "",
    twitter: "",
    instagram: "",
    github: "",
};

const CreateCard = () => {

    const [form, setForm] = useState(initialState);
    const navigate = useNavigate();
    const user = auth.currentUser


    //PHOTO UPLOAD
    const [pic, setPic] = useState({
        photo: "",
        imgUrl: "",
    });

    const handlePhoto = (e) => {
        const file = e.target.files[0];
        setPic((prev) => ({ ...prev, photo: file }));
        uploadFile(file);
    };

    const uploadFile = (file) => {
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Handle the upload progress if needed
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                    setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
                });
            }
        );
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (auth.currentUser) {
            try {
                const docRef = await addDoc(collection(db, "ecards"), {
                    ...form,
                    userId: auth.currentUser.uid,
                    profile: auth.currentUser.photoURL,
                });
                navigate(`/card/${docRef.id}`);
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log("Please fill all text fields");
        }
    };

    const { fullname, company, title, photo, workphone, homephone, mobilephone, workaddress, homeaddress, email, website, dob, facebook, twitter, instagram, github } = form;

    const iconstyle = {
        color: '#0069D9',
        fontSize: '30px'
    }

    return (
        <div>
            <div class="container">
                <div class="main-body">
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="card">
                                <div class="card-body">
                                    <div class="d-flex flex-column align-items-center text-center">
                                        < img src={user?.photoURL} alt="UserPhoto" className="rounded-circle" width="150" />
                                        <div class="mt-3">
                                            <h4>{fullname}</h4>
                                            <p class="text-secondary mb-1">{title}</p>
                                            <p class="text-muted font-size-sm">{workaddress}</p>
                                        </div>
                                    </div>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 class="mb-0"><CgWebsite style={iconstyle} className='icon' />Website</h6>
                                            <span class="text-secondary">{website}</span>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 class="mb-0"><BsGithub style={iconstyle} className='icon' />Github</h6>
                                            <span class="text-secondary">{`httsp://www.github.com/${github}`}</span>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 class="mb-0"><BsTwitter style={iconstyle} className='icon' />Twitter</h6>
                                            <span class="text-secondary">{twitter}</span>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 class="mb-0"><BsInstagram style={iconstyle} className='icon' />Instagram</h6>
                                            <span class="text-secondary">{instagram}</span>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 class="mb-0"><BsFacebook style={iconstyle} className='icon' />Facebook</h6>
                                            <span class="text-secondary">{facebook}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <div class="card">
                                <div class="card-body">
                                    <form onSubmit={handleSubmit}>

                                        <div class="row mb-3">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Full Name</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                <input type="text" class="form-control" name='fullname' value={fullname} placeholder='John Doe' onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Company</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                <input type="text" class="form-control" name='company' value={company} placeholder='Apple' onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Title:</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                <input type="text" class="form-control" name='title' value={title} placeholder='CEO' onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Photo:</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                <input
                                                    type="file" class="form-control" name='photo'
                                                    value={photo} onChange={handlePhoto} />
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Work Phone</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                <input type="text" class="form-control" name='workphone' value={workphone} placeholder='+12345678900' onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Home Phone</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                <input type="text" class="form-control" name='homephone' value={homephone} placeholder='+12345678900' onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Cell Phone</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                <input type="text" class="form-control" name='mobilephone' value={mobilephone} placeholder='+12345678900' onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Work Address</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                <input type="text" class="form-control" name='workaddress' value={workaddress} placeholder='21 Street, City, 123456, LA' onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Home Address</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                <input type="text" class="form-control" name='homeaddress' value={homeaddress} placeholder='21 Street, City, 123456, LA' onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Email</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                <input type="text" class="form-control" name='email' value={email} placeholder='john@mail.com' onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Website</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                <input type="text" class="form-control" name='website' value={website} placeholder='www.mabgcm.com' onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Birthday</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                <input type="text" class="form-control" name='dob' value={dob} placeholder='January 23' onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Facebook</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                <input type="text" class="form-control" name='facebook' value={facebook} placeholder='Type your profile id only' onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Twitter</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                <input type="text" class="form-control" name='twitter' value={twitter} placeholder='Type your profile id only' onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Instagram</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                <input type="text" class="form-control" name='instagram' value={instagram} placeholder='Type your profile id only' onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Github</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                <input type="text" class="form-control" name='github' value={github} placeholder='Type your profile id only' onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-sm-3"></div>
                                            <div class="col-sm-9 text-secondary">
                                                <input type="submit" class="btn btn-primary px-4" value="Save Changes" />
                                            </div>
                                        </div>
                                    </form>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateCard