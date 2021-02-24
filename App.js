import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from './src/components/Button';
import Display from './src/components/Display';

const initialState = {
  displayValue: '0', // -- Valor do display
  clearDisplay: false, // -- Vai dizer se o display precisa ser limpo no próximo dígito pressionado, ou não
  operation: null, // -- variável que vai armazenar a operação
  values: [0, 0], // -- valores pra operação. Indice 0 e 1
  current: 0 // -- Indice atual que está sendo settado (0 ou 1)
};

export default class App extends Component {

  state = { ...initialState };

  /*
  state = {
    displayValue: '0',
  };
  */

  addDigit = n => {

    // -- Se o display tiver 0 e digitarmos qlqr valor, tiramos o 0
    const clearDisplay = (this.state.displayValue === '0' || this.state.clearDisplay)

    // -- Se o valor informado for '.' e já existir um ponto no display
    if (n === '.' && !clearDisplay && this.state.displayValue.includes('.')) {
      // -- Não podem ter dois pontos seguidos...
      return;
    }

    // -- Atualiza o valor atual, caso o display não deva ser apagado
    const currentValue = clearDisplay ? '' : this.state.displayValue;
    // -- displayValue será o número corrente + o número recém digitado
    const displayValue = currentValue + n;

    this.setState({ displayValue, clearDisplay: false });

    if (n !== '.') { // -- Se o valor atualmente digitado não for um '.'
      const newValue = parseFloat(displayValue); // -- Transforma o valor em float
      const values = [...this.state.values]; // -- Atribui à 'values' (array clonado com o spread) todos os valores do array 'this.state.values'
      values[this.state.current] = newValue; // -- Setta o valor 'newValue' na posição do array referente ao indice 'this.state.current' (inicialmente 0) 
      this.setState({ values });
    }
  };

  clearMemory = () => {
    this.setState({ ...initialState });
  };

  setOperation = operation => {
    if (this.state.current == 0) {
      // -- Settar a operação 
      // -- Mudar o indice do vetor para 1
      // -- Informar para a calculadora que após o próximo digito o display será apagado
      /*
      Após digitar o número e, em seguida, settar a operação, a tela deve ser limpa
      Ex: 
        - Digitei 7. 
        - Digitei + (marca o display pra ser apagado no prox digito). 
        - A tela é limpa. 
        - Digitei 8. 
        - Digitei =. 
        - A tela imprime o resultado.
      */
      this.setState({ operation, current: 1, clearDisplay: true });
    } else {
      const equals = operation === '='; // -- A operação é de '='?
      const values = [...this.state.values];
      try {
        // -- Toma o valor de indice 0 + o operador + o valor de indice 1
        // -- O eval vai avaliar a expressão e retornar o resultado 
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`);
      } catch (e) {
        values[0] = this.state.values[0];
      }
      values[1] = 0;

      this.setState({
        displayValue: `${values[0]}`, // -- Garantindo q é uma sprint
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        /* values : values */values
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Display value={this.state.displayValue} />
        <View style={styles.buttons}>
          <Button label='AC' triple onClick={this.clearMemory} />
          <Button label='/' operation onClick={this.setOperation} />
          <Button label='7' onClick={this.addDigit} />
          <Button label='8' onClick={this.addDigit} />
          <Button label='9' onClick={this.addDigit} />
          <Button label='*' operation onClick={this.setOperation} />
          <Button label='4' onClick={this.addDigit} />
          <Button label='5' onClick={this.addDigit} />
          <Button label='6' onClick={this.addDigit} />
          <Button label='-' operation onClick={this.setOperation} />
          <Button label='1' onClick={this.addDigit} />
          <Button label='2' onClick={this.addDigit} />
          <Button label='3' onClick={this.addDigit} />
          <Button label='+' operation onClick={this.setOperation} />
          <Button label='0' double onClick={this.addDigit} />
          <Button label='.' onClick={this.addDigit} />
          <Button label='=' operation onClick={this.setOperation} />
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  buttons: {
    flexDirection: 'row', // -- Troca eixo cross x main
    flexWrap: 'wrap', // -- Faz a quebra de linha ao chegar ao final (direita) da tela
  },

});
