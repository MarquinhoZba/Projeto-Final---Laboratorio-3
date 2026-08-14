import { StyleSheet } from "react-native";

export const stylesEsq = StyleSheet.create ({
    container: { 
    flex: 1, 
    backgroundColor: '#e8f5ee', // Cor de fundo do seu gradiente
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20 
  },
  // Blobs com as cores e opacidade do seu CSS
  blob: { position: 'absolute', borderRadius: 1000, opacity: 0.45 },
  blob1: { width: 300, height: 300, backgroundColor: '#9FE1CB', top: -80, left: -60 },
  blob2: { width: 250, height: 250, backgroundColor: '#CECBF6', bottom: -60, right: -40 },
  blob3: { width: 180, height: 180, backgroundColor: '#B5D4F4', top: '40%', left: '10%' },
  
  glassContainer: {
    width: '100%',
    maxWidth: 520,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 24,
    padding: 32,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    // Sombras para simular o elevation do CSS
    shadowColor: '#1F6446',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 32,
    elevation: 5,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: { 
    fontSize: 23, 
    fontWeight: '600', 
    color: '#0F2D1F', 
    marginBottom: 4,
    letterSpacing: -0.5 
  },
  subtitle: { 
    fontSize: 13, 
    color: '#5A7D6C', 
    lineHeight: 20, 
    marginBottom: 28 
  },
  inputGroup: { marginBottom: 20 },
  label: { 
    fontSize: 12, 
    fontWeight: '500', 
    color: '#3B6D50', 
    marginBottom: 6,
    letterSpacing: 0.3 
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C0DCC8',
    height: 48,
    paddingLeft: 14,
  },
  fieldIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 14, color: '#1a2e25' },
  btn: {
    height: 52,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  btnText: { 
    color: 'white', 
    fontSize: 14, 
    fontWeight: '600', 
    letterSpacing: 0.3 
  },
  btnVoltar: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C0DCC8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnVoltarText: { 
    color: '#3B6D50', 
    fontSize: 14, 
    fontWeight: '500' 
  }

});