import React, {useEffect, useState} from 'react';
import {Card, Button, Space, Pagination, Image} from 'antd';
import type { PaginationProps } from 'antd';
import { BookOutlined, VideoCameraOutlined } from '@ant-design/icons';
import md5 from 'md5';
import ModalDetail from "./ModalDetail";
import Multimedia from "./Multimedia";

function CardComponent() {
    const { Meta } = Card;

    const [cardData, setCardData] = useState([]); // Estado para almacenar el Contenido de las card
    const [modalVisible, setModalVisible] = useState(false); // Estado para abrir la Modal de Detalle
    const [total, setTotal] = useState(0); // Estado del total de registros
    const [selectedCard, setSelectedCard] = useState(''); // Card con la url seleccionada
    const [selectedCardId, setSelectedCardId] = useState<string | null>(null); // Nuevo estado para almacenar el ID de la tarjeta seleccionada
    const [current, setCurrent] = useState(1); // Pagina seleccionada


    useEffect(() => {
        fetchMarvel(current);
    }, [current]);

    const fetchMarvel = (page: number) => {
        const ts = 1;
        const privateKey = '55f9820b2f8534e1df4a75046123cbf4144640ad';
        const publicKey = "7ccd7fc2dbbd5c118c46647980887b4e";
        const hash = md5(`${ts}${privateKey}${publicKey}`);
        const limit = 5;

        fetch(`http://gateway.marvel.com/v1/public/characters?limit=${limit}&offset=${page}&ts=${ts}&apikey=${publicKey}&hash=${hash}`)
                .then(res => res.json())
                .then(chart => {
                    setCardData(chart.data.results);
                    setTotal(chart.data.total)
                });
    };

    /*
        Metodo que almacena la card seleccionada y ejecuta le modal
     */
    const handleDetailClick = (card: string) => {
        setSelectedCard(card);
        setSelectedCardId(card);
        setModalVisible(true);
    };

    /*
        Metodo para cerrar la modal
     */
    const handleCloseModal = () => {
        setModalVisible(false);
    };

    /*
        Metodo que almacena la Pagina a localizar
     */
    const onChange: PaginationProps['onChange'] = (page) => {
        setCurrent(page);
    };

    return (
        <div>
            <Multimedia />
            <div className="card">
                        {cardData.map((card: any, index: number) => (
                            <Card
                                hoverable
                                key={index}
                                className={'CardMarvel'}
                                cover={
                                <img
                                    alt="example"
                                    src={`${card.thumbnail.path}/portrait_uncanny.${card.thumbnail.extension}`}
                                />}
                            ><Meta title={card.name} description={card.description || 'Sin descripción'} />
                                <Space direction="vertical" style={{ marginTop: '30px'}}>
                                    <Button icon={<BookOutlined/>} onClick={() => handleDetailClick(card.comics.collectionURI)}> Comics : {card.comics.available}</Button>
                                    <Button icon={<VideoCameraOutlined /> } onClick={() => handleDetailClick(card.series.collectionURI)}> Peliculas : {card.series.available}</Button>
                                </Space>
                            </Card>
                        ))}
            </div>

            <div style={{ padding: '90px'}}>
                <Pagination current={current} onChange={onChange} total={total} simple/>
            </div>

            {selectedCardId && (
                <ModalDetail
                    path={selectedCard}
                    visible={modalVisible}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}

export default CardComponent;