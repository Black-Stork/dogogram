import  React from 'react';
import { Link } from 'react-router';
const { connect } = require('react-redux');

import { Layout, Menu, Breadcrumb, Icon, Input, Spin } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

import BreedViewer from 'BreedViewer';
import { fetchBreeds, fetchBreed, fetchSubbreeds } from 'actions';
import StringsApi from 'StringsApi';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuCollapsed: false,
            menuCurrent: '',
            searchBreedName: ''
        }
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(fetchBreeds());
    }

    menuToggleCollapsed = () => {
        this.setState({
            menuCollapsed: !this.state.menuCollapsed
        });
    }

    handleMenuClick = (e) => {
        const { dispatch } = this.props;
        dispatch(fetchBreed(e.key));
        dispatch(fetchSubbreeds(e.key));
        this.setState({
            menuCurrent: e.key
        });
    }

    handleSearch = (evt) => {
        this.setState({
            searchBreedName: evt.target.value
        })
    }

    render() {
        const { breeds } = this.props;
        const { menuCurrent, menuCollapsed, searchBreedName } = this.state;

        const renderMenuItems = () => {
            if(breeds.isLoading || breeds.error){
                return [];
            }
            const { searchBreedName, menuCurrent } = this.state;
            return breeds.data
                    .filter(breed => breed.toLowerCase().indexOf(searchBreedName) !== -1)
                    .map((breed) => {
                return (<Menu.Item key={breed}>
                            <Icon type={menuCurrent === breed ? 'star' : 'star-o'} />
                            <span>{StringsApi.titleFormat(breed)}</span>
                        </Menu.Item>);
            });
        }

        const renderView = () => {
            if(menuCurrent){
                return <BreedViewer breedName={menuCurrent} />
            } else {
                return <h2 style={{margin: '20px auto', textAlign: 'center'}}>Please, select breed..</h2>;
            }
        }

        return (<Layout style={{ minHeight: '100vh' }}>
                    <Sider
                        collapsible
                        collapsed={menuCollapsed}
                        onCollapse={this.menuToggleCollapsed}
                    >
                        <div className="logo" />
                        <Input
                            placeholder="Enter breed name"
                            prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            value={searchBreedName}
                            onChange={this.handleSearch}
                        />
                        <Spin spinning={breeds.isLoading || breeds.error} >
                            <Menu 
                                theme="dark" 
                                mode="inline"
                                onClick={this.handleMenuClick}
                                style={{maxHeight: window.innerHeight}}>
                                {renderMenuItems()}
                            </Menu>
                        </Spin>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff' }}>
                            {StringsApi.titleFormat(menuCurrent)}
                        </Header>
                        <Content style={{ margin: '0 16px' }}>
                            {renderView()}
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            DogoGram © 2018 Created by <a href="https://github.com/Black-Stork/DogoGram" target="_blank">Nikita Matusevich</a>
                        </Footer>
                    </Layout>
                </Layout>);
    }
};

export default connect(
  (state) => {
      return state;
  }
)(Main); 