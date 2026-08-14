import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';


import LoginSrc from './src/app/screens/Login/loginSrc';
import EsqueceuSenhaSrc from './src/app/screens/Login/esqueceuSenhaSrc';
import AlterarSenhaSrc from './src/app/screens/Login/alterarSenhaSrc';
import DashboardSrc from './src/app/screens/Dashboard/dashboardSrc';
import DadosGestoresSrc from './src/app/screens/Gestor/dadosGestoresSrc'; 
import ListaAlunosSrc from './src/app/screens/Alunos/listaAlunosSrc';
import CadastroAlunoSrc from './src/app/screens/Alunos/cadastroAlunosSrc';
import EditarAlunosSrc from './src/app/screens/Alunos/editarAlunosSrc';
import PredicaoSrc from './src/app/screens/Predicao/predicaoSrc';
import DesempenhoSrc from './src/app/screens/Desempenho/desempenhoSrc';
import RegistrarDesemSrc from './src/app/screens/Desempenho/registrarDesemSrc';
import EditarDesemSrc from './src/app/screens/Desempenho/editarDesempSrc';
import RelatoriosSrc from './src/app/screens/Relatorio/relatoriosSrc';
import RelatorioPDFsrc from './src/app/screens/Relatorio/relatorioPDFsrc';
import ModeloSrc from './src/app/screens/Modelo/modeloSrc';
import RegistrarModeloSrc from './src/app/screens/Modelo/registrarModeloSrc';
import EditarModeloSrc from './src/app/screens/Modelo/editarModeloSrc';
import LogAcessSrc from './src/app/screens/LogAcess/logAcessSrc';
import SobreSrc from './src/app/screens/Sobre/sobreSrc'; 


export type RootStackParamList = {
  Login: undefined;
  EsqueceuSenha: undefined;
  AlterarSenha: undefined;
  Dashboard: undefined;
  ListaAlunos: undefined;
  CadastroAluno: undefined;
  EditarAlunos: { alunoId: number }; 
  Predicao: undefined;
  Modelo: undefined;
  RegistrarModelo: undefined;
  EditarModelo: undefined;
  Desempenho: undefined;
  RegistrarDesem: { alunoId: number }; 
  EditarDesem: undefined;
  Relatorios: undefined;
  RelatorioPDF: undefined;
  LogAcessos: undefined;
  Gestores: undefined;
  Sobre: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          
          headerShown: false, 
          contentStyle: { backgroundColor: '#e8f5ee' } 
        }}
      >
    
        <Stack.Screen name="Login" component={LoginSrc} />
        <Stack.Screen name="EsqueceuSenha" component={EsqueceuSenhaSrc} />
        <Stack.Screen name="AlterarSenha" component={AlterarSenhaSrc} />

       
        {/* Main Flow */}
        <Stack.Screen name="Dashboard" component={DashboardSrc} />
        <Stack.Screen name="ListaAlunos" component={ListaAlunosSrc} />
        <Stack.Screen name="CadastroAluno" component={CadastroAlunoSrc} />
        <Stack.Screen name="EditarAlunos" component={EditarAlunosSrc} />
        
        {/* Predição e Modelos */}
        <Stack.Screen name="Predicao" component={PredicaoSrc} />
        <Stack.Screen name="Modelo" component={ModeloSrc} />
        <Stack.Screen name="RegistrarModelo" component={RegistrarModeloSrc} />
        <Stack.Screen name="EditarModelo" component={EditarModeloSrc} />

        {/* Desempenho Acadêmico */}
        <Stack.Screen name="Desempenho" component={DesempenhoSrc} />
        <Stack.Screen name="RegistrarDesem" component={RegistrarDesemSrc} />
        <Stack.Screen name="EditarDesem" component={EditarDesemSrc} />

        {/* Relatórios e Administração */}
        <Stack.Screen name="Relatorios" component={RelatoriosSrc} />
        <Stack.Screen name="RelatorioPDF" component={RelatorioPDFsrc} />
        <Stack.Screen name="LogAcessos" component={LogAcessSrc} />
        <Stack.Screen name="Gestores" component={DadosGestoresSrc} />
        <Stack.Screen name="Sobre" component={SobreSrc} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}