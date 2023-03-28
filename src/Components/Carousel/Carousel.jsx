import React from 'react'
import { Row, Col, Carousel } from 'antd'
import {
    HomeOutlined,
    LoadingOutlined,
    SettingFilled,
    SmileOutlined,
    SyncOutlined,
  } from '@ant-design/icons';
const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79'
}

// from https://react-slick.neostack.com/docs/example/custom-arrows
const SampleNextArrow = props => {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'red' }}
      onClick={onClick}
    />
  )
}

const SamplePrevArrow = props => {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'green' }}
      onClick={onClick}
    />
  )
}

const settings = {
  nextArrow: <SettingFilled />,
  prevArrow: <SmileOutlined />
}
console.log({...settings});

const CarouselArrows = () => {
  return (
    <>
      <Row justify="center">
        <Col span={16}>
          <Carousel arrows {...settings}>
            <div>
              <h3 style={contentStyle}>1</h3>
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
            <div>
              <h3 style={contentStyle}>4</h3>
            </div>
          </Carousel>
        </Col>
      </Row>
    </>
  )
}

export default CarouselArrows
