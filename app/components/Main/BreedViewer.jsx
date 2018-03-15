import  React from 'react';
import { Link } from 'react-router';
const { connect } = require('react-redux');

import { Icon, Spin, Card, Avatar, Modal } from 'antd';
const { Meta } = Card;

import { fetchBreed, fetchSubbreeds } from 'actions';

import StringsApi from 'StringsApi';

class BreedViewer extends React.Component {
    constructor(props) {
        super(props);
    }

    handleShowSubbreed = (evt, subbreedName) => {
        evt.preventDefault();
        const { onShowSubbreed } = this.props;
        onShowSubbreed(subbreedName);
    }

    render() {
        const { breed, subbreeds, breedName, onNextImage } = this.props;
        
        const renderDescription = () => {
            if(!subbreeds || subbreeds.isLoading || subbreeds.error){
                return <div></div>;
            }
            return <div>{subbreeds.data.map(subbreed => {
                return <a key={subbreed} href="javascript:void(0)" title={subbreed} onClick={(evt) => {this.handleShowSubbreed(evt, subbreed)}}>#{subbreed} </a>;
            })}</div>
        }

        return (<div className="breed-viewer">
            <Spin spinning={breed.isLoading || breed.error} >
                <Card
                    style={{ width: 300 }}
                    cover={<img alt={StringsApi.titleFormat(breed.data.name)} src={breed.data.image} />}
                    actions={[<Icon type="reload" onClick={onNextImage} /> ]}
                >
                    <Meta
                    avatar={<Avatar src={breed.data.image} />}
                    title={StringsApi.titleFormat(breed.data.name)}
                    description={renderDescription()}
                    />
                </Card>
            </Spin>
        </div>);
    }
};

export default connect(
    (state) => {
        return {
            subbreed: state.subbreed
        };
    }
  )(BreedViewer); 