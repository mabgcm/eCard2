import React, { useEffect, useState } from 'react';
import { collection, doc, onSnapshot, getDoc } from 'firebase/firestore';
import { db } from "../firebase";

import { CgWebsite } from 'react-icons/cg';
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
import { useParams } from 'react-router';

const CardDetail = () => {

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
        fontSize: '30px'
    }

    if (!cards) {
        return <div>Loading...</div>;
    }


    return (
        <>
            {cards?.map((card) => (
                <div className="col-md-8" key={card.id}>
                    <div className="card">

                        <ul className="list-group list-group-flush">

                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0"><CgNametag style={iconstyle} className='icon' />Full Name</h6>
                                <span className="text-secondary">{card.fullname}</span>
                            </li>

                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0"><TbBuildingBank style={iconstyle} className='icon' />Company</h6>
                                <span className="text-secondary">{card.company}</span>
                            </li>

                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0"><BsPersonVcard style={iconstyle} className='icon' />Title</h6>
                                <span className="text-secondary">{card.title}</span>
                            </li>

                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0"><AiFillPhone style={iconstyle} className='icon' />Work Phone</h6>
                                <a href={`tel:${card.workphone}`} target='_blank' className="text-underlined">{card.workphone}</a>
                            </li>

                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0"><AiOutlinePhone style={iconstyle} className='icon' />Home Phone</h6>
                                <a href={`tel:${card.homephone}`} target='_blank' className="text-underlined">{card.homephone}</a>
                            </li>

                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0"><ImMobile style={iconstyle} className='icon' />Cell Phone</h6>
                                <a href={`tel:${card.mobilephone}`} target='_blank' className="text-underlined">{card.mobilephone}</a>
                            </li>

                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0"><ImOffice style={iconstyle} className='icon' />Work Address</h6>
                                <span className="text-secondary">{card.workaddress}</span>
                            </li>

                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0"><AiFillHome style={iconstyle} className='icon' />Home Address</h6>
                                <span className="text-secondary">{card.homeaddress}</span>
                            </li>

                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0"><MdEmail style={iconstyle} className='icon' />Email</h6>
                                <span className="text-secondary">{card.email}</span>
                            </li>

                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0"><CgWebsite style={iconstyle} className='icon' />Website</h6>
                                <a href={card.website} target='_blank' className="text-underlined">{card.website}</a>
                            </li>

                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0"><FaBirthdayCake style={iconstyle} className='icon' />Birthday</h6>
                                <span className="text-secondary">{card.dob}</span>
                            </li>

                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0 "><BsFacebook style={iconstyle} className='icon' />Facebook</h6>
                                <a href={card.facebook} target='_blank' className="text-underlined">{card.facebook.substring(40)}</a>
                            </li>

                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0"><BsTwitter style={iconstyle} className='icon' />Twitter</h6>
                                <a href={card.twitter} target='_blank' className="text-underlined">{card.twitter.substring(20)}</a>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0"><BsInstagram style={iconstyle} className='icon' />Instagram</h6>
                                <a href={card.instagram} target='_blank' className="text-underlined">{card.instagram.substring(26)}</a>
                            </li>

                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                <h6 className="mb-0"><BsGithub style={iconstyle} className='icon' />Github</h6>
                                <a href={card.github} target='_blank' className="text-underlined">{card.github.substring(19)}</a>
                            </li>
                        </ul>
                        {/* <Vcard cardData={card} /> */}
                    </div>
                </div>
            ))
            }
        </>
    )
}

export default CardDetail