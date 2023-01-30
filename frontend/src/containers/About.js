import React, { useState, useEffect, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import House from '../assets/images/hees.png';

const About = () => {
    const [topUniversity, setTopUniversity] = useState([]);
    const [universities, setUniversities] = useState([]);

    useEffect(() => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const getTopUniversity = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/universities/topuniversity`, config);
                setTopUniversity(res.data);
            }
            catch (err) {

            }
        };

        getTopUniversity();
    }, []);

    useEffect(() => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const getUniversities = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/universities/`, config);
                setUniversities(res.data);
            }
            catch (err) {

            }
        };

        getUniversities();
    }, []);

    const getAllUniversities = () => {
        let allUniversities = [];
        let results = [];

        universities.map(university => {
            return allUniversities.push(
                <Fragment key={university.id}>
                    <div className='about__display'>
                        <img className='about__display__image' src={university.photo} alt='' />
                    </div>
                    <h3 className='about__university'>{university.name}</h3>
                    <p className='about__contact'>{university.phone}</p>
                    <p className='about__contact'>{university.email}</p>
                    <p className='about__about'>{university.description}</p>
                </Fragment>
            );
        });

        for (let i = 0; i < universities.length; i += 3) {
            results.push(
                <div key={i} className='row'>
                    <div className='col-1-of-3'>
                        {allUniversities[i]}
                    </div>
                    <div className='col-1-of-3'>
                        {allUniversities[i+1] ? allUniversities[i+1] : null}
                    </div>
                    <div className='col-1-of-3'>
                        {allUniversities[i+2] ? allUniversities[i+2] : null}
                    </div>
                </div>
            );
        }

        return results;
    };  

    const getTopUniversity = () => {
        let result = [];

        topUniversity.map(university => {
            return result.push(
                <Fragment key={university.id}>
                    <div className='about__display'>
                        <img className='about__display__image' src={university.photo} alt='' />
                    </div>
                    <h3 className='about__topuniversity'>Top Seller:</h3>
                    <p className='about__university'>{university.name}</p>
                    <p className='about__contact'>{university.phone}</p>
                    <p className='about__contact'>{university.email}</p>
                    <p className='about__about'>{university.description}</p>
                </Fragment>
            );
        });

        return result;
    };

    return (
        <main className='about'>
            <Helmet>
                <title>Realest Estate - About</title>
                <meta
                    name='description'
                    content='About us'
                />
            </Helmet>
            <header className='about__header'>
                <h1 className='about__heading'>About Realest Estate</h1>
            </header>
            <section className='about__info'>
                <div className='row'>
                    <div className='col-3-of-4'>
                        <h2 className='about__subheading'>We find the perfect home for you</h2>
                        <p className='about__paragraph'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae sapien a diam eleifend faucibus. 
                            Suspendisse vitae sodales leo. Proin hendrerit aliquam interdum. Maecenas tellus ante, ultrices id 
                            justo id, venenatis hendrerit orci. Orci varius natoque penatibus et magnis dis parturient montes, 
                            nascetur ridiculus mus. Praesent aliquam condimentum ligula eget ullamcorper.
                        </p>    
                        <div className='about__display'>
                            <img className='about__display__image' src={House} alt='' />
                        </div>
                        <p className='about__paragraph'>
                            Suspendisse gravida magna posuere purus laoreet, et elementum velit placerat. Fusce at convallis erat. 
                            Curabitur placerat eros eu interdum lacinia. Nulla facilisi. Duis pretium tristique porta. Donec 
                            vehicula est a massa interdum vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Mauris malesuada lacus mauris, eu ultrices neque egestas eu. Class aptent taciti sociosqu ad litora 
                            torquent per conubia nostra, per inceptos himenaeos. Morbi elementum enim vitae purus pulvinar tincidunt. 
                            Aenean id viverra leo, non vehicula odio. Vestibulum volutpat a nulla at mattis. Nam cursus semper sapien, 
                            eu consequat lacus iaculis vel.
                        </p>
                    </div>
                    <div className='col-1-of-4'>
                        {getTopUniversity()}
                    </div>
                </div>
            </section>
            <section className='about__team'>
                <div className='row'>
                    <h2 className='about__subheading'>Meet out awesome team!</h2>
                </div>
                {getAllUniversities()}
            </section>
        </main>
    );
};

export default About;