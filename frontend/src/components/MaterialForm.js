import React, { useState } from 'react';
import axios from 'axios';
import {Rings} from 'react-loader-spinner';
import PropTypes from 'prop-types';

const MaterialForm = (props) => {
    const [formData, setFormData] = useState({
        material_type: 'For Sale',
        price: '$0+',
        detail_type: 'House',
        aom: '1000+',
        days_listed: '1 or less',
        has_photos: '1+',
        open_material: 'false',
        keywords: ''
    });

    const { material_type, price, detail_type, aom, days_listed, has_photos, open_material, keywords } = formData;

    const [loading, setLoading] = useState(false);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        setLoading(true);
        axios.post(`${process.env.REACT_APP_API_URL}/api/materials/search`, { material_type, price, detail_type, aom, days_listed, has_photos, open_material, keywords }, config)
        .then(res => {
            setLoading(false);
            props.setMaterials(res.data);
            window.scrollTo(0, 0);
        })
        .catch(err => {
            setLoading(false);
            window.scrollTo(0, 0);
        })
    };

    return (
        <form className='materialform' onSubmit={e => onSubmit(e)}>
            <div className='row'>
                <div className='col-1-of-6'>
                    <div className='materialform__section'>
                        <label className='materialform__label' htmlFor='material_type'>Sale or Rent</label>
                        <select className='materialform__select' name='material_type' onChange={e => onChange(e)} value={material_type}>
                            <option>From Person</option>
                            <option>From Hees</option>
                        </select>
                    </div>
                    <div className='materialform__section'>
                        <label className='materialform__label' htmlFor='aom'>Amount of Material</label>
                        <select className='materialform__select' name='aom' onChange={e => onChange(e)} value={aom}>
                            <option>1000+</option>
                            <option>1200+</option>
                            <option>1500+</option>
                            <option>2000+</option>
                            <option>Any</option>
                        </select>
                    </div>
                </div>

                <div className='col-1-of-6'>
                    <div className='materialform__section'>
                        <label className='materialform__label' htmlFor='price'>Minimum Price</label>
                        <select className='materialform__select' name='price' onChange={e => onChange(e)} value={price}>
                            <option>$0+</option>
                            <option>$200,000+</option>
                            <option>$400,000+</option>
                            <option>$600,000+</option>
                            <option>$800,000+</option>
                            <option>$1,000,000+</option>
                            <option>$1,200,000+</option>
                            <option>$1,500,000+</option>
                            <option>Any</option>
                        </select>
                    </div>
                    <div className='materialform__section'>
                        <label className='materialform__label' htmlFor='days_listed'>Days Listed</label>
                        <select className='materialform__select' name='days_listed' onChange={e => onChange(e)} value={days_listed}>
                            <option>1 of less</option>
                            <option>2 of less</option>
                            <option>5 of less</option>
                            <option>10 of less</option>
                            <option>20 of less</option>
                            <option>Any</option>
                        </select>
                    </div>
                </div>

                <div className='col-1-of-6'>
                    <div className='materialform__section'>
                        <label className='materialform__label' htmlFor='has_photos'>Has Photos</label>
                        <select className='materialform__select' name='has_photos' onChange={e => onChange(e)} value={has_photos}>
                            <option>1+</option>
                            <option>3+</option>
                            <option>5+</option>
                            <option>10+</option>
                            <option>15+</option>
                        </select>
                    </div>
                </div>

                <div className='col-1-of-6'>
                    <div className='materialform__section'>
                        <label className='materialform__label' htmlFor='home_type'>Detail Type</label>
                        <select className='materialform__select' name='home_type' onChange={e => onChange(e)} value={detail_type}>
                            <option>CPP</option>
                            <option>JS</option>
                            <option>PYTHON</option>
                        </select>
                    </div>
                    <div className='materialform__section'>
                        <label className='materialform__label' htmlFor='keywords'>Keywords</label>
                        <input className='materialform__input' name='keywords' type='text' onChange={e => onChange(e)} value={keywords} />
                    </div>
                </div>

                <div className='col-1-of-6'>
                    <div className='materialform__altsection'>
                        <label className='materialform__label' htmlFor='open_material'>Open Materials</label>
                        <input className='materialform__checkbox' name='open_material' type='checkbox' onChange={e => onChange(e)} value={open_material} />
                    </div>
                </div>

                <div className='col-1-of-6'>
                    {loading ?
                        <div className='materialform__ring'>
                            <Rings
                                type="Oval"
                                color="#424242"
                                height={50}
                                width={50}
                            />
                        </div> : 
                        <button className='materialform__button materialform__button--primary'>Save</button>
                    }
                </div>
            </div>
        </form>
    );
};

MaterialForm.propTypes = {
    setMaterials: PropTypes.func.isRequired
};

export default MaterialForm;