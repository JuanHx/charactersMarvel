import React, {useEffect, useState} from 'react';
import { Row, Col, Card, Modal} from 'antd';
import md5 from "md5";
import Meta from "antd/es/card/Meta";

interface ComicsModalProps {
    path: string;
    visible: boolean;
    onClose: () => void;
}

function ModalDetail({ path, visible, onClose } : ComicsModalProps){

    const [responseData, setResponseData]: any[] = useState([]); // Estado para almacenar la respuesta del fetch

    useEffect(() => {
        Url(path);
    }, [path]);

    /*
        Metodo para realizar la peticion a la url enviada
     */
    const Url = (url: string) => {
        const ts = 1;
        const privateKey = '55f9820b2f8534e1df4a75046123cbf4144640ad';
        const publicKey = "7ccd7fc2dbbd5c118c46647980887b4e";
        const hash = md5(`${ts}${privateKey}${publicKey}`);

        fetch(`${url}?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
            .then(res => res.json())
            .then(chart => {
                setResponseData(chart.data.results);
            });
    };

    return (
        <div>
            <Modal open={visible}
                title="Detalle"
                onCancel={onClose}
                destroyOnClose={true}
                width={1000}
                footer={null}
                bodyStyle={{ backgroundColor: '#de0202'}}
            >
                <Row gutter={[16, 16]}>
                    {responseData.map((comic: any, index: number) => (
                        <Col key={index} span={12} style={{ display: 'flex', justifyContent: 'center', paddingBottom: 90}}>
                            <Card
                                hoverable
                                className={'CardMarvel'}
                                cover={
                                    <img
                                        alt="example"
                                        src={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`}
                                    />
                                }
                            ><Meta title={comic.title} description={comic.description || 'Sin descripción'} />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Modal>
        </div>
    );
}

export default ModalDetail;