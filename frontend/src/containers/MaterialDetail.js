import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MaterialDetail = (props) => {
    const [material, setMaterial] = useState({});
    const [university, setUniversity] = useState({});
    const [price, setPrice] = useState(0);

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    useEffect(() => {
        const slug = props.match.params.id;

        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        };

        axios.get(`${process.env.REACT_APP_API_URL}/api/materials/${slug}`, config)
        .then(res => {
            setMaterial(res.data);
            setPrice(numberWithCommas(res.data.price));
        })
        .catch(err => {

        });
    }, [props.match.params.id]);

    useEffect(() => {
        const id = material.user;

        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        };

        if (id) {
            axios.get(`${process.env.REACT_APP_API_URL}/api/universities/${id}`, config)
            .then(res => {
                setUniversity(res.data);
            })
            .catch(err => {

            });
        }
    }, [material.user]);

    const displayInteriorImages = () => {
        let images = [];

        images.push(
            <div key={1} className='row'>
                <div className='col-1-of-3'>
                    {
                        material.photo_1 ? (
                            <div className='materialdetail__display'>
                                <img className='materialdetail__display__image' src={material.photo_1} alt='' />
                            </div>
                        ) : null
                    }
                </div>
            </div>
        );

        return images;
    };

    return (
        <div className='materialdetail'>
            <Helmet>
                <title>Realest Estate - Material | {`${material.title}`}</title>
                <meta
                    name='description'
                    content='Material detail'
                />
            </Helmet>
            <div className='materialdetail__header'>
                <h1 className='materialdetail__title'>{material.title}</h1>
            </div>
            <div className='row'>
                <div className='materialdetail__breadcrumb'>
                    <Link className='materialdetail__breadcrumb__link' to='/'>Home</Link> / {material.title}
                </div>
            </div>
            <div className='row'>
                <div className='col-3-of-4'>
                    <div className='materialdetail__display'>
                        <img className='materialdetail__display__image' src={material.photo_main} alt='' />
                    </div>
                </div>
                <div className='col-1-of-4'>
                    <div className='materialdetail__display'>
                        <img className='materialdetail__display__image' src={university.photo} alt='' />
                    </div>
                    <h3 className='materialdetail__university'>{university.name}</h3>
                    <p className='materialdetail__contact'>{university.phone}</p>
                    <p className='materialdetail__contact'>{university.email}</p>
                    <p className='materialdetail__about'>{university.description}</p>
                </div>
            </div>
            <div className='row'>
                <div className='col-1-of-2'>
                    <ul className='materialdetail__list'>
                        <li className='materialdetail__list__item'>Home Type: {material.detail_type}</li>
                        <li className='materialdetail__list__item'>Price: ${price}</li>
                        <li className='materialdetail__list__item'>Square Feet: {material.aom}</li>
                    </ul>
                </div>
                <div className='col-1-of-2'>
                    <ul className='materialdetail__list'>
                        <li className='materialdetail__list__item'>Material Type: {material.material_type}</li>

                    </ul>
                </div>
            </div>
            <div className='row'>
                <p className='materialdetail__description'>{material.description}</p>
            </div>
            {displayInteriorImages()}
        </div>
    );
};

export default MaterialDetail;