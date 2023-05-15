import React, { useEffect, useState } from 'react';
import { collection, doc, onSnapshot, getDoc } from 'firebase/firestore';
import { db } from "../firebase";
import './Pvc.scss';
import { useParams } from 'react-router';
import { BiGlobe } from 'react-icons/bi';
import { BsGithub } from 'react-icons/bs';
import { BsTwitter } from 'react-icons/bs';
import { BsInstagram } from 'react-icons/bs';
import { BsFacebook } from 'react-icons/bs';
import { ImMobile } from 'react-icons/im';
import { MdEmail } from 'react-icons/md';
import { CgNametag } from 'react-icons/cg';
import { TbBuildingBank } from 'react-icons/tb';
import { BsPersonVcard } from 'react-icons/bs';
import { AiFillPhone } from 'react-icons/ai';
import { AiOutlinePhone } from 'react-icons/ai';
import { AiFillHome } from 'react-icons/ai';
import { ImOffice } from 'react-icons/im';
import { FaBirthdayCake } from 'react-icons/fa';
import { FcNfcSign } from 'react-icons/fc';
import { MdOutlineContactless } from 'react-icons/md';
import QrCode from '../components/QrCode';
import CurrentUrl from '../components/CurrentUrl';


const PvcCard = () => {

    const [cards, setCards] = useState([]);
    const { id } = useParams();


    const getCardDetail = async () => {
        const docRef = doc(db, "ecards", id);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
            setCards([snapshot.data()]);
        }
    };
    useEffect(() => {
        id && getCardDetail();
    }, [id]);

    const iconstyle = {
        color: '#0069D9',
        fontSize: '35px',
        // border: '1px solid blue',
        borderRadius: '30%',
        padding: '5px',
        marginRight: '5px'
    }

    const nfc = {
        position: 'relative',
        top: 10,
        left: 10,
        color: '#032149',
        rotate: '180deg'
    }



    if (!cards) {
        return <div>Loading...</div>;
    }


    return (
        <>
            {cards?.map((card) => (
                <div class="container-fluid">
                    <div class="display">
                        <div class="display-item">
                            <div class="flippable-business-card">
                                <div class="front">
                                    <div class="front-top">
                                        <MdOutlineContactless style={nfc} size={50} />
                                        <div class="profile-image rounded-circle">
                                            < img src={card.imgUrl} alt="Admin" className="prf-img" width="150" />
                                        </div>
                                        <div>
                                            <h3>{card.fullname}</h3>
                                            <p>{card.title} @ {card.company}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <div class="contact mt-3">

                                            {card.workaddress && (
                                                <div class="sms">
                                                    <div class="d-flex">
                                                        <ImOffice style={iconstyle} /><h6>{card.workaddress}</h6>
                                                    </div>
                                                </div>
                                            )}

                                            {card.homeaddress && (
                                                <div class="sms">
                                                    <div class="d-flex">
                                                        <AiFillHome style={iconstyle} /><h6>{card.homeddress}</h6>
                                                    </div>
                                                </div>
                                            )}

                                            {card.workphone && (
                                                <div class="sms">
                                                    <div class="d-flex">
                                                        <AiFillPhone style={iconstyle} />
                                                        <h6>{card.workphone}</h6>
                                                    </div>
                                                </div>
                                            )}

                                            {card.mobilephone && (
                                                <div class="sms">
                                                    <div class="d-flex">
                                                        <ImMobile style={iconstyle} />
                                                        <h6>{card.mobilephone}</h6>
                                                    </div>
                                                </div>
                                            )}

                                            {card.email && (
                                                <div class="sms">
                                                    <div class="d-flex">
                                                        <MdEmail style={iconstyle} />
                                                        <h6>{card.email}</h6>
                                                    </div>
                                                </div>
                                            )}

                                            {card.website && (
                                                <div class="sms">
                                                    <div class="d-flex">
                                                        <BiGlobe style={iconstyle} />
                                                        <h6>https://{card.website}</h6>
                                                    </div>
                                                </div>
                                            )}

                                        </div>
                                    </div>

                                </div>
                                <div class="back">
                                    <div class="title text-primary">
                                        <h2></h2>
                                        <span></span>
                                    </div>
                                    <div class="bio">
                                        <QrCode />
                                        <p className='text-primary url'><CurrentUrl /></p>
                                    </div>
                                    <div class="social">
                                        <div class="sms">

                                            {card.twitter && (
                                                <div class="sm twitter">
                                                    <a href={card.twitter}><BsTwitter /></a>
                                                </div>
                                            )}

                                            {card.instagram && (
                                                <div class="sm facebook">
                                                    <a href={card.instagram}><BsInstagram /></a>
                                                </div>
                                            )}

                                            {card.facebook && (
                                                <div className="instacolor">
                                                    <a href={card.facebook}><BsFacebook /></a>
                                                </div>
                                            )}

                                            {card.github && (
                                                <div class="sm github">
                                                    <a href={card.github}><BsGithub color='black' /></a>
                                                </div>
                                            )}

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))
            }
        </>
    )
}

export default PvcCard