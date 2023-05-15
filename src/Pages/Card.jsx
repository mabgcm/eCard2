import React, { useEffect, useState } from 'react';
import './Card.css';
import { UserAuth } from '../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../firebase";
import { useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Vcard from './Vcard';
import PvcCard from './PvcCard';




const Card = () => {
    const { user } = UserAuth();
    const { id } = useParams();
    const [cards, setCards] = useState([]);


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

    console.log(cards)
    const location = useLocation();
    const userCard = location.state?.userCard;
    console.log(userCard)


    if (!cards) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="container-fluid" >
                {cards.map((card) => (
                    <div className="main-body col" key={card.id}>
                        <div className="row gutters-sm">


                            {/* <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex flex-column align-items-center text-center">
                                            <div>
                                                < img src={card.imgUrl} alt="Admin" className="rounded-circle" width="150" />

                                                <div div className="mt-3">
                                                    <h4>{card.fullname}</h4>
                                                </div>


                                                <div>
                                                    <p className="text-secondary mb-1">{card.title}</p>
                                                    <p className="text-muted font-size-sm">{card.company}</p>
                                                </div>
                                                <div className="row d-flex justify-content-center">

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}


                            {user &&
                                <div>
                                    <PvcCard />

                                    <div className="row d-flex justify-content-center">
                                        <div><Vcard cards={cards} /></div>
                                        {userCard?.id && (
                                            <div className='d-flex justify-content-center'><Link to={`/editcard/${userCard.id}`}><button className="btn btn-warning mx-1">Edit</button></Link></div>)
                                        }
                                    </div>

                                </div>
                            }
                            {/* <CardDetail /> */}

                        </div>
                    </div>
                ))}

            </div>
            {/* <CurrentUrl />
            <QrCode /> */}

        </>

    )
}

export default Card