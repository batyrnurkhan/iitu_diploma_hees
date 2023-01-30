import React from 'react';
import Card from './Card';

const materials = ({ materials }) => {
    const getMaterials = () => {
        let materialsOnPage = [];
        let result = [];

        materials.map(material => {
            return materialsOnPage.push(
                <Card
                    title={material.title}
                    price={material.price}
                    material_type={material.material_type}
                    detail_type={material.detail_type}
                    aom={material.sqft}
                    photo_main={material.photo_main}
                    slug={material.slug}
                />
            );
        });

        for (let i = 0; i < materials.length; i += 3) {
            result.push(
                <div className='row'>
                    <div className='col-1-of-3'>
                        {materialsOnPage[i]}
                    </div>
                    <div className='col-1-of-3'>
                    {materialsOnPage[i+1] ? materialsOnPage[i+1] : null}
                    </div>
                    <div className='col-1-of-3'>
                    {materialsOnPage[i+2] ? materialsOnPage[i+2] : null}
                    </div>
                </div>
            );
        }

        return result;
    };

    return (
        <div>
            {getMaterials()}
        </div>
    );
}

export default materials;