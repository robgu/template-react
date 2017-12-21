import './index.less';

import { Breadcrumb, Icon, Layout, Menu } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { routerActions } from 'react-router-redux';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

@connect(
  (state) => { return state.routing; },
)
export default class CommonLayout extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  state = { collapsed: false };

  getMenuAndRoutes = () => {
    const menus = [];
    const routes = [];
    for (const [key, item] of Object.entries(this.props.routes)) {
      if (item.component) {
        menus.push(
          <Menu.Item key={key}>
            {this.renderMenuItemContent(item.iconType, item.title)}
          </Menu.Item>
        );
        routes.push(
          <Route key={key} exact path={key} component={item.component} />
        );
      } else {
        const subMenus = [];
        for (const [subKey, subItem] of Object.entries(item.items)) {
          subMenus.push(
            <Menu.Item key={key + subKey}>
              {this.renderMenuItemContent(subItem.iconType, subItem.title)}
            </Menu.Item>
          );
          routes.push(
            <Route key={key + subKey} exact path={key + subKey} component={subItem.component} />
          );
        }
        menus.push(
          <SubMenu key={key} title={this.renderMenuItemContent(item.iconType, item.title)}>
            {subMenus}
          </SubMenu>
        );
      }
    }

    routes.push(
      <Redirect key="index" to="/" />
    );

    return { menus, routes };
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  onSelectMenu = (item) => {
    this.props.dispatch(routerActions.replace(item.key));
  }

  renderMenuItemContent = (iconType, title) => {
    return [
      <Icon key="1" type={iconType} />,
      <input type="button" value={title} key="2" />,
    ];
  }

  render = () => {
    const { menus, routes } = this.getMenuAndRoutes();
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu onSelect={this.onSelectMenu} theme="dark" defaultSelectedKeys={['1']} mode="inline">
            {menus}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <Switch>
              {routes}
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
