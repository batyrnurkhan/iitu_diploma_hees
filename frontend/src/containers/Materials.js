import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Card from '../components/Card';
import Pagination from '../components/Pagination';

const Materials = () => {
    const [materials, setMaterials] = useState([]);
    const [count, setCount] = useState(0);
    const [previous, setPrevious] = useState('');
    const [next, setNext] = useState('');
    const [active, setActive] = useState(1);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/materials/?page=1`);

                setMaterials(res.data.results);
                setCount(res.data.count);
                setPrevious(res.data.previous);
                setNext(res.data.next);
            }
            catch (err) {

            }
        }

        fetchData();
    }, []);

    const displayMaterials = () => {
        let display = [];
        let result = [];

        materials.map(material => {
            return display.push(
                <Card
                    title={material.title}
                    price={material.price}
                    material_type={material.material_type}
                    detail_type={material.detail_type}
                    aom={material.aom}
                    photo_main={material.photo_main}
                    slug={material.slug}
                />
            );
        });

        for (let i = 0; i < materials.length; i += 3) {
            result.push(
                <div key={i} className='row'>
                    <div className='col-1-of-3'>
                        {display[i]}
                    </div>
                    <div className='col-1-of-3'>
                        {display[i+1] ? display[i+1] : null}
                    </div>
                    <div className='col-1-of-3'>
                        {display[i+2] ? display[i+2] : null}
                    </div>
                </div>
            );
        }

        return result;
    };

    const visitPage = (page) => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/materials/?page=${page}`)
        .then(res => {
            setMaterials(res.data.results);
            setPrevious(res.data.previous);
            setNext(res.data.next);
            setActive(page);
        })
        .catch(err => {

        });
    };

    const previous_number = () => {
        axios.get(previous)
        .then(res => {
            setMaterials(res.data.results);
            setPrevious(res.data.previous);
            setNext(res.data.next);
            if (previous)
                setActive(active-1);
        })
        .catch(err => {

        });
    };

    const next_number = () => {
        axios.get(next)
        .then(res => {
            setMaterials(res.data.results);
            setPrevious(res.data.previous);
            setNext(res.data.next);
            if (next)
                setActive(active+1);
        })
        .catch(err => {

        });
    };

    return (
        <main className='materials'>
            <Helmet>
                <title>Realest Estate - Materials</title>
                <meta
                    name='description'
                    content='Materials page'
                />
            </Helmet>
            <section className='materials__materials'>
                {displayMaterials()}
            </section>
            <section className='materials__pagination'>
                <div className='row'>
                    <Pagination
                        itemsPerPage={3}
                        count={count}
                        visitPage={visitPage}
                        previous={previous_number}
                        next={next_number}
                        active={active}
                        setActive={setActive}
                    />
                </div>
            </section>
        </main>
    );
};

export default Materials;
