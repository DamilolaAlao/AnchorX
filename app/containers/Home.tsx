import { Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title } from "native-base"
import * as React from 'react'
import { View } from 'react-native'
import { styles as s } from "react-native-style-tachyons"
import { NavigationScreenProps } from 'react-navigation'

import { Asset } from 'stellar-sdk'

import Loading from '../components/Loading'
import layoutStyles from '../styles/layout'
import CurrentUserQuery, { GET_CURRENT_USER_QUERY } from '../queries/CurrentUser'
import { User } from '../Types'
import Balance from './Balance'
import Payments from './Payments'

export default class Home extends React.Component<NavigationScreenProps> {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: () => (
      <Icon name="menu" />
    )
  }

  render() {
    const anchorXUSD = new Asset(
      'USD',
      'GBX67BEOABQAELIP2XTC6JXHJPASKYCIQNS7WF6GWPSCBEAJEK74HK36'
    )

    return (
      <CurrentUserQuery query={GET_CURRENT_USER_QUERY}>
        {({ loading, data }) => {
           if (loading) {
             return <Loading />
           }

           return (
             <Container style={{backgroundColor: '#F5FCFF'}}>
               <Header style={layoutStyles.header}>
                 <Left>
                   <Button
                     transparent
                     onPress={() => {
                         this.props.navigation.openDrawer()
                     }}>
                     <Icon ios='ios-menu' android="md-menu"/>
                   </Button>
                 </Left>
                 <Body>
                   <Title>AnchorX</Title>
                 </Body>
                 <Right>
                   <Button
                     transparent
                     onPress={() => this.props.navigation.navigate("NewPayment")}>
                     <Text>Send</Text>
                   </Button>
                 </Right>
               </Header>
               <Content scrollEnabled={false}>
                 <View
                   style={[
                     {
                       justifyContent: 'center',
                       alignItems: 'center'
                     },
                     s.pa4
                   ]}
                 >
                   <Balance
                     accountId={data.me.stellarAccount}
                     asset={anchorXUSD} />
                 </View>
                 <View>
                   <Payments
                     accountId={data.me.stellarAccount}
                     asset={anchorXUSD}
                   />
                 </View>
               </Content>
             </Container>)
        }}
      </CurrentUserQuery>
    )
  }
}
