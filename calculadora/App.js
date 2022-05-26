import React from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList

} from 'react-native'

export default class App extends React.Component{

  calcular = (a,b,tipoOperacao) => {
    try {
      if (a == '' || b == '' || a.includes(' ') || b.includes(' ')) {
        alert("Insira os valores para realizar sua operação!")
        return
      }
      let n1 = parseFloat(a)
      let n2 = parseFloat(b)
      let calculo = 0
      if (tipoOperacao == '+') {
        calculo = n1+n2
      }
      if(tipoOperacao == '-') {
        calculo = n1-n2
      }
      if(tipoOperacao == '*') {
        calculo = n1*n2
      }
      if(tipoOperacao == '/') {
        calculo = n1/n2
      }
      let listaHistorico = this.state.historico
      listaHistorico.push({
        id : this.state.historico.length+1,
        tipoOperacao : tipoOperacao,
        n1 : a,
        n2 : b,
        resultado : calculo
      })
      this.setState({historico : listaHistorico})
    } catch (error) {
      alert(error)
    }
  }

  state = {
    numero1 : null,
    numero2 : null,
    historico : []
  }

  render(){
    return (
      <View style={estilos.viewPrincipal}>
        <Text>Número 1:</Text>
        <TextInput keyboardType='decimal-pad' onChangeText={(n1) => this.setState({numero1 : n1})}/>
        <Text>Número 2:</Text>
        <TextInput keyboardType='decimal-pad' onChangeText={(n2) => this.setState({numero2 : n2})}/>
        <View style={estilos.operadores}>
          <Button style={estilos.operador} title='+' onPress={() => this.calcular(this.state.numero1,this.state.numero2,'+')}/>
          <Button style={estilos.operador} title='-' onPress={() => this.calcular(this.state.numero1,this.state.numero2,'-')}/>
          <Button style={estilos.operador} title='*' onPress={() => this.calcular(this.state.numero1,this.state.numero2,'*')}/>
          <Button style={estilos.operador} title='/' onPress={() => this.calcular(this.state.numero1,this.state.numero2,'/')}/>
        </View>
        <View>
          {this.state.historico.length == 0 && (
            <Text>Não há histórico p/ exibir!</Text>
          )}
          {this.state.historico.length != 0 && (
            <FlatList
            data={this.state.historico}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Text>{item.n1} {item.tipoOperacao} {item.n2} = {item.resultado}</Text>
            )} 
          />
          )}
        </View>
      </View>
    )
  }
}

const estilos = StyleSheet.create({
  viewPrincipal : {
    padding : 8
  },
  operadores : {
    padding : 12,
    flexDirection : 'row',
    alignSelf : 'center'
  },
  operador : {
    width : 40,
    height : 40,
    alignItems : 'center'
  }
})
