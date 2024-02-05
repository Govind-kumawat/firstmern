import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {

    const navigate = useNavigate();
    const callAboutPage = async () => {
        try {
            const res = await fetch('/about', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            console.log(data);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err);
            navigate('/login');
        }
    }

    useEffect(() => {
        callAboutPage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <section method="GET">
                <h1 className='section_heading'>Chutiya Sandeep</h1>
            </section>
        </>
    )
}

export default About
