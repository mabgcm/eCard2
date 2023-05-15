import React, { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button,
} from 'reactstrap';
import './Navbar.css'
import { useNavigate, useParams } from 'react-router';
import { collection, onSnapshot, where, query } from 'firebase/firestore';
import { db } from "../firebase";

function TopNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useNavigate();
    const { googleSignIn, user, logOut } = UserAuth();
    const { id } = useParams();
    const [cards, setCards] = useState([]);
    const [userCard, setUserCard] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                const q = query(collection(db, 'ecards'), where('userId', '==', user.uid));
                onSnapshot(q, (snapshot) => {
                    const cards = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setCards(cards);
                    const currentUserCard = cards.find(card => card.userId === user.uid);
                    if (currentUserCard) {
                        setUserCard(currentUserCard);
                    }
                    console.log(currentUserCard)
                });
            }
            console.log(user.uid)
        };
        fetchData();
    }, [id, user]);

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    };

    const handleSignOut = async () => {
        try {
            await logOut();
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    // navigate(`/card/${userCard.id}`, { state: { userCard } });
    useEffect(() => {
        if (userCard) {
            navigate(`/card/${userCard.id}`, { state: { userCard } });
        }
    }, [userCard]);



    console.log(cards)

    return (
        <div>
            <Navbar color="dark" dark expand="md" fixed="top">
                <NavbarBrand href="/">E-Card</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto mx-4" navbar>
                        {userCard && (
                            <NavItem>
                                <NavLink href={`/card/${userCard.id}`} userCard={userCard} >Card</NavLink>
                            </NavItem>
                        )}
                        {user && !userCard && (
                            <NavItem>
                                <NavLink href="create">Create</NavLink>
                            </NavItem>
                        )}

                    </Nav>
                    <NavItem className="login">
                        {user?.displayName ? (
                            <Button className="btn-round" color="danger" onClick={handleSignOut}>
                                Sing Out
                            </Button>
                        ) : (
                            <Button className="btn-round" color="success" onClick={handleGoogleSignIn}>
                                Sing In
                            </Button>
                        )}
                    </NavItem>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default TopNavbar;
