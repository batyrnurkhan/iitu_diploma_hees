import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import MaterialForm from '../components/MaterialForm';
import Materials from '../components/Materials';
import Pagination from '../components/Pagination';

const Home = () => {
    const [materials, setMaterials] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [materialsPerPage, setMaterialsPerPage] = useState(3);
    const [active, setActive] = useState(1);

    const indexOfLastMaterial = currentPage * materialsPerPage;
    const indexOfFirstMaterial = indexOfLastMaterial - materialsPerPage;
    const currentMaterials = materials.slice(indexOfFirstMaterial, indexOfLastMaterial);

    const visitPage = (page) => {
        setCurrentPage(page);
        setActive(page);
    };

    const previous_number = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage-1);
            setActive(currentPage-1);
        }
    };

    const next_number = () => {
        if (currentPage !== Math.ceil(materials.length/3)) {
            setCurrentPage(currentPage+1);
            setActive(currentPage+1);
        }
    };

    return (
        <main className='home'>
            <Helmet>
                <title>Realest Estate - Home</title>
                <meta
                    name='description'
                    content='Realest Estate Home Page'
                />
            </Helmet>
            <section className='home__form'>
                <MaterialForm setMaterials={setMaterials} />
            </section>
            <section className='home__materials'>
                <Materials materials={currentMaterials} />
            </section>
            <section className='home__pagination'>
                <div className='row'>
                    {
                        materials.length !== 0 ? (
                            <Pagination
                                itemsPerPage={materialsPerPage}
                                count={materials.length}
                                visitPage={visitPage}
                                previous={previous_number}
                                next={next_number}
                                active={active}
                                setActive={setActive}
                            />
                        ) : null
                    }
                </div>
            </section>
        </main>
    );
};

export default Home;