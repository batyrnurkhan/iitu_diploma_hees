import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const card = (props) => {
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    return (
        <div className='card'>
            <h3 className='card__title'>{props.title}</h3>
            <div className='card__header'>
                <img className='card__header__photo' src={props.photo_main} alt='House' />
            </div>
            
            <div className='row'>
                <div className='col-2-of-3'>
                    <p className='card__info'>Price: ${numberWithCommas(props.price)}</p>
                </div>
                <div className='col-1-of-3'>
                    <p className='card__materialtype'>{props.material_type}</p>
                    <p className='card__detailtype'>{props.detail_type}</p>
                    <p className='card__aom'>Aom: {props.aom}</p>
                </div>
            </div>
            <Link className='card__link' to={`/materials/${props.slug}`}>View Material</Link>
        </div>
    );
};

card.propTypes = {
    title: PropTypes.string.isRequired,
    photo_main: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    material_type: PropTypes.string.isRequired,
    detail_type: PropTypes.string.isRequired,
    aom: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
};

export default card;