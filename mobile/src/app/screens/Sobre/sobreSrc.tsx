import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Linking,
  StatusBar,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { stylesSobre } from './stylesSobre';

export default function SobreSrc() {
  
  const abrirGitHub = () => {
    Linking.openURL('https://github.com/MarquinhoZ'); 
  };

  return (
    <SafeAreaView style={stylesSobre.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Elementos decorativos de fundo */}
      <View style={[stylesSobre.blob, stylesSobre.blob1]} />
      <View style={[stylesSobre.blob, stylesSobre.blob2]} />

      <View style={stylesSobre.card}>
        <LinearGradient
          colors={['#1D9E75', '#0F6E56']}
          style={stylesSobre.iconWrap}
        >
          <FontAwesome5
            name="graduation-cap"
            size={32}
            color="#fff"
          />
        </LinearGradient>

        <Text style={stylesSobre.title}>SistemaPEE</Text>
        
        <View style={stylesSobre.badge}>
          <Text style={stylesSobre.badgeText}>VERSÃO 1.0</Text>
        </View>

        <Text style={stylesSobre.subtitle}>
          Sistema Preditivo de Evasão Escolar
        </Text>

        <View style={stylesSobre.divider} />

        <Text style={stylesSobre.description}>
          Uma plataforma inteligente desenvolvida para auxiliar a gestão acadêmica no 
          monitoramento preventivo e na identificação precoce de riscos de abandono escolar, 
          utilizando integração de dados e lógica de predição.
        </Text>

        <View style={stylesSobre.infoBox}>
          <View style={stylesSobre.infoIconCircle}>
            <FontAwesome5
              name="code"
              size={14}
              color="#1D9E75"
            />
          </View>

          <Text style={stylesSobre.infoText}>
            Desenvolvido por{' '}
            <Text style={stylesSobre.bold}>Marco Silva</Text>
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={stylesSobre.button}
          onPress={abrirGitHub}
        >
          <FontAwesome5
            name="github"
            size={18}
            color="#fff"
            style={{ marginRight: 10 }}
          />
          <Text style={stylesSobre.buttonText}>
            Ver código fonte
          </Text>
        </TouchableOpacity>

        <View style={stylesSobre.footerContainer}>
          <Text style={stylesSobre.footer}>© SistemaPEE • 2026</Text>
          <Text style={stylesSobre.footerSub}>Camaçari, Bahia</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}