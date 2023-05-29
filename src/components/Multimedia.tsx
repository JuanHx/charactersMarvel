import React from 'react';
import {Col, Image, Progress, Row} from "antd";

function Multimedia() {
    return (
        <div>
            <Row style={{justifyContent: 'center'}} wrap={true}>
                <Col span={6} className={'multimedia'}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h2>Progreso de Películas Producidas</h2>
                        <br/>
                        <Progress
                            type={'dashboard'}
                            percent={49.9}
                            strokeColor={{ '0%': '#F00000', '100%': '#DC281E' }}
                            size={300}
                        />
                    </div>
                </Col>
                <Col span={6} className={'multimedia'}>
                    <iframe
                        title={'trailer'}
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/DiJ71etOG8M"
                        allowFullScreen
                    ></iframe>
                </Col>
                <Col span={6} className={'multimedia'}>
                    <Image
                        width={250}
                        src="https://www.empireposter.de/bilder/bilder_XL/809285.jpg"
                    />
                </Col>
            </Row>
        </div>
    );
}

export default Multimedia;